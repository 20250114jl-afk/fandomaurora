import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Save, Loader2, Plus, Trash2, ArrowLeft, Users, Edit2, X, ShieldAlert, BadgeCheck, CreditCard, Check, Ban } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useFirebase } from '../lib/FirebaseContext';
import { getSettings, saveSettings } from '../lib/settings';
import { supabase } from '../lib/supabase';

export default function Admin() {
  const { user, profile, loading } = useFirebase();
  const navigate = useNavigate();
  const [settings, setSettings] = useState<any>(null);
  const [saving, setSaving] = useState(false);
  const [activeTab, setActiveTab] = useState<'hero' | 'benefits' | 'users' | 'applications' | 'designs'>('hero');

  // User list states
  const [usersList, setUsersList] = useState<any[]>([]);
  const [loadingUsers, setLoadingUsers] = useState(false);

  // Card Application states
  const [applicationsList, setApplicationsList] = useState<any[]>([]);
  const [loadingApps, setLoadingApps] = useState(false);

  // Card Design states
  const [designsList, setDesignsList] = useState<any[]>([]);
  const [loadingDesigns, setLoadingDesigns] = useState(false);
  const [editingDesign, setEditingDesign] = useState<any | null>(null);
  const [designForm, setDesignForm] = useState({
    id: '',
    name: '',
    imageUrl: '',
    textColor: '#ffffff',
    accentColor: 'Gold'
  });
  const [savingDesign, setSavingDesign] = useState(false);
  
  // Edit User modal states
  const [editingUser, setEditingUser] = useState<any | null>(null);
  const [editName, setEditName] = useState('');
  const [editPhone, setEditPhone] = useState('');
  const [editTier, setEditTier] = useState('');
  const [editRole, setEditRole] = useState('');
  const [editReferred, setEditReferred] = useState('');
  const [savingUser, setSavingUser] = useState(false);

  const isAdmin = user && user.email === 'new2020.jeonil@gmail.com';

  useEffect(() => {
    if (!loading && !isAdmin) {
      navigate('/');
    }
  }, [loading, isAdmin, navigate]);

  useEffect(() => {
    if (isAdmin) {
      getSettings().then(setSettings);
    }
  }, [isAdmin]);

  const fetchUsers = async () => {
    setLoadingUsers(true);
    try {
      const { data, error } = await supabase
        .from('users')
        .select('*');
      
      if (error) throw error;
      setUsersList(data || []);
    } catch (err) {
      console.error("Error fetching users from Supabase:", err);
    } finally {
      setLoadingUsers(false);
    }
  };

  const fetchApplications = async () => {
    setLoadingApps(true);
    try {
      const { data, error } = await supabase
        .from('cardApplications')
        .select('*')
        .order('createdAt', { ascending: false });

      if (error) throw error;
      setApplicationsList(data || []);
    } catch (err) {
      console.error("Error fetching card applications from Supabase:", err);
    } finally {
      setLoadingApps(false);
    }
  };

  const handleUpdateAppStatus = async (appId: string, newStatus: 'approved' | 'rejected') => {
    const appToUpdate = applicationsList.find(a => a.id === appId);
    if (!appToUpdate) return;
    try {
      const { error } = await supabase
        .from('cardApplications')
        .update({
          status: newStatus,
          updatedAt: new Date().toISOString()
        })
        .eq('id', appId);

      if (error) throw error;
      alert(`신청 상태가 성공적으로 변경되었습니다.`);
      fetchApplications();
    } catch (err) {
      console.error("Error changing status:", err);
      alert('상태 업데이트 실패: ' + (err instanceof Error ? err.message : String(err)));
    }
  };

  const fetchDesigns = async () => {
    setLoadingDesigns(true);
    try {
      const { data, error } = await supabase
        .from('cardDesigns')
        .select('*');
      
      if (error) throw error;
      let list = data || [];
      
      // If empty, dynamically initialize default templates to begin with
      if (list.length === 0) {
        const defaults = [
          {
            id: 'rose_marble',
            name: '럭셔리 로즈 마블 (Rose Gold Marble)',
            imageUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80',
            textColor: '#5a2d2d',
            accentColor: 'Rose Gold',
            createdAt: new Date().toISOString()
          },
          {
            id: 'obsidian_black',
            name: '매트 블랙 카본 (Obsidian Carbon)',
            imageUrl: 'https://images.unsplash.com/photo-1550684848-fac1c5b4e853?auto=format&fit=crop&w=800&q=80',
            textColor: '#fbbf24',
            accentColor: 'Gold',
            createdAt: new Date().toISOString()
          },
          {
            id: 'cyber_holo',
            name: '사이버 홀로그램 (Cyber Holographic)',
            imageUrl: 'https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?auto=format&fit=crop&w=800&q=80',
            textColor: '#0f172a',
            accentColor: 'Silver',
            createdAt: new Date().toISOString()
          },
          {
            id: 'royal_gold',
            name: '로열 골드 플루이드 (Royal Gold Fluid)',
            imageUrl: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=800&q=80',
            textColor: '#ffffff',
            accentColor: 'Gold',
            createdAt: new Date().toISOString()
          }
        ];
        await supabase.from('cardDesigns').insert(defaults);
        list = defaults;
      }
      setDesignsList(list);
    } catch (err) {
      console.error("Error fetching card designs:", err);
    } finally {
      setLoadingDesigns(false);
    }
  };

  const handleSaveDesign = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!designForm.id.trim() || !designForm.name.trim() || !designForm.imageUrl.trim()) {
      alert('디자인 ID, 템플릿 이름, 고해상 이미지 URL은 필수 항목입니다.');
      return;
    }
    
    const idRegex = /^[a-zA-Z0-9_\-]+$/;
    if (!idRegex.test(designForm.id)) {
      alert('디자인 ID는 영문, 숫자, 밑줄(_), 하이픈(-)으로만 구성되어야 합니다.');
      return;
    }

    setSavingDesign(true);
    try {
      const payload = {
        id: designForm.id.trim().toLowerCase(),
        name: designForm.name.trim(),
        imageUrl: designForm.imageUrl.trim(),
        textColor: designForm.textColor || '#ffffff',
        accentColor: designForm.accentColor || 'Gold',
        createdAt: new Date().toISOString()
      };
      const { error } = await supabase
        .from('cardDesigns')
        .upsert(payload);

      if (error) throw error;
      alert('세련된 카드 디자인이 성공적으로 보존되었습니다!');
      setDesignForm({ id: '', name: '', imageUrl: '', textColor: '#ffffff', accentColor: 'Gold' });
      setEditingDesign(null);
      fetchDesigns();
    } catch (err) {
      console.error("Error saving card design:", err);
      alert('카드 디자인 저장에 실패했습니다.');
    } finally {
      setSavingDesign(false);
    }
  };

  const handleDeleteDesign = async (id: string) => {
    if (!confirm('정말로 이 카드 디자인 템플릿을 제거하시겠습니까?')) return;
    try {
      const { error } = await supabase
        .from('cardDesigns')
        .delete()
        .eq('id', id);

      if (error) throw error;
      alert('디자인 템플릿이 삭제되었습니다.');
      fetchDesigns();
    } catch (err) {
      console.error("Error deleting card design:", err);
      alert('삭제 중 오류가 발생했습니다.');
    }
  };

  useEffect(() => {
    if (isAdmin) {
      if (activeTab === 'users') {
        fetchUsers();
      } else if (activeTab === 'applications') {
        fetchApplications();
        fetchDesigns();
      } else if (activeTab === 'designs') {
        fetchDesigns();
      }
    }
  }, [isAdmin, activeTab]);

  const handleSave = async () => {
    if (!settings) return;
    setSaving(true);
    try {
      await saveSettings(settings);
      alert('설정이 저장되었습니다.');
    } catch (err) {
      console.error(err);
      alert('저장 중 오류가 발생했습니다.');
    } finally {
      setSaving(false);
    }
  };

  const cascadeAncestorsUpdate = async (parentEmail: string, parentAncestors: string[], allUsers: any[]) => {
    const directChildren = allUsers.filter(u => u.referredByEmail === parentEmail);
    for (const child of directChildren) {
      const childAncestors = [parentEmail, ...parentAncestors];
      
      await supabase
        .from('users')
        .update({ ancestors: childAncestors })
        .eq('userId', child.userId);

      // Recurse children recursively to maintain tree integrity
      await cascadeAncestorsUpdate(child.email, childAncestors, allUsers);
    }
  };

  const handleSaveUser = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingUser) return;
    setSavingUser(true);

    try {
      let ancestors: string[] = [];
      const refEmailClean = editReferred.trim();

      if (refEmailClean) {
        // Find recruiter to fetch their ancestry line
        const { data: recruiterData, error: recError } = await supabase
          .from('users')
          .select('ancestors')
          .eq('email', refEmailClean)
          .single();

        if (recruiterData) {
          ancestors = [refEmailClean, ...(recruiterData.ancestors || [])];
        } else {
          ancestors = [refEmailClean];
        }
      }

      const updatedUser = {
        ...editingUser,
        displayName: editName,
        phoneNumber: editPhone,
        tier: editTier,
        role: editRole,
        referredByEmail: refEmailClean,
        ancestors: ancestors,
      };

      // Save user to Supabase
      const { error: updateError } = await supabase
        .from('users')
        .update({
          displayName: editName,
          phoneNumber: editPhone,
          tier: editTier,
          role: editRole,
          referredByEmail: refEmailClean,
          ancestors: ancestors,
        })
        .eq('userId', editingUser.userId);

      if (updateError) throw updateError;

      // Recursive cascade trigger to update children of this updated user
      const { data: allUsers, error: usersError } = await supabase
        .from('users')
        .select('*');

      if (allUsers) {
        await cascadeAncestorsUpdate(editingUser.email, ancestors, allUsers);
      }

      alert('회원 정보 및 하위 추천 정보가 동기화 저장되었습니다.');
      setEditingUser(null);
      fetchUsers();
    } catch (err) {
      console.error("Error saving user profile:", err);
      alert('회원 프로필 수정 중 오류가 발생했습니다.');
    } finally {
      setSavingUser(false);
    }
  };

  const openEditModal = (targetUser: any) => {
    setEditingUser(targetUser);
    setEditName(targetUser.displayName || '');
    setEditPhone(targetUser.phoneNumber || '');
    setEditTier(targetUser.tier || 'Basic');
    setEditRole(targetUser.role || 'User');
    setEditReferred(targetUser.referredByEmail || '');
  };

  const getDesignName = (id: string) => {
    const ds = designsList.find(d => d.id === id);
    return ds ? ds.name.split(' (')[0] : id;
  };

  if (loading || !settings) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <Loader2 className="w-8 h-8 text-blue-600 animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-32 pb-20 px-5 md:px-10 bg-slate-50">
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <Link to="/" className="p-2 bg-white rounded-full border border-slate-200 text-slate-400 hover:text-slate-600 transition-colors">
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <h1 className="text-3xl font-display font-black tracking-tighter">Admin Dashboard</h1>
          </div>
          <button 
            onClick={handleSave}
            disabled={saving}
            className="flex items-center justify-center gap-2 px-8 py-3 bg-blue-600 text-white rounded-2xl font-black shadow-xl shadow-blue-600/20 hover:bg-blue-700 transition-all disabled:opacity-50"
          >
            {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
            설정 저장하기
          </button>
        </div>

        <div className="flex border-b border-slate-200">
          <button 
            onClick={() => setActiveTab('hero')}
            className={`px-8 py-4 text-sm font-black tracking-widest uppercase transition-colors relative ${activeTab === 'hero' ? 'text-blue-600' : 'text-slate-400'}`}
          >
            Hero Section
            {activeTab === 'hero' && <motion.div layoutId="tab" className="absolute bottom-0 left-0 right-0 h-1 bg-blue-600" />}
          </button>
          <button 
            onClick={() => setActiveTab('benefits')}
            className={`px-8 py-4 text-sm font-black tracking-widest uppercase transition-colors relative ${activeTab === 'benefits' ? 'text-blue-600' : 'text-slate-400'}`}
          >
            Benefits
            {activeTab === 'benefits' && <motion.div layoutId="tab" className="absolute bottom-0 left-0 right-0 h-1 bg-blue-600" />}
          </button>
          <button 
            onClick={() => setActiveTab('users')}
            className={`px-8 py-4 text-sm font-black tracking-widest uppercase transition-colors relative ${activeTab === 'users' ? 'text-blue-600' : 'text-slate-400'}`}
          >
            User Profiles (회원관리)
            {activeTab === 'users' && <motion.div layoutId="tab" className="absolute bottom-0 left-0 right-0 h-1 bg-blue-600" />}
          </button>
          <button 
            onClick={() => setActiveTab('applications')}
            className={`px-8 py-4 text-sm font-black tracking-widest uppercase transition-colors relative ${activeTab === 'applications' ? 'text-blue-600' : 'text-slate-400'}`}
          >
            Fan Registrations (나의 팬 등록 관리)
            {activeTab === 'applications' && <motion.div layoutId="tab" className="absolute bottom-0 left-0 right-0 h-1 bg-blue-600" />}
          </button>
          <button 
            onClick={() => setActiveTab('designs')}
            className={`px-8 py-4 text-sm font-black tracking-widest uppercase transition-colors relative ${activeTab === 'designs' ? 'text-blue-600' : 'text-slate-400'}`}
          >
            Fandom Photos (팬 사진/디자인 관리)
            {activeTab === 'designs' && <motion.div layoutId="tab" className="absolute bottom-0 left-0 right-0 h-1 bg-blue-600" />}
          </button>
        </div>

        <div className="bg-white rounded-3xl p-8 border border-slate-100 shadow-sm">
          {activeTab === 'hero' && (
            <div className="space-y-6 max-w-2xl">
              <div className="space-y-2">
                <label className="text-xs font-black text-slate-400 uppercase tracking-widest">Badge Text</label>
                <input 
                  type="text" 
                  value={settings.hero.badge}
                  onChange={(e) => setSettings({...settings, hero: {...settings.hero, badge: e.target.value}})}
                  className="w-full bg-slate-50 border border-slate-100 rounded-xl px-4 py-3"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-black text-slate-400 uppercase tracking-widest">Artist Name</label>
                <input 
                  type="text" 
                  value={settings.hero.artist}
                  onChange={(e) => setSettings({...settings, hero: {...settings.hero, artist: e.target.value}})}
                  className="w-full bg-slate-50 border border-slate-100 rounded-xl px-4 py-3"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-xs font-black text-slate-400 uppercase tracking-widest">Title</label>
                  <input 
                    type="text" 
                    value={settings.hero.title}
                    onChange={(e) => setSettings({...settings, hero: {...settings.hero, title: e.target.value}})}
                    className="w-full bg-slate-50 border border-slate-100 rounded-xl px-4 py-3"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-black text-slate-400 uppercase tracking-widest">Subtitle</label>
                  <input 
                    type="text" 
                    value={settings.hero.subtitle}
                    onChange={(e) => setSettings({...settings, hero: {...settings.hero, subtitle: e.target.value}})}
                    className="w-full bg-slate-50 border border-slate-100 rounded-xl px-4 py-3"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-black text-slate-400 uppercase tracking-widest">Tagline</label>
                <input 
                  type="text" 
                  value={settings.hero.tagline}
                  onChange={(e) => setSettings({...settings, hero: {...settings.hero, tagline: e.target.value}})}
                  className="w-full bg-slate-50 border border-slate-100 rounded-xl px-4 py-3"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-black text-slate-400 uppercase tracking-widest">Membership Fee</label>
                <input 
                  type="text" 
                  value={settings.hero.membershipFee}
                  onChange={(e) => setSettings({...settings, hero: {...settings.hero, membershipFee: e.target.value}})}
                  className="w-full bg-slate-50 border border-slate-100 rounded-xl px-4 py-3"
                />
              </div>
            </div>
          )}

          {activeTab === 'benefits' && (
            <div className="space-y-8">
              <div className="flex justify-between items-center">
                <h3 className="text-xl font-bold">Manage Benefits</h3>
                <button 
                  onClick={() => {
                    const newBenefits = [...settings.benefits, { ...DEFAULT_SETTINGS.benefits[0], title: 'New Benefit' }];
                    setSettings({ ...settings, benefits: newBenefits });
                  }}
                  className="flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-600 rounded-lg text-xs font-black"
                >
                  <Plus className="w-4 h-4" /> Add Benefit
                </button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {settings.benefits.map((benefit: any, idx: number) => (
                  <div key={idx} className="p-6 bg-slate-50 rounded-2xl border border-slate-100 space-y-4">
                    <div className="flex justify-between">
                      <span className="text-[10px] font-black text-blue-600 uppercase">Benefit {idx + 1}</span>
                      <button 
                        onClick={() => {
                          const newBenefits = settings.benefits.filter((_: any, i: number) => i !== idx);
                          setSettings({ ...settings, benefits: newBenefits });
                        }}
                        className="text-red-400 hover:text-red-600 transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                    <input 
                      type="text" 
                      value={benefit.title}
                      onChange={(e) => {
                        const newBenefits = [...settings.benefits];
                        newBenefits[idx].title = e.target.value;
                        setSettings({ ...settings, benefits: newBenefits });
                      }}
                      placeholder="Benefit Title"
                      className="w-full bg-white border border-slate-100 rounded-xl px-3 py-2 text-sm font-bold"
                    />
                    <textarea 
                      value={benefit.description}
                      onChange={(e) => {
                        const newBenefits = [...settings.benefits];
                        newBenefits[idx].description = e.target.value;
                        setSettings({ ...settings, benefits: newBenefits });
                      }}
                      placeholder="Description"
                      className="w-full bg-white border border-slate-100 rounded-xl px-3 py-2 text-xs h-20"
                    />
                    <input 
                      type="text" 
                      value={benefit.price}
                      onChange={(e) => {
                        const newBenefits = [...settings.benefits];
                        newBenefits[idx].price = e.target.value;
                        setSettings({ ...settings, benefits: newBenefits });
                      }}
                      placeholder="Price info"
                      className="w-full bg-white border border-slate-100 rounded-xl px-3 py-2 text-[10px]"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'users' && (
            <div className="space-y-6">
              <div className="flex items-center gap-3 border-b border-slate-50 pb-4">
                <Users className="w-5 h-5 text-blue-600" />
                <h3 className="text-lg font-black text-slate-900">회원 프로필 수정 및 영업 등급 관리</h3>
              </div>

              {loadingUsers ? (
                <div className="py-20 flex flex-col items-center justify-center gap-4">
                  <Loader2 className="w-8 h-8 text-blue-600 animate-spin" />
                  <p className="text-slate-400 text-xs font-semibold">회원 데이터베이스를 동기화 중입니다...</p>
                </div>
              ) : (
                <div className="overflow-x-auto rounded-2xl border border-slate-100">
                  <table className="w-full text-left text-sm border-collapse">
                    <thead>
                      <tr className="bg-slate-50 text-slate-400 text-[10px] font-black uppercase tracking-widest border-b border-slate-100">
                        <th className="p-4">이름</th>
                        <th className="p-4">이메일</th>
                        <th className="p-4">등급 (Tier)</th>
                        <th className="p-4">역할 (Role)</th>
                        <th className="p-4">연락처</th>
                        <th className="p-4">추천인 (Recommender)</th>
                        <th className="p-4">관리</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-50">
                      {usersList.map((usr) => (
                        <tr key={usr.userId} className="hover:bg-slate-50/50 transition-colors">
                          <td className="p-4 font-bold text-slate-800">{usr.displayName}</td>
                          <td className="p-4 font-mono text-xs text-slate-500">{usr.email}</td>
                          <td className="p-4">
                            <span className={`text-[10px] px-2.5 py-1 rounded-full font-black uppercase ${
                              usr.tier === 'Legend Tier' ? 'bg-amber-50 text-amber-700 border border-amber-200' :
                              usr.tier === 'Gold' ? 'bg-slate-100 text-slate-800' :
                              'bg-blue-50 text-blue-600'
                            }`}>
                              {usr.tier}
                            </span>
                          </td>
                          <td className="p-4">
                            <span className={`text-[10px] px-2 py-0.5 rounded font-bold ${
                              usr.role === 'Admin' ? 'bg-red-50 text-red-600 border border-red-100' :
                              usr.role === 'Sales' ? 'bg-indigo-50 text-indigo-600 border border-indigo-100' :
                              'bg-slate-50 text-slate-500'
                            }`}>
                              {usr.role === 'Admin' ? '관리자' : usr.role === 'Sales' ? '크리에이터' : '일반회원'}
                            </span>
                          </td>
                          <td className="p-4 text-xs font-semibold text-slate-500">{usr.phoneNumber || '미등록'}</td>
                          <td className="p-4 text-xs font-mono text-slate-500">{usr.referredByEmail || '-'}</td>
                          <td className="p-4">
                            <button
                              onClick={() => openEditModal(usr)}
                              className="p-2 bg-blue-50 hover:bg-blue-100 text-blue-600 rounded-lg hover:scale-105 transition-all"
                            >
                              <Edit2 className="w-3.5 h-3.5" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}

          {activeTab === 'applications' && (
            <div className="space-y-6">
              <div className="flex items-center gap-3 border-b border-slate-50 pb-4">
                <CreditCard className="w-5 h-5 text-blue-600" />
                <h3 className="text-lg font-black text-slate-900">나의 팬 선택 & 멤버십 등록 정보 관리</h3>
              </div>

              {loadingApps ? (
                <div className="py-20 flex flex-col items-center justify-center gap-4">
                  <Loader2 className="w-8 h-8 text-blue-600 animate-spin" />
                  <p className="text-slate-400 text-xs font-semibold">데이터베이스로부터 발급 신청 건들을 동기화 중입니다...</p>
                </div>
              ) : (
                <div className="overflow-x-auto rounded-2xl border border-slate-100">
                  <table className="w-full text-left text-sm border-collapse">
                    <thead>
                      <tr className="bg-slate-50 text-slate-400 text-[10px] font-black uppercase tracking-widest border-b border-slate-100">
                        <th className="p-4">신청자</th>
                        <th className="p-4">영어 이니셜/닉네임</th>
                        <th className="p-4">지정 팬 사진/디자인</th>
                        <th className="p-4">휴대폰 번호</th>
                        <th className="p-4">배송지 주소</th>
                        <th className="p-4">신청일자</th>
                        <th className="p-4">상태</th>
                        <th className="p-4 text-center">승인 변경</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-50">
                      {applicationsList.length === 0 ? (
                        <tr>
                          <td colSpan={8} className="p-8 text-center text-xs text-slate-400 font-bold">
                            현재 접수된 나의 팬 선택 등록 내역이 존재하지 않습니다.
                          </td>
                        </tr>
                      ) : (
                        applicationsList.map((app) => (
                          <tr key={app.id} className="hover:bg-slate-50/50 transition-colors">
                            <td className="p-4">
                              <div className="font-bold text-slate-800">{app.displayName}</div>
                              <div className="text-[10px] text-slate-400 font-mono">{app.email}</div>
                            </td>
                            <td className="p-4 font-black text-slate-900 tracking-wide">{app.cardName}</td>
                            <td className="p-4 capitalize font-semibold text-xs text-blue-600">
                              {app.cardColor === 'custom_uploaded' ? (
                                <div className="flex items-center gap-2">
                                  <span className="text-emerald-700 font-black">직접 올린 사진</span>
                                  {app.customImageUrl && (
                                    <a 
                                      href={app.customImageUrl} 
                                      target="_blank" 
                                      rel="noreferrer" 
                                      className="w-10 h-7 rounded border border-slate-200 bg-cover bg-center shrink-0 hover:scale-105 transition-all inline-block shadow-sm"
                                      style={{ backgroundImage: `url(${app.customImageUrl})` }}
                                      title="새창으로 크게 보기"
                                    />
                                  )}
                                </div>
                              ) : (
                                getDesignName(app.cardColor)
                              )}
                            </td>
                            <td className="p-4 text-xs font-semibold text-slate-600">{app.phoneNumber}</td>
                            <td className="p-4 max-w-xs truncate text-xs text-slate-500 font-medium" title={`${app.address} ${app.detailAddress}`}>
                              {app.address} {app.detailAddress}
                            </td>
                            <td className="p-4 text-xs text-slate-400">
                              {app.createdAt?.seconds 
                                ? new Date(app.createdAt.seconds * 1000).toLocaleDateString('ko-KR', { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' }) 
                                : '-'}
                            </td>
                            <td className="p-4">
                              <span className={`text-[10px] px-2.5 py-1 rounded-full font-black uppercase ${
                                app.status === 'approved' ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' :
                                app.status === 'rejected' ? 'bg-red-50 text-red-700 border border-red-200' :
                                'bg-amber-50 text-amber-700 border border-amber-200'
                              }`}>
                                {app.status === 'approved' ? '승인 및 각인' : app.status === 'rejected' ? '보완 필요' : '대기중'}
                              </span>
                            </td>
                            <td className="p-4 text-center">
                              <div className="flex items-center justify-center gap-2">
                                <button
                                  onClick={() => handleUpdateAppStatus(app.id, 'approved')}
                                  disabled={app.status === 'approved'}
                                  className="p-2 bg-emerald-50 hover:bg-emerald-100 disabled:opacity-40 text-emerald-600 rounded-lg hover:scale-105 transition-all"
                                  title="발급 승인"
                                >
                                  <Check className="w-3.5 h-3.5" />
                                </button>
                                <button
                                  onClick={() => handleUpdateAppStatus(app.id, 'rejected')}
                                  disabled={app.status === 'rejected'}
                                  className="p-2 bg-red-50 hover:bg-red-100 disabled:opacity-40 text-red-600 rounded-lg hover:scale-105 transition-all"
                                  title="발급 보완(반려)"
                                >
                                  <Ban className="w-3.5 h-3.5" />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}

          {activeTab === 'designs' && (
            <div className="space-y-8">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-50 pb-4">
                <div className="flex items-center gap-3">
                  <CreditCard className="w-5 h-5 text-blue-600" />
                  <div>
                    <h3 className="text-lg font-black text-slate-900">스타 사진 및 멤버십 템플릿 제어</h3>
                    <p className="text-xs text-slate-400">사용자들이 팬 선택 단계에서 마주하게 되는 스타 고해상도 백그라운드 이미지를 추가, 수정, 삭제합니다.</p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    setEditingDesign(true);
                    setDesignForm({
                      id: `design_${Date.now().toString().slice(-4)}`,
                      name: '',
                      imageUrl: '',
                      textColor: '#ffffff',
                      accentColor: 'Gold'
                    });
                  }}
                  className="flex items-center gap-2 px-6 py-3 bg-blue-50 hover:bg-blue-100 text-blue-600 rounded-xl text-xs font-black self-start transition-all"
                >
                  <Plus className="w-4 h-4" /> 새로운 스타 템플릿 추가
                </button>
              </div>

              {/* Editing or Create Form */}
              {editingDesign && (
                <form onSubmit={handleSaveDesign} className="p-6 bg-slate-50 rounded-2xl border border-slate-100 space-y-6">
                  <div className="flex justify-between items-center">
                    <span className="text-[10px] font-black text-blue-600 uppercase tracking-widest">
                      스타 사진/디자인 편집 및 등록
                    </span>
                    <button
                      type="button"
                      onClick={() => setEditingDesign(null)}
                      className="text-xs text-slate-400 hover:text-slate-600 transition-colors bg-white px-2.5 py-1 rounded-md border border-slate-200"
                    >
                      숨기기
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <div className="space-y-1">
                      <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest block font-sans">디자인 고유 식별 ID (영문, -, _)</label>
                      <input
                        type="text"
                        required
                        disabled={designsList.some(d => d.id === designForm.id)}
                        value={designForm.id}
                        onChange={(e) => setDesignForm({ ...designForm, id: e.target.value.toLowerCase().replace(/[^a-z0-9_\-]/g, '') })}
                        placeholder="예: platinum_gold"
                        className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-xs font-bold text-slate-800 disabled:bg-slate-100 font-sans"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest block font-sans">스타 템플릿 노출 이름 (국문/영문)</label>
                      <input
                        type="text"
                        required
                        value={designForm.name}
                        onChange={(e) => setDesignForm({ ...designForm, name: e.target.value })}
                        placeholder="예: 코요태 신지 오피셜 고해상도"
                        className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-xs font-bold text-slate-800 font-sans"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest block font-sans">폰트/텍스트 색상 (#코드 또는 클래스)</label>
                      <div className="flex gap-2">
                        <input
                          type="color"
                          value={designForm.textColor.startsWith('#') ? designForm.textColor : '#ffffff'}
                          onChange={(e) => setDesignForm({ ...designForm, textColor: e.target.value })}
                          className="w-11 h-11 border border-slate-200 rounded-xl cursor-pointer p-1 shrink-0 bg-white"
                        />
                        <input
                          type="text"
                          value={designForm.textColor}
                          onChange={(e) => setDesignForm({ ...designForm, textColor: e.target.value })}
                          placeholder="#ffffff"
                          className="w-full bg-white border border-slate-200 rounded-xl px-3 py-3 text-xs font-mono font-bold text-slate-800"
                        />
                      </div>
                    </div>

                    <div className="md:col-span-2 space-y-1">
                      <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest block font-sans">고해상 스타/팬 사진 배경 이미지 URL (HTTPS 경로)</label>
                      <div className="flex gap-2">
                        <input
                          type="text"
                          required
                          value={designForm.imageUrl}
                          onChange={(e) => setDesignForm({ ...designForm, imageUrl: e.target.value })}
                          placeholder="예: https://images.unsplash.com/photo-..."
                          className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-xs font-bold text-slate-800 font-sans"
                        />
                        <select
                          onChange={(e) => {
                            if (e.target.value) {
                              const [url, color, name] = e.target.value.split('|');
                              setDesignForm({
                                ...designForm,
                                imageUrl: url,
                                textColor: color || '#ffffff',
                                name: name || designForm.name
                              });
                            }
                          }}
                          className="bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs font-bold text-slate-600 shrink-0 font-sans"
                          defaultValue=""
                        >
                          <option value="" disabled>인기 있는 프리미엄 소재 퀵선택</option>
                          <option value="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80|#5a2d2d|골든 로즈 럭셔리 대리석">골든 로즈 럭셔리 대리석 (Rose)</option>
                          <option value="https://images.unsplash.com/photo-1550684848-fac1c5b4e853?auto=format&fit=crop&w=800&q=80|#fbbf24|미니멀 다크 레이저 카본">미니멀 다크 레이저 카본 (Black)</option>
                          <option value="https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?auto=format&fit=crop&w=800&q=80|#0f172a|하이테크 오로라 사이버넷">오로라 홀로그램 (Iridescent)</option>
                          <option value="https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=800&q=80|#ffffff|황금 메탈릭 브러쉬 플루이드">황금 메탈릭 플루이드 (Gold/Titan)</option>
                          <option value="https://images.unsplash.com/photo-1541701494587-cb58502866ab?auto=format&fit=crop&w=800&q=80|#0ea5e9|프레시 마린 블루 코팅">프레시 마린 블루 코팅 (Deep Blue)</option>
                          <option value="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80|#ffffff|최고급 카라라 이태리 화이트 스톤">고품격 이태리 화이트 스톤 (White Marble)</option>
                        </select>
                      </div>
                    </div>

                    <div className="space-y-1">
                      <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest block font-sans">포인트 인쇄 각인 선종</label>
                      <select
                        value={designForm.accentColor}
                        onChange={(e) => setDesignForm({ ...designForm, accentColor: e.target.value })}
                        className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-xs font-bold text-slate-800 font-sans"
                      >
                        <option value="Gold">Gold Theme (금도금 각인)</option>
                        <option value="Silver">Silver Theme (플래티넘 은도금 각인)</option>
                        <option value="Rose Gold">Rose Gold Theme (황동 로즈 무늬)</option>
                        <option value="Black">Black Layer (카본 메탈 코팅)</option>
                      </select>
                    </div>
                  </div>

                  {/* Preview inside the editor */}
                  <div className="space-y-2">
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-wider block font-sans">실시간 비주얼 카드 프리뷰</span>
                    <div 
                      className="relative rounded-2xl w-full max-w-sm aspect-[1.58/1] overflow-hidden shadow-xl border border-white/10 select-none bg-slate-200 bg-cover bg-center transition-all duration-300"
                      style={{ backgroundImage: designForm.imageUrl ? `url(${designForm.imageUrl})` : undefined }}
                    >
                      <div className="absolute inset-0 bg-black/5" />
                      <div 
                        className="absolute top-4 left-4 text-[10px] font-black tracking-widest uppercase opacity-90 font-sans"
                        style={{ color: designForm.textColor }}
                      >
                        JEONIL MEDIA VIP
                      </div>
                      <div className="absolute top-4 right-4 w-9 h-6 rounded-md bg-gradient-to-r from-yellow-300 to-yellow-600 shadow-inner opacity-80" />
                      
                      <div className="absolute bottom-4 left-4 space-y-1" style={{ color: designForm.textColor }}>
                        <div className="font-mono text-xs tracking-widest opacity-90">
                          4265 9182 3740 9999
                        </div>
                        <div className="flex items-center gap-1.5 text-[8px] font-bold tracking-widest uppercase opacity-80 font-sans">
                          <span className="px-1 py-0.2 bg-white/20 rounded">
                            LEGEND TIER
                          </span>
                          <span>{profile?.displayName?.toUpperCase() || 'NEW MEMBER'}</span>
                        </div>
                      </div>
                      
                      <div 
                        className="absolute bottom-4 right-4 text-[9px] font-black uppercase italic tracking-widest opacity-50 font-sans"
                        style={{ color: designForm.textColor }}
                      >
                        {designForm.accentColor}
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-end gap-3 pt-2">
                    <button
                      type="button"
                      onClick={() => setEditingDesign(null)}
                      className="px-5 py-3 border border-slate-200 rounded-xl text-xs font-bold text-slate-500 hover:bg-slate-100 transition-colors font-sans"
                    >
                      취소
                    </button>
                    <button
                      type="submit"
                      disabled={savingDesign}
                      className="px-6 py-3 bg-blue-600 text-white rounded-xl text-xs font-black flex items-center gap-2 hover:bg-blue-700 transition-all shadow-md shadow-blue-500/10 disabled:opacity-50 font-sans"
                    >
                      {savingDesign ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Save className="w-3.5 h-3.5" />}
                      <span>디자인 저장 및 배포</span>
                    </button>
                  </div>
                </form>
              )}

              {/* Design List and Cards view */}
              {loadingDesigns ? (
                <div className="py-20 flex flex-col items-center justify-center gap-4">
                  <Loader2 className="w-8 h-8 text-blue-600 animate-spin" />
                  <p className="text-slate-400 text-xs font-semibold font-sans">저장된 카드 디자인 목록을 동기화 중입니다...</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {designsList.map((design) => (
                    <div key={design.id} className="bg-white rounded-2xl border border-slate-100 shadow-sm p-4 hover:border-blue-200 hover:shadow-md transition-all flex flex-col justify-between space-y-4">
                      {/* Premium Card Display */}
                      <div 
                        className="relative rounded-xl w-full aspect-[1.58/1] overflow-hidden shadow-md border border-slate-100/50 bg-slate-100 bg-cover bg-center"
                        style={{ backgroundImage: `url(${design.imageUrl})` }}
                      >
                        <div className="absolute inset-0 bg-black/5" />
                        <div 
                          className="absolute top-3 left-3 text-[8px] font-black tracking-widest uppercase opacity-90 font-sans"
                          style={{ color: design.textColor }}
                        >
                          JEONIL MEDIA VIP
                        </div>
                        <div className="absolute top-3 right-3 w-7 h-5 rounded bg-gradient-to-r from-yellow-300 to-yellow-600 shadow-inner opacity-80" />
                        
                        <div className="absolute bottom-3 left-3 space-y-0.5" style={{ color: design.textColor }}>
                          <div className="font-mono text-[9px] tracking-wider opacity-90">
                            4265 9182 3740 ****
                          </div>
                          <div className="text-[7px] font-bold tracking-widest uppercase opacity-80 font-sans">
                            {design.name.split(' (')[0].slice(0, 15)}
                          </div>
                        </div>

                        <div 
                          className="absolute bottom-3 right-3 text-[8px] font-black uppercase italic tracking-widest opacity-40 font-sans"
                          style={{ color: design.textColor }}
                        >
                          {design.accentColor}
                        </div>
                      </div>

                      {/* Detail text */}
                      <div className="space-y-1">
                        <div className="flex justify-between items-center">
                          <h4 className="text-xs font-black text-slate-800 truncate block max-w-[70%] font-sans">{design.name}</h4>
                          <span className="text-[9px] font-bold px-1.5 py-0.5 bg-slate-50 text-slate-400 border border-slate-100 rounded font-mono uppercase">{design.id}</span>
                        </div>
                        <div className="flex justify-between text-[10px] text-slate-400 font-medium font-sans">
                          <span>인쇄선종: {design.accentColor}</span>
                          <span className="font-mono">{design.textColor}</span>
                        </div>
                      </div>

                      {/* Control buttons */}
                      <div className="flex gap-2 pt-2 border-t border-slate-50">
                        <button
                          type="button"
                          onClick={() => {
                            setEditingDesign(true);
                            setDesignForm({
                              id: design.id,
                              name: design.name,
                              imageUrl: design.imageUrl,
                              textColor: design.textColor,
                              accentColor: design.accentColor || 'Gold'
                            });
                          }}
                          className="flex-1 py-2 bg-slate-50 hover:bg-slate-100 rounded-lg text-[10px] font-black text-slate-600 flex items-center justify-center gap-1 font-sans"
                        >
                          <Edit2 className="w-3 h-3" /> 수정
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDeleteDesign(design.id)}
                          className="py-2 px-3 bg-red-50 hover:bg-red-100 rounded-lg text-red-500 hover:text-red-700 transition-colors flex items-center justify-center"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Edit User Modal */}
      <AnimatePresence>
        {editingUser && (
          <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center z-[100] p-4">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              className="bg-white w-full max-w-lg rounded-3xl border border-slate-100 shadow-2xl p-8 space-y-6 relative overflow-hidden"
            >
              <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                <div className="flex items-center gap-2">
                  <Users className="w-5 h-5 text-blue-600" />
                  <h3 className="text-xl font-black text-slate-900">회원 프로필 수정</h3>
                </div>
                <button 
                  onClick={() => setEditingUser(null)}
                  className="p-1 px-2.5 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition-colors text-sm"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleSaveUser} className="space-y-4">
                <div className="space-y-1">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">이름</label>
                  <input 
                    type="text" 
                    required
                    value={editName}
                    onChange={(e) => setEditName(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-100 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 text-slate-800"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">연락처</label>
                  <input 
                    type="text" 
                    value={editPhone}
                    onChange={(e) => setEditPhone(e.target.value)}
                    placeholder="010-1234-5678"
                    className="w-full bg-slate-50 border border-slate-100 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 text-slate-800"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">등급 (Tier)</label>
                    <select 
                      value={editTier}
                      onChange={(e) => setEditTier(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-100 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 text-slate-800"
                    >
                      <option value="Basic">Basic</option>
                      <option value="Gold">Gold</option>
                      <option value="Legend Tier">Legend Tier</option>
                    </select>
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">역할 (Role)</label>
                    <select 
                      value={editRole}
                      onChange={(e) => setEditRole(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-100 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 text-slate-800"
                    >
                      <option value="User">일반 회원 (User)</option>
                      <option value="Sales">크리에이터 (Sales)</option>
                      <option value="Admin">관리자 (Admin)</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">추천인 이메일 (Recommender Email)</label>
                  <input 
                    type="email" 
                    value={editReferred}
                    onChange={(e) => setEditReferred(e.target.value)}
                    placeholder="recruiter@example.com"
                    className="w-full bg-slate-50 border border-slate-100 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 text-slate-800"
                  />
                  <p className="text-[9px] text-slate-400 font-semibold mt-1">※ 추천인을 변경할 시 하위 추천인들의 영업 연쇄 트리(Ancestors) 경로도 자동으로 재계산되어 동기화됩니다.</p>
                </div>

                <div className="pt-4 border-t border-slate-100 flex gap-3">
                  <button 
                    type="button"
                    onClick={() => setEditingUser(null)}
                    className="flex-1 py-3.5 bg-slate-100 text-slate-600 hover:bg-slate-200 transition-all font-black text-xs rounded-xl text-center"
                  >
                    취소
                  </button>
                  <button 
                    type="submit"
                    disabled={savingUser}
                    className="flex-1 py-3.5 bg-blue-600 text-white hover:bg-blue-700 transition-all font-black text-xs rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-blue-500/10"
                  >
                    {savingUser && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
                    저장하기
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

const DEFAULT_SETTINGS = {
  hero: {
    badge: "Shinji Official Project",
    artist: "대한민국 댄스 레전드 그룹 코요태 신지",
    title: "팬클럽",
    subtitle: "카드출시",
    tagline: "2026년 한정판 팬클럽기념 카드출시",
    membershipFee: "₩550,000",
  },
  benefits: [
    {
      title: "New Benefit",
      description: "Description here",
      price: "Price here",
      icon: "Star",
      color: "from-blue-500 to-blue-600",
      image: "https://images.unsplash.com/photo-1517457373958-b7bdd4587205?auto=format&fit=crop&q=80",
      date: "2026-07-15T18:00:00",
      schedule: []
    }
  ]
};
