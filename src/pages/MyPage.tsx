import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Users, 
  ChevronRight, 
  UserCheck, 
  Calendar, 
  ShieldAlert, 
  Sparkles, 
  TrendingUp, 
  Award,
  Loader2,
  ArrowLeft,
  Mail,
  Smartphone,
  Heart,
  ChevronLeft,
  Settings,
  HelpCircle,
  Gem,
  Check,
  Copy
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useFirebase } from '../lib/FirebaseContext';
import { supabase } from '../lib/supabase';

interface UserProfile {
  userId: string;
  email: string;
  displayName: string;
  tier: string;
  role: string;
  referredByEmail: string;
  ancestors: string[];
  phoneNumber?: string;
  createdAt: any;
  selectedFanName?: string;
  selectedFanPhotoUrl?: string;
}

interface TreeNode {
  email: string;
  user: UserProfile;
  children: TreeNode[];
}

export default function MyPage() {
  const { user, profile, loading } = useFirebase();
  const navigate = useNavigate();
  const [downlineUsers, setDownlineUsers] = useState<UserProfile[]>([]);
  const [fetching, setFetching] = useState(false);
  const [errorOriginal, setErrorOriginal] = useState('');
  const [copied, setCopied] = useState(false);

  // User activity metrics for interactive level up
  const [certifiedTickets, setCertifiedTickets] = useState(() => {
    const saved = localStorage.getItem('demo_certified_tickets');
    if (saved) return parseInt(saved, 10);
    if (profile?.tier === 'Legend Tier') return 12;
    if (profile?.tier === 'Gold') return 6;
    return 2;
  });

  const [activityPoints, setActivityPoints] = useState(() => {
    const saved = localStorage.getItem('demo_activity_points');
    if (saved) return parseInt(saved, 10);
    if (profile?.tier === 'Legend Tier') return 450;
    if (profile?.tier === 'Gold') return 220;
    return 80;
  });

  const [toastMessage, setToastMessage] = useState<string | null>(null);

  useEffect(() => {
    localStorage.setItem('demo_certified_tickets', certifiedTickets.toString());
  }, [certifiedTickets]);

  useEffect(() => {
    localStorage.setItem('demo_activity_points', activityPoints.toString());
  }, [activityPoints]);

  const showToast = (message: string) => {
    setToastMessage(message);
    setTimeout(() => {
      setToastMessage(null);
    }, 4000);
  };

  const handleCertifyTicket = () => {
    const nextCount = certifiedTickets + 1;
    setCertifiedTickets(nextCount);
    
    // Check level up threshold
    if (nextCount === 5) {
      showToast('🎉 축하합니다! 티켓 5회 인증 달성으로 [골드 등급]으로 승격되었습니다! ✨');
    } else if (nextCount === 10) {
      showToast('👑 축하합니다! 티켓 10회 인증 달성으로 최고 권위의 [플래티넘 등급]으로 승격되었습니다! 💖');
    } else {
      showToast(`🎟️ 티켓 인증이 완료되었습니다! (현재 인증 수: ${nextCount}개)`);
    }
  };

  const handleContributeActivity = () => {
    const nextPoints = activityPoints + 40;
    setActivityPoints(nextPoints);

    if (activityPoints < 200 && nextPoints >= 200) {
      showToast('🎉 축하합니다! 활동 점수 200점 달성으로 [골드 등급]으로 승격되었습니다! ✨');
    } else if (activityPoints < 400 && nextPoints >= 400) {
      showToast('👑 축하합니다! 활동 점수 400점 달성으로 최고 권위의 [플래티넘 등급]으로 승격되었습니다! 💖');
    } else {
      showToast(`💬 커뮤니티 기여 활동 완료! +40점 획득 (현재 점수: ${nextPoints}점)`);
    }
  };

  const handleResetLevel = () => {
    setCertifiedTickets(2);
    setActivityPoints(80);
    showToast('🌱 등급 가상 시뮬레이션 데이터가 초기화되었습니다.');
  };

  // Get dynamic tier mapping
  const getDynamicTier = () => {
    if (certifiedTickets >= 10 || activityPoints >= 400 || profile?.tier === 'Legend Tier') {
      return {
        id: 'platinum',
        name: '플래티넘 (Platinum)',
        badgeClass: 'bg-gradient-to-r from-amber-400 via-yellow-500 to-amber-600 text-slate-950 border-amber-300 shadow-[0_0_20px_rgba(245,158,11,0.45)]',
        accentColor: 'text-amber-400',
        barColor: 'bg-gradient-to-r from-amber-400 to-yellow-500',
        bgGlow: 'bg-amber-500/5 border-amber-500/20 shadow-[0_0_30px_rgba(245,158,11,0.12)]',
        emoji: '👑',
        pointsNeeded: 0,
        nextTier: null,
        desc: '최고 등급: 모든 프리미엄 권한과 현물 혜택이 상시 개방됩니다.'
      };
    }
    if (certifiedTickets >= 5 || activityPoints >= 200 || profile?.tier === 'Gold') {
      return {
        id: 'gold',
        name: '골드 (Gold)',
        badgeClass: 'bg-gradient-to-r from-slate-200 via-slate-100 to-slate-300 text-slate-950 border-white shadow-[0_0_20px_rgba(226,232,240,0.35)]',
        accentColor: 'text-slate-300',
        barColor: 'bg-gradient-to-r from-slate-400 to-slate-200',
        bgGlow: 'bg-slate-500/5 border-slate-500/20 shadow-[0_0_30px_rgba(226,232,240,0.08)]',
        emoji: '🪙',
        pointsNeeded: 10 - certifiedTickets,
        pointsScoreNeeded: 400 - activityPoints,
        nextTier: '플래티넘',
        desc: '우수 등급: 선예매권 발급 및 비즈니스 추천 영업 권한이 활성화됩니다.'
      };
    }
    return {
      id: 'silver',
      name: '실버 (Silver)',
      badgeClass: 'bg-gradient-to-r from-blue-500/15 to-cyan-500/15 text-cyan-300 border-cyan-500/40 shadow-[0_0_20px_rgba(6,182,212,0.25)]',
      accentColor: 'text-cyan-400',
      barColor: 'bg-gradient-to-r from-blue-500 to-cyan-400',
      bgGlow: 'bg-blue-500/5 border-blue-500/20 shadow-[0_0_30px_rgba(6,182,212,0.1)]',
      emoji: '🥈',
      pointsNeeded: 5 - certifiedTickets,
      pointsScoreNeeded: 200 - activityPoints,
      nextTier: '골드',
      desc: '기본 등급: 마이 멤버십 디지털 팬 패스 발급 및 기본 리베이트 혜택이 적용됩니다.'
    };
  };

  const currentTierInfo = getDynamicTier();

  const handleCopyLink = () => {
    if (!user || !user.email) return;
    const link = `https://fandomaurora.com/signup?ref=${encodeURIComponent(user.email)}`;
    
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(link).then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }).catch(err => {
        console.error("Clipboard copy failed, trying fallback:", err);
        fallbackCopyText(link);
      });
    } else {
      fallbackCopyText(link);
    }
  };

  const fallbackCopyText = (text: string) => {
    try {
      const textArea = document.createElement("textarea");
      textArea.value = text;
      textArea.style.top = "0";
      textArea.style.left = "0";
      textArea.style.position = "fixed";
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();
      const successful = document.execCommand('copy');
      document.body.removeChild(textArea);
      if (successful) {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } else {
        console.error("Fallback copy command was unsuccessful");
      }
    } catch (err) {
      console.error("Fallback copy error:", err);
    }
  };

  const isSalesOrAdmin = user && (user.email === 'new2020.jeonil@gmail.com' || (profile && (profile.role === 'Sales' || profile.role === 'Admin')));

  useEffect(() => {
    if (!loading && !user) {
      navigate('/login');
    }
  }, [loading, user, navigate]);

  useEffect(() => {
    if (user && isSalesOrAdmin && user.email) {
      const fetchDownline = async () => {
        try {
          setFetching(true);
          const { data, error } = await supabase
            .from('users')
            .select('*')
            .contains('ancestors', [user.email]);

          if (error) throw error;
          setDownlineUsers(data || []);
        } catch (err: any) {
          console.error("Supabase error loading downline users:", err);
          setErrorOriginal(err.message || "추천인 목록을 불러오는 중 오류가 발생했습니다.");
        } finally {
          setFetching(false);
        }
      };
      fetchDownline();
    }
  }, [user, isSalesOrAdmin]);

  const buildTree = (rootEmail: string, list: UserProfile[]): TreeNode[] => {
    const directRecruits = list.filter(u => u.referredByEmail === rootEmail);
    return directRecruits.map(rec => ({
      email: rec.email,
      user: rec,
      children: buildTree(rec.email, list)
    }));
  };

  const treeData = user && user.email ? buildTree(user.email, downlineUsers) : [];

  const totalDirectCount = downlineUsers.filter(u => u.referredByEmail === user?.email).length;
  const totalIndirectCount = downlineUsers.length - totalDirectCount;
  const legendTierCount = downlineUsers.filter(u => u.tier === 'Legend Tier').length;

  if (loading || (fetching && isSalesOrAdmin)) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#02050c]">
        <div className="text-center space-y-4">
          <Loader2 className="w-10 h-10 text-blue-500 animate-spin mx-auto" />
          <p className="text-slate-400 text-xs font-semibold">나의 정보 및 비즈니스 데이터 동기화 중...</p>
        </div>
      </div>
    );
  }

  const renderTreeNode = (node: TreeNode, depth: number = 0) => {
    const formattedDate = (() => {
      if (!node.user.createdAt) return '가입일 정보 없음';
      let d: Date;
      if (typeof node.user.createdAt.toDate === 'function') {
        d = node.user.createdAt.toDate();
      } else if (node.user.createdAt.seconds !== undefined) {
        d = new Date(node.user.createdAt.seconds * 1000);
      } else if (node.user.createdAt instanceof Date) {
        d = node.user.createdAt;
      } else {
        d = new Date(node.user.createdAt);
      }
      return d.toLocaleDateString('ko-KR', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      });
    })();

    return (
      <div key={node.email} className="relative pl-6 md:pl-10 mt-6 select-none group">
        {/* Connection Line (vertical) */}
        {node.children.length > 0 && (
          <div className="absolute left-[9px] top-10 bottom-0 w-[2px] bg-gradient-to-b from-blue-500/40 via-purple-500/20 to-slate-900 rounded" />
        )}
        
        {/* Horizontal connection line */}
        <div className="absolute left-0 top-7 w-[20px] md:w-[32px] h-[2px] bg-blue-500/35 rounded" />
        
        {/* Node point marker with emerald glow */}
        <div className="absolute left-[-4px] top-[22px] w-3 h-3 rounded-full bg-cyan-400 border border-slate-950 shadow-[0_0_10px_rgba(34,211,238,0.8)] group-hover:scale-125 transition-transform" />

        {/* Member Card with deep dark neon borders */}
        <motion.div 
          whileHover={{ y: -2, scale: 1.01 }}
          className="bg-slate-950/80 border border-slate-800/80 rounded-2xl p-5 shadow-[0_4px_24px_rgba(0,0,0,0.5)] hover:border-blue-500/40 hover:shadow-[0_0_20px_rgba(59,130,246,0.15)] transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4"
        >
          <div className="flex items-center gap-4">
            <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${
              node.user.tier === 'Legend Tier' ? 'from-amber-400 to-amber-600 shadow-amber-500/20' :
              node.user.tier === 'Gold' ? 'from-slate-700 to-slate-900 border border-slate-700' :
              'from-blue-900 to-slate-950 border border-blue-800/40'
            } flex items-center justify-center text-white font-black text-xs shadow-md`}>
              {node.user.displayName ? node.user.displayName.substring(0, 2) : '유저'}
            </div>
            <div className="space-y-1">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="font-black text-white text-sm">{node.user.displayName}</span>
                <span className={`text-[9px] px-2 py-0.5 rounded font-black uppercase tracking-wider ${
                  node.user.tier === 'Legend Tier' ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20' :
                  node.user.tier === 'Gold' ? 'bg-slate-800 text-slate-300' :
                  'bg-blue-500/10 text-blue-400 border border-blue-500/20'
                }`}>
                  <span className="md:inline">{node.user.tier}</span>
                  <span className="md:hidden">
                    {node.user.tier === 'Legend Tier' ? '👑 레전드' : node.user.tier === 'Gold' ? '🪙 골드' : '🌱 일반'}
                  </span>
                </span>

                {node.user.selectedFanName && (
                  <span className="text-[9px] px-2 py-0.5 bg-rose-500/10 text-rose-400 rounded font-black flex items-center gap-1 border border-rose-500/20">
                    <Heart className="w-2.5 h-2.5 fill-rose-500 text-rose-500" />
                    <span>{node.user.selectedFanName.split(' ')[1] || node.user.selectedFanName.split('(')[0]}</span>
                  </span>
                )}

                {node.user.role === 'Sales' && (
                  <span className="text-[9px] px-1.5 py-0.5 bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 rounded font-black">
                    🎙️ <span className="hidden sm:inline">크리에이터</span>
                  </span>
                )}
              </div>
              <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-slate-400 text-[11px] font-semibold">
                <span className="flex items-center gap-1"><Mail className="w-3.5 h-3.5 text-slate-500" />{node.user.email}</span>
                {node.user.phoneNumber && (
                  <span className="flex items-center gap-1"><Smartphone className="w-3.5 h-3.5 text-slate-500" />{node.user.phoneNumber}</span>
                )}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-1.5 border-t sm:border-t-0 pt-3 sm:pt-0 border-slate-900 text-slate-500 text-xs font-semibold shrink-0">
            <span>📆</span>
            <span className="text-[11px] text-slate-400 font-bold">
              <span className="hidden sm:inline">가입일: </span>{formattedDate}
            </span>
          </div>
        </motion.div>

        {/* Recursive Children rendering */}
        {node.children.length > 0 && (
          <div className="space-y-2 mt-2">
            {node.children.map(child => renderTreeNode(child, depth + 1))}
          </div>
        )}
      </div>
    );
  };

  const selectedFanName = profile?.selectedFanName || '';
  const selectedFanPhoto = profile?.selectedFanPhotoUrl || '';
  const selectedFanId = profile?.selectedFanId || '';

  // Emojis mapping for header matching
  const matchingEmoticon = selectedFanId === 'shinji_classic' ? '🎤🌟🧚‍♀️' :
                           selectedFanId === 'shinji_vocal' ? '👗✨🤍' :
                           selectedFanId === 'shinji_peach' ? 'Peach 🍑🌸☀️' :
                           selectedFanId === 'shinji_diva' ? '🖤👑🔥' : '💖🌟';

  return (
    <div className="min-h-screen pt-32 pb-20 px-4 md:px-10 bg-[#02050c] text-slate-100 relative overflow-hidden" id="mypage-master-wrapper">
      {/* Glow ambient halos */}
      <div className="absolute top-0 right-0 w-[450px] h-[450px] bg-blue-600/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[20%] left-[-100px] w-[450px] h-[450px] bg-purple-600/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto space-y-10 relative z-10">
        
        {/* Header Title Section */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 border-b border-slate-900 pb-8">
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Link to="/" className="p-2.5 bg-slate-950 rounded-full border border-slate-800 text-slate-400 hover:text-white transition-colors shadow-lg">
                <ArrowLeft className="w-4 h-4" />
              </Link>
              <div className="flex items-center gap-1.5 px-3.5 py-1 bg-blue-500/10 text-cyan-300 rounded-full text-[9px] font-black uppercase tracking-widest border border-blue-500/20">
                <Sparkles className="w-3 h-3 text-amber-400 animate-pulse" />
                <span>My Information Hub</span>
              </div>
            </div>
            <h1 className="text-3xl md:text-4xl font-display font-black tracking-tight text-white">
              나의 정보 & 마이페이지
            </h1>
            <p className="text-slate-400 text-xs md:text-sm font-bold">
              최애 지정 상태 확인 및 맞춤형 혜택에 접속할 수 있는 종합 멤버십 센터입니다.
            </p>
          </div>

          <div className="bg-slate-950/80 p-4.5 rounded-2xl border border-blue-500/20 shadow-xl flex items-center gap-4 max-w-sm">
            <div className="w-11 h-11 bg-blue-500/10 rounded-xl flex items-center justify-center text-cyan-400 border border-blue-500/20 shrink-0">
              <UserCheck className="w-5 h-5" />
            </div>
            <div className="overflow-hidden">
              <div className="text-[9px] font-black text-slate-500 uppercase tracking-widest">현재 본인 ID</div>
              <div className="font-extrabold text-white text-sm truncate max-w-[180px]">{profile?.displayName || '가입된 회원'}님</div>
              <div className="text-[10px] text-slate-400 font-medium truncate max-w-[180px]">{user?.email}</div>
            </div>
          </div>
        </div>

        {/* Dynamic Toast Alerts */}
        <AnimatePresence>
          {toastMessage && (
            <motion.div
              initial={{ opacity: 0, y: -20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.95 }}
              className="fixed top-6 left-1/2 -translate-x-1/2 z-50 bg-[#060b18]/95 border border-cyan-500/50 px-6 py-4 rounded-2xl shadow-[0_0_25px_rgba(34,211,238,0.35)] flex items-center gap-3 max-w-md backdrop-blur-md"
            >
              <div className="w-8 h-8 rounded-full bg-cyan-500/20 flex items-center justify-center text-cyan-400 shrink-0">
                <Sparkles className="w-4.5 h-4.5 animate-spin" style={{ animationDuration: '4s' }} />
              </div>
              <p className="text-xs md:text-sm font-extrabold text-slate-100 leading-relaxed text-left">
                {toastMessage}
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Fandom Membership Tier & Level Guide Section */}
        <div className="bg-[#050914]/80 rounded-[2.5rem] border border-blue-500/25 p-6 md:p-8 shadow-[0_0_30px_rgba(59,130,246,0.12)] space-y-8" id="fandom-membership-tier-panel">
          
          {/* Section Subtitle & Glow Headers */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-900 pb-5">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-xl flex items-center justify-center text-slate-950 font-black shadow-lg shadow-cyan-500/10">
                <Gem className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-lg md:text-xl font-black text-white flex items-center gap-2">
                  오로라 팬덤 멤버십 등급 & 혜택 센터
                  <span className="text-[9px] font-black bg-blue-500/15 text-cyan-300 border border-cyan-500/20 px-2 py-0.5 rounded-full uppercase font-mono tracking-wider">Interactive Live</span>
                </h2>
                <p className="text-[11px] text-slate-400 font-bold mt-0.5">활동 수준 및 공연 티켓 인증 횟수에 따라 등급과 혜택이 실시간으로 활성화됩니다.</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button 
                onClick={handleResetLevel}
                className="px-3.5 py-1.5 bg-slate-900/60 hover:bg-slate-900 border border-slate-850 hover:border-slate-800 text-[10px] text-slate-400 hover:text-white rounded-lg font-bold transition-all flex items-center gap-1.5"
                title="시뮬레이션 초기화"
              >
                🔄 가상데이터 초기화
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            
            {/* 1. Left Column: My Current Active Tier & Interactive Level-up buttons */}
            <div className="lg:col-span-5 bg-slate-950/70 rounded-3xl p-6 border border-slate-800 flex flex-col justify-between space-y-6 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 bg-cyan-500/5 rounded-full blur-2xl pointer-events-none" />
              
              <div className="space-y-5">
                <div className="text-[9px] font-black tracking-widest text-slate-500 uppercase font-mono">My Active Member Badge</div>
                
                {/* Visual Badge Display */}
                <div className="flex items-center gap-4.5 bg-[#02050c]/80 p-5 rounded-2xl border border-slate-900 shadow-inner">
                  <div className={`w-16 h-16 rounded-full flex items-center justify-center text-3xl shrink-0 border-2 ${currentTierInfo.badgeClass}`}>
                    {currentTierInfo.emoji}
                  </div>
                  <div className="space-y-1">
                    <span className="text-[10px] text-slate-500 font-black uppercase">현재 멤버십 등급</span>
                    <h3 className={`text-xl font-black tracking-tight ${currentTierInfo.accentColor}`}>{currentTierInfo.name}</h3>
                    <p className="text-[10px] text-slate-400 font-semibold">{currentTierInfo.desc}</p>
                  </div>
                </div>

                {/* Simulated Stats Metrics */}
                <div className="grid grid-cols-2 gap-3 pt-1">
                  <div className="bg-[#02050c]/60 p-3.5 rounded-xl border border-slate-900/80 text-center">
                    <div className="text-[9px] text-slate-500 font-black">🎟️ 인증된 공연 티켓</div>
                    <div className="text-xl font-black text-cyan-400 mt-1">{certifiedTickets} <span className="text-xs text-slate-400 font-bold">장</span></div>
                  </div>
                  <div className="bg-[#02050c]/60 p-3.5 rounded-xl border border-slate-900/80 text-center">
                    <div className="text-[9px] text-slate-500 font-black">💬 커뮤니티 활동 점수</div>
                    <div className="text-xl font-black text-purple-400 mt-1">{activityPoints} <span className="text-xs text-slate-400 font-bold">점</span></div>
                  </div>
                </div>

                {/* Dynamic Level-up Progress bar */}
                <div className="space-y-2 pt-2 bg-[#02050c]/30 p-4 rounded-xl border border-slate-900/60">
                  <div className="flex justify-between items-center text-[11px] font-bold">
                    <span className="text-slate-400">다음 등급 달성도</span>
                    {currentTierInfo.nextTier ? (
                      <span className="text-cyan-400">
                        {currentTierInfo.pointsNeeded > 0 ? `티켓 ${currentTierInfo.pointsNeeded}장` : ''} 
                        {currentTierInfo.pointsNeeded > 0 && currentTierInfo.pointsScoreNeeded > 0 ? ' 또는 ' : ''}
                        {currentTierInfo.pointsScoreNeeded > 0 ? `활동 ${currentTierInfo.pointsScoreNeeded}점` : ''} 후 [{currentTierInfo.nextTier}]
                      </span>
                    ) : (
                      <span className="text-amber-400 font-black flex items-center gap-1">👑 최고 레벨 도달 완료!</span>
                    )}
                  </div>

                  {/* HTML level bar */}
                  <div className="relative w-full h-3 bg-slate-900 rounded-full overflow-hidden border border-slate-800">
                    <div 
                      className={`h-full rounded-full transition-all duration-700 ease-out ${currentTierInfo.barColor}`}
                      style={{ 
                        width: !currentTierInfo.nextTier 
                          ? '100%' 
                          : `${Math.min(100, (currentTierInfo.id === 'silver' 
                              ? (certifiedTickets / 5) * 100 
                              : ((certifiedTickets - 5) / 5) * 100))}%` 
                      }}
                    />
                  </div>
                  
                  <p className="text-[9px] text-slate-500 leading-normal font-medium text-left">
                    ※ 티켓 5장(활동 200점) 달성 시 <strong>골드</strong>, 티켓 10장(활동 400점) 달성 시 <strong>플래티넘</strong>으로 자동 등급 변경됩니다.
                  </p>
                </div>
              </div>

              {/* Simulation Interaction Zone */}
              <div className="pt-4 border-t border-slate-900 space-y-2.5">
                <div className="text-[9px] font-black text-slate-500 uppercase tracking-widest text-left">Fandom Activity Simulator</div>
                <div className="flex gap-2.5">
                  <button
                    onClick={handleCertifyTicket}
                    className="flex-1 py-3 bg-cyan-500/10 hover:bg-cyan-500/15 border border-cyan-500/20 hover:border-cyan-500/45 text-cyan-300 rounded-xl text-[11px] font-black shadow-sm transition-all active:scale-[0.98]"
                  >
                    티켓 추가 인증 🎟️
                  </button>
                  <button
                    onClick={handleContributeActivity}
                    className="flex-1 py-3 bg-purple-500/10 hover:bg-purple-500/15 border border-purple-500/20 hover:border-purple-500/45 text-purple-300 rounded-xl text-[11px] font-black shadow-sm transition-all active:scale-[0.98]"
                  >
                    활동 기여하기 💬
                  </button>
                </div>
              </div>

            </div>

            {/* 2. Right Column: Tier Benefits Comparison List */}
            <div className="lg:col-span-7 flex flex-col justify-between space-y-4">
              <div className="text-[9px] font-black tracking-widest text-slate-500 uppercase font-mono">Fandom Tier Benefits Roadmap</div>
              
              {/* Silver, Gold, Platinum Card Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 h-full items-stretch">
                
                {/* Silver Card */}
                <div className={`rounded-2xl p-5 border flex flex-col justify-between transition-all duration-300 ${
                  currentTierInfo.id === 'silver' 
                    ? 'bg-[#060e22] border-cyan-400/40 shadow-[0_0_15px_rgba(6,182,212,0.15)] scale-[1.01]' 
                    : 'bg-slate-950/40 border-slate-900 opacity-65 hover:opacity-100'
                }`}>
                  <div className="space-y-4">
                    <div className="flex justify-between items-start">
                      <span className="text-[10px] font-black px-2 py-0.5 bg-blue-500/10 border border-blue-500/20 text-blue-400 rounded">🥈 실버 등급</span>
                      {currentTierInfo.id === 'silver' && (
                        <span className="text-[9px] font-black text-cyan-400 animate-pulse flex items-center gap-0.5">● 활성</span>
                      )}
                    </div>
                    
                    <div className="space-y-2.5 text-left">
                      <p className="text-[10px] text-slate-400 font-semibold leading-relaxed">팬덤에 갓 입문한 회원님들을 위한 기초 우대 패키지</p>
                      
                      <ul className="space-y-1.5 text-[11px] font-bold text-slate-300">
                        <li className="flex items-start gap-1">
                          <Check className="w-3.5 h-3.5 text-cyan-400 shrink-0 mt-0.5" />
                          <span>기본 커뮤니티 입장 & 인증</span>
                        </li>
                        <li className="flex items-start gap-1">
                          <Check className="w-3.5 h-3.5 text-cyan-400 shrink-0 mt-0.5" />
                          <span>디지털 팬 패스 상시 발급</span>
                        </li>
                        <li className="flex items-start gap-1">
                          <Check className="w-3.5 h-3.5 text-cyan-400 shrink-0 mt-0.5" />
                          <span>예매 수수료 10% 포인트 적립</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                  
                  <div className="pt-3 border-t border-slate-900 mt-4 text-[10px] text-slate-500 text-left font-bold">
                    달성 기준: 기본 가입 완료
                  </div>
                </div>

                {/* Gold Card */}
                <div className={`rounded-2xl p-5 border flex flex-col justify-between transition-all duration-300 ${
                  currentTierInfo.id === 'gold' 
                    ? 'bg-[#151c2e] border-slate-300 shadow-[0_0_20px_rgba(255,255,255,0.15)] scale-[1.01]' 
                    : 'bg-slate-950/40 border-slate-900 opacity-65 hover:opacity-100'
                }`}>
                  <div className="space-y-4">
                    <div className="flex justify-between items-start">
                      <span className="text-[10px] font-black px-2 py-0.5 bg-slate-100 text-slate-950 rounded">🪙 골드 등급</span>
                      {currentTierInfo.id === 'gold' && (
                        <span className="text-[9px] font-black text-slate-300 animate-pulse flex items-center gap-0.5">● 활성</span>
                      )}
                    </div>
                    
                    <div className="space-y-2.5 text-left">
                      <p className="text-[10px] text-slate-400 font-semibold leading-relaxed">팬덤 활동을 적극 입증한 핵심 서포터 우대 패키지</p>
                      
                      <ul className="space-y-1.5 text-[11px] font-bold text-slate-200">
                        <li className="flex items-start gap-1">
                          <Check className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                          <span className="text-white">단독 콘서트 최우선 선예매권</span>
                        </li>
                        <li className="flex items-start gap-1">
                          <Check className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                          <span>최애 팬 연동 무제한 자유수정</span>
                        </li>
                        <li className="flex items-start gap-1">
                          <Check className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                          <span>추천 영업 하위 링크 활성화</span>
                        </li>
                        <li className="flex items-start gap-1">
                          <Check className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                          <span>한정 굿즈 패키지 선구매권</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                  
                  <div className="pt-3 border-t border-slate-900 mt-4 text-[10px] text-slate-400 text-left font-bold">
                    달성 기준: 티켓 5회 또는 활동 200점
                  </div>
                </div>

                {/* Platinum Card */}
                <div className={`rounded-2xl p-5 border flex flex-col justify-between transition-all duration-300 ${
                  currentTierInfo.id === 'platinum' 
                    ? 'bg-[#1e170a] border-amber-400/50 shadow-[0_0_20px_rgba(245,158,11,0.2)] scale-[1.01]' 
                    : 'bg-slate-950/40 border-slate-900 opacity-65 hover:opacity-100'
                }`}>
                  <div className="space-y-4">
                    <div className="flex justify-between items-start">
                      <span className="text-[10px] font-black px-2 py-0.5 bg-gradient-to-r from-amber-400 to-yellow-500 text-black rounded font-black">👑 플래티넘</span>
                      {currentTierInfo.id === 'platinum' && (
                        <span className="text-[9px] font-black text-amber-400 animate-pulse flex items-center gap-0.5">● 활성</span>
                      )}
                    </div>
                    
                    <div className="space-y-2.5 text-left">
                      <p className="text-[10px] text-amber-500/80 font-semibold leading-relaxed">최고의 기여를 다한 수석 레전드 최상위 VIP 패키지</p>
                      
                      <ul className="space-y-1.5 text-[11px] font-bold text-amber-100">
                        <li className="flex items-start gap-1">
                          <Check className="w-3.5 h-3.5 text-amber-500 shrink-0 mt-0.5" />
                          <span className="text-amber-300 font-extrabold">전국 투어 VIP 프리패스 (연2회)</span>
                        </li>
                        <li className="flex items-start gap-1">
                          <Check className="w-3.5 h-3.5 text-amber-500 shrink-0 mt-0.5" />
                          <span>실물 순금 각인 소장용 기념 주화</span>
                        </li>
                        <li className="flex items-start gap-1">
                          <Check className="w-3.5 h-3.5 text-amber-500 shrink-0 mt-0.5" />
                          <span>미공개 고화질 포토 카드 배송</span>
                        </li>
                        <li className="flex items-start gap-1">
                          <Check className="w-3.5 h-3.5 text-amber-500 shrink-0 mt-0.5" />
                          <span>영업 커미션 최고 60% 단계 보장</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                  
                  <div className="pt-3 border-t border-slate-900 mt-4 text-[10px] text-amber-400 text-left font-black">
                    달성 기준: 티켓 10회 또는 활동 400점
                  </div>
                </div>

              </div>
            </div>

          </div>

        </div>

        {/* User Information & Fan Display grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch" id="user-info-and-fan-grid">
          
          {/* Fandom Display Block (Displays who they are a fan of) */}
          <div className="lg:col-span-4 flex">
            <div className="w-full bg-slate-950/80 backdrop-blur-md rounded-3xl p-6 border border-blue-500/20 shadow-2xl flex flex-col justify-between relative overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 bg-rose-500/5 rounded-full blur-xl pointer-events-none" />
              
              <div className="space-y-5">
                <div className="flex justify-between items-center border-b border-slate-900 pb-3">
                  <span className="text-[10px] font-black text-rose-400 uppercase tracking-widest flex items-center gap-1.5">
                    <Heart className="w-4 h-4 fill-rose-500 text-rose-500 animate-pulse" />
                    <span>내가 지지하는 아티스트</span>
                  </span>
                  <span className="text-[9px] text-slate-500 font-mono">Real-time Matching</span>
                </div>

                {selectedFanName ? (
                  <div className="space-y-4 text-center py-2">
                    <div className="relative w-36 h-36 mx-auto rounded-full overflow-hidden border-4 border-slate-800 shadow-xl group">
                      <img 
                        src={selectedFanPhoto} 
                        alt={selectedFanName} 
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        onError={(e) => {
                          e.currentTarget.src = "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&w=800&q=80";
                        }}
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute inset-0 bg-black/20" />
                    </div>

                    <div className="space-y-1">
                      <div className="inline-flex items-center gap-1 px-3 py-1 bg-rose-500/10 border border-rose-500/20 rounded text-[10px] font-black text-rose-400">
                        <span>COYOTE SHINJI {matchingEmoticon}</span>
                      </div>
                      <h3 className="text-base font-black text-white leading-tight">{selectedFanName}</h3>
                      <p className="text-[10px] text-slate-400 font-semibold">탑재일자 수시 동기화 보장</p>
                    </div>
                  </div>
                ) : (
                  <div className="py-12 text-center space-y-4">
                    <div className="w-16 h-16 bg-slate-900 border border-dashed border-slate-850 rounded-full flex items-center justify-center mx-auto text-slate-600">
                      <Heart className="w-8 h-8 opacity-40 animate-pulse" />
                    </div>
                    <div className="space-y-1 px-4">
                      <p className="text-slate-200 text-xs font-black">선택 완료된 팬이 없습니다</p>
                      <p className="text-[10px] text-slate-500 leading-relaxed font-semibold">원하는 최애 스타 멤버 사진을 선택하시면 마이페이지에 아름다운 엠블럼과 함께 즉각 탑재됩니다!</p>
                    </div>
                  </div>
                )}
              </div>

              <Link 
                to="/apply"
                className="w-full py-3.5 bg-slate-900 hover:bg-slate-850 border border-slate-800 text-white text-center font-black text-xs rounded-xl shadow-lg transition-transform active:scale-[0.99] mt-6 block"
              >
                {selectedFanName ? '최애 팬 정보/사진 수정하기 🌟' : '지금 즉시 최애 스타 선택하러 가기 ✨'}
              </Link>
            </div>
          </div>

          {/* User Profile Info Card (Always accessible for all users) */}
          <div className="lg:col-span-8 flex">
            <div className="w-full bg-slate-950/80 backdrop-blur-md rounded-3xl p-6 md:p-8 border border-blue-500/20 shadow-2xl flex flex-col justify-between relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/5 rounded-full blur-2xl pointer-events-none" />
              
              <div className="space-y-6">
                <div className="flex items-center justify-between border-b border-slate-900 pb-3">
                  <h3 className="text-base font-black text-white flex items-center gap-1.5">
                    <Gem className="w-5 h-5 text-amber-400 animate-pulse" />
                    <span>마이 멤버십 기본 정보</span>
                  </h3>
                  <span className="text-[10px] bg-slate-900 text-slate-400 px-2.5 py-0.5 rounded font-black uppercase font-mono border border-slate-800">STATUS</span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <span className="text-[10px] font-black text-slate-500 uppercase tracking-wider block">사용자 성명 / 닉네임</span>
                      <p className="text-sm font-extrabold text-slate-200 mt-0.5">{profile?.displayName || user?.email?.split('@')[0]}</p>
                    </div>
                    <div>
                      <span className="text-[10px] font-black text-slate-500 uppercase tracking-wider block">등록 승인 이메일</span>
                      <p className="text-sm font-extrabold text-slate-200 mt-0.5">{user?.email}</p>
                    </div>
                    <div>
                      <span className="text-[10px] font-black text-slate-500 uppercase tracking-wider block">권한 레벨</span>
                      <p className="text-xs font-black inline-flex items-center gap-1 px-2.5 py-0.5 bg-indigo-500/10 text-indigo-300 rounded-full mt-1 border border-indigo-500/20">
                        {profile?.role === 'Sales' ? '정식 공인 파트너 크리에이터' : profile?.role === 'Admin' ? '통합 최고 관리자' : '팬덤 서포터 정회원'}
                      </p>
                    </div>
                  </div>

                  <div className="space-y-4 border-t md:border-t-0 md:border-l border-slate-900 pt-4 md:pt-0 md:pl-6">
                    <div>
                      <span className="text-[10px] font-black text-slate-500 uppercase tracking-wider block">지정 멤버십 등급</span>
                      <div className="flex items-center gap-1.5 mt-1">
                        <span className={`text-xs px-3 py-1 font-black rounded-lg uppercase tracking-wider ${
                          profile?.tier === 'Legend Tier' ? 'bg-amber-500/10 text-amber-400 border border-amber-500/25' :
                          'bg-blue-500/10 text-blue-400 border border-blue-500/25'
                        }`}>
                          {profile?.tier || 'Basic Tier'}
                        </span>
                      </div>
                    </div>
                    <div>
                      <span className="text-[10px] font-black text-slate-500 uppercase tracking-wider block">비상 연락망 연동</span>
                      <p className="text-sm font-extrabold text-slate-200 mt-0.5">{profile?.phoneNumber || '미연치됨 (신청 시 번들 등록)'}</p>
                    </div>
                    <div>
                      <span className="text-[10px] font-black text-slate-500 uppercase tracking-wider block">현재 탑재 상태</span>
                      <p className="text-xs font-black text-emerald-400 mt-0.5 flex items-center gap-1">
                        <Check className="w-4 h-4" /> 가상 응원 ID 활성화 중 (지정서 정상 발급)
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="pt-6 border-t border-slate-900 mt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
                <span className="text-[11px] text-slate-500 font-semibold leading-relaxed">
                  ※ 전일미디어 특별 조항: 모든 정보는 오로라 분산 서버 데이터에 즉각 저장되어 임의로 분실하지 않습니다.
                </span>
                <button
                  onClick={() => alert(`본인 등급: ${profile?.tier || 'Basic'} / 본사 고객지원 연락처: 010-0000-0000`)}
                  className="px-4 py-2 bg-slate-900 border border-slate-800 hover:bg-slate-850 text-slate-300 rounded-lg text-xs font-bold transition-all text-right shrink-0"
                >
                  보완 문의하기
                </button>
              </div>
            </div>
          </div>

        </div>

        {/* Sales or admin exclusive area */}
        {isSalesOrAdmin ? (
          <div className="space-y-10 pt-4" id="sales-exclusive-workspace-wrapper">
            
            <div className="flex items-center gap-2 px-1">
              <div className="w-2.5 h-2.5 rounded-full bg-blue-500 animate-pulse" />
              <h2 className="text-lg font-black text-white uppercase tracking-wider">영업 수석 매니저 전용 작업 영역</h2>
            </div>

            {/* Bento Grid Banners */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-6 rounded-[2rem] bg-gradient-to-r from-blue-950 via-[#0e172a] to-slate-950 border border-blue-500/20 shadow-xl flex flex-col justify-between text-white gap-6 relative overflow-hidden"
              >
                <div className="absolute -bottom-8 -right-8 w-32 h-32 bg-blue-500/5 rounded-full blur-2xl pointer-events-none" />
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-blue-500/10 rounded-2xl flex items-center justify-center border border-blue-500/20 text-white shadow-xl shrink-0">
                    <Copy className="w-5 h-5 text-amber-400 animate-pulse" />
                  </div>
                  <div className="space-y-1">
                    <span className="text-[9px] font-black text-blue-400 tracking-wider uppercase block font-mono">My Referral Link</span>
                    <h3 className="text-base font-black tracking-tight text-white">나의 전용 추천인 가입 링크</h3>
                    <p className="text-[11px] text-slate-400 leading-relaxed font-semibold">
                      아래의 고유 추천인 파트너 링크를 전달하여 신규 가입자가 추천인 입력 없이 즉각적으로 가입하도록 공유해 보세요.
                    </p>
                  </div>
                </div>
                
                <button
                  type="button"
                  onClick={handleCopyLink}
                  className="w-full text-center py-4 bg-slate-900 border border-slate-800 text-white tracking-tight font-black text-xs rounded-xl shadow-lg hover:bg-slate-850 transition-all flex items-center justify-center gap-2"
                >
                  {copied ? (
                    <>
                      <Check className="w-4 h-4 text-emerald-400 animate-bounce" />
                      <span className="text-emerald-400">추천인 가입 링크 복사 완료 📋</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4 text-cyan-400" />
                      <span>원클릭 추천인 가입 링크 복사하기 🔗</span>
                    </>
                  )}
                </button>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="p-6 rounded-[2rem] bg-slate-950 border border-blue-500/20 shadow-xl flex flex-col justify-between text-slate-300 gap-6 relative overflow-hidden"
              >
                <div className="absolute -bottom-8 -right-8 w-32 h-32 bg-purple-500/5 rounded-full blur-2xl pointer-events-none" />
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-purple-500/10 rounded-2xl flex items-center justify-center border border-purple-500/20 text-purple-400 shadow-sm shrink-0">
                    <Sparkles className="w-6 h-6 animate-spin" style={{ animationDuration: '6s' }} />
                  </div>
                  <div className="space-y-1">
                    <span className="text-[9px] font-black text-purple-400 tracking-wider uppercase block font-mono">Support center</span>
                    <h3 className="text-base font-black tracking-tight text-white">오로라 영업 지원 포털</h3>
                    <p className="text-[11px] text-slate-400 leading-relaxed font-semibold">
                      2026 한정판 영업계획서, 전국 조직 위탁 전개 제안서, 마케터 대모집 포스터 및 수당 계산기 툴킷.
                    </p>
                  </div>
                </div>
                <Link
                  to="/mypage/aurora"
                  className="w-full text-center py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white tracking-tight font-black text-xs rounded-xl shadow-lg hover:shadow-blue-600/10 transition-all block"
                >
                  오로라 영업 지원 및 계획 가이드 보기 📄
                </Link>
              </motion.div>
            </div>

            {/* Statistics Cards */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
              <motion.div 
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 }}
                className="p-4 md:p-6 bg-slate-950 border border-slate-900 rounded-3xl shadow-sm space-y-3"
              >
                <div className="flex items-center justify-between">
                  <span className="text-[11px] md:text-xs font-black text-slate-300 uppercase tracking-tight flex items-center gap-1">
                    <span className="text-lg md:text-sm">🧑‍🤝‍🧑</span>
                    <span className="hidden sm:inline">나의 직속 추천인 (1차)</span>
                    <span className="sm:hidden">직속추천</span>
                  </span>
                  <div className="w-8 h-8 md:w-10 md:h-10 bg-slate-900 text-slate-300 rounded-lg md:rounded-xl flex items-center justify-center font-bold text-[10px] md:text-xs shrink-0 border border-slate-850">1차</div>
                </div>
                <div className="space-y-1">
                  <div className="text-2xl md:text-3xl font-black text-white flex items-baseline gap-0.5">
                    <span>{totalDirectCount}</span>
                    <span className="text-xs font-bold text-slate-500">명</span>
                  </div>
                  <p className="text-[11px] text-slate-500 font-semibold hidden md:block">나의 영업 이메일로 직속 가입한 회원</p>
                  <p className="text-[10px] text-slate-400 font-bold md:hidden flex items-center gap-1">
                    📥 직속 연계
                  </p>
                </div>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="p-4 md:p-6 bg-slate-950 border border-slate-900 rounded-3xl shadow-sm space-y-3"
              >
                <div className="flex items-center justify-between">
                  <span className="text-[11px] md:text-xs font-black text-slate-300 uppercase tracking-tight flex items-center gap-1">
                    <span className="text-lg md:text-sm">🔗</span>
                    <span className="hidden sm:inline">연쇄 영업 추천인 (하위)</span>
                    <span className="sm:hidden">연쇄추천</span>
                  </span>
                  <div className="w-8 h-8 md:w-10 md:h-10 bg-slate-900 text-indigo-400 rounded-lg md:rounded-xl flex items-center justify-center font-bold text-[10px] md:text-xs shrink-0 border border-slate-850">N차</div>
                </div>
                <div className="space-y-1">
                  <div className="text-2xl md:text-3xl font-black text-white flex items-baseline gap-0.5">
                    <span>{totalIndirectCount}</span>
                    <span className="text-xs font-bold text-slate-500">명</span>
                  </div>
                  <p className="text-[11px] text-slate-500 font-semibold hidden md:block">내 추천회원들이 추가로 유치한 회원</p>
                  <p className="text-[10px] text-slate-400 font-bold md:hidden flex items-center gap-1">
                    🚀 간접 유치
                  </p>
                </div>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.25 }}
                className="p-4 md:p-6 bg-slate-950 border border-slate-900 rounded-3xl shadow-sm space-y-3"
              >
                <div className="flex items-center justify-between">
                  <span className="text-[11px] md:text-xs font-black text-slate-300 uppercase tracking-tight flex items-center gap-1">
                    <span className="text-lg md:text-sm">📈</span>
                    <span className="hidden sm:inline">총 네트워킹 가입 수</span>
                    <span className="sm:hidden">전체누적</span>
                  </span>
                  <div className="w-8 h-8 md:w-10 md:h-10 bg-slate-900 text-emerald-400 rounded-lg md:rounded-xl flex items-center justify-center shrink-0 border border-slate-850">
                    <TrendingUp className="w-4 h-4 md:w-5 h-5 animate-pulse" />
                  </div>
                </div>
                <div className="space-y-1">
                  <div className="text-2xl md:text-3xl font-black text-emerald-400 flex items-baseline gap-0.5">
                    <span>{downlineUsers.length}</span>
                    <span className="text-xs font-bold text-slate-500">명</span>
                  </div>
                  <p className="text-[11px] text-slate-500 font-semibold hidden md:block">동료 네트워크를 통한 총합 수치</p>
                  <p className="text-[10px] text-emerald-500 font-bold md:hidden flex items-center gap-1">
                    🔥 총합 시너지
                  </p>
                </div>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="p-4 md:p-6 bg-slate-950 border border-slate-900 rounded-3xl shadow-sm space-y-3"
              >
                <div className="flex items-center justify-between">
                  <span className="text-[11px] md:text-xs font-black text-slate-300 uppercase tracking-tight flex items-center gap-1">
                    <span className="text-lg md:text-sm">👑</span>
                    <span className="hidden sm:inline">레전드 멤버수</span>
                    <span className="sm:hidden">우수레전드</span>
                  </span>
                  <div className="w-8 h-8 md:w-10 md:h-10 bg-slate-900 text-amber-400 rounded-lg md:rounded-xl flex items-center justify-center shrink-0 border border-slate-850">
                    <Award className="w-4 h-4 md:w-5 h-5 animate-bounce" />
                  </div>
                </div>
                <div className="space-y-1">
                  <div className="text-2xl md:text-3xl font-black text-[#D4AF37] flex items-baseline gap-0.5">
                    <span>{legendTierCount}</span>
                    <span className="text-xs font-bold text-slate-500">명</span>
                  </div>
                  <p className="text-[11px] text-slate-500 font-semibold hidden md:block">우수 레전드 티어 가입자 실적</p>
                  <p className="text-[10px] text-amber-500 font-bold md:hidden flex items-center gap-1">
                    💎 우수 실적
                  </p>
                </div>
              </motion.div>
            </div>

            {/* Tree Render Panel */}
            <div className="bg-[#090d1a] rounded-[2.5rem] p-6 md:p-10 border border-blue-500/20 shadow-xl space-y-8">
              <div className="flex items-center gap-3 border-b border-slate-900 pb-6">
                <div className="w-11 h-11 rounded-2xl bg-blue-600 text-white flex items-center justify-center shadow-lg shadow-blue-500/15">
                  <Users className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-xl md:text-2xl font-black text-white">추천 영업 네트워크 트리</h2>
                  <p className="text-slate-500 text-[10px] font-black uppercase tracking-wider mt-0.5 font-mono">My Recruitment Downline Tree Graph</p>
                </div>
              </div>

              {treeData.length === 0 ? (
                <div className="py-20 text-center space-y-4 bg-slate-950/40 rounded-2xl border border-slate-900">
                  <div className="w-16 h-16 bg-slate-900 border border-slate-850 text-slate-600 rounded-2xl flex items-center justify-center mx-auto">
                    <Users className="w-8 h-8" />
                  </div>
                  <div className="space-y-1">
                    <p className="text-slate-300 font-extrabold text-base">가입된 추천 회원이 없습니다</p>
                    <p className="text-slate-500 text-xs font-medium px-4 leading-relaxed">당신의 비즈니스 이메일 주소({user?.email})를 신규 회원의 가입 시 추천인란에 기입하도록 안내해 주십시오.</p>
                  </div>
                </div>
              ) : (
                <div className="relative pl-0 md:pl-2 select-none overflow-x-auto pb-6">
                  {/* Root Node Representing Myself */}
                  <div className="relative pl-4 mt-2">
                    <div className="absolute left-[9px] top-10 bottom-0 w-[2px] bg-gradient-to-b from-blue-500/30 via-purple-500/25 to-slate-950 rounded" />
                    <div className="absolute left-[-4px] top-[14px] w-3 h-3 rounded-full bg-blue-500 border border-slate-950" />
                    
                    <div className="inline-flex items-center gap-3 px-5 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-2xl shadow-lg border border-white/10">
                      <Sparkles className="w-4 h-4 text-amber-300 animate-pulse" />
                      <span className="font-black text-xs">{profile?.displayName || '나'} (영업 수석 기획자)</span>
                    </div>

                    <div className="mt-4 space-y-4">
                      {treeData.map(node => renderTreeNode(node))}
                    </div>
                  </div>
                </div>
              )}
            </div>

          </div>
        ) : (
          /* ======================================================== */
          /* FOR NORMAL FANDOM SUPPORTERS (NON-SALES)                 */
          /* ======================================================== */
          <div className="space-y-8 pt-4" id="standard-user-welcome-workspace">
            
            <div className="flex items-center gap-2 px-1">
              <div className="w-2.5 h-2.5 rounded-full bg-blue-400" />
              <h2 className="text-base font-black text-white uppercase tracking-wider">회원님을 위한 특별 추천 혜택 코너</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
              
              {/* Special Partnership Invitation Option */}
              <div className="bg-slate-950/85 rounded-3xl p-6 md:p-8 border border-blue-500/20 shadow-xl flex flex-col justify-between relative overflow-hidden">
                <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-indigo-500/5 rounded-full blur-2xl" />
                <div className="space-y-5">
                  <div className="w-12 h-12 bg-indigo-500/10 text-indigo-400 rounded-2xl flex items-center justify-center border border-indigo-500/20 shadow-sm">
                    <Award className="w-6 h-6 animate-bounce" style={{ animationDuration: '4s' }} />
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-lg font-black text-white tracking-tight">오로라 특별 크리에이터 신청하기</h3>
                    <p className="text-xs text-slate-400 leading-relaxed font-semibold">
                      단순 응원을 넘어, 비즈니스 동반자로써 마일리지를 정밀 누적하고 연간 60%에 수렴하는 한정판 영업 수수료 수당 권한을 획득하고 싶으신가요?
                      지금 파트너 크리에이터로 무료 승격 신청을 접수할 수 있습니다.
                    </p>
                  </div>
                </div>

                <div className="pt-6 border-t border-slate-900/60 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                  <a 
                    href="tel:010-0000-0000"
                    className="flex-1 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-center rounded-xl text-xs font-black shadow-lg hover:opacity-90 active:scale-[0.99] transition-all"
                  >
                    본사에 무료 승격 문의 📞
                  </a>
                  <button 
                    onClick={() => alert('본사의 심사를 진행합니다. 영업 담당자 유선 상담(010-0000-0000) 진행 후 등급이 즉각 조정됩니다.')}
                    className="px-4 py-3 bg-slate-900 border border-slate-800 hover:bg-slate-850 text-slate-300 rounded-xl text-xs font-extrabold transition-all"
                  >
                    온라인 심사 접수
                  </button>
                </div>
              </div>

              {/* Supporter Digital Pass layout (Visual Premium Card) */}
              <div className="bg-gradient-to-br from-[#0a1226] via-[#040815] to-[#01040a] text-white rounded-3xl p-6 md:p-8 flex flex-col justify-between relative overflow-hidden shadow-2xl border border-blue-500/25">
                <div className="absolute top-[20%] right-[-50px] w-48 h-48 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
                
                <div className="flex justify-between items-start">
                  <div className="space-y-1">
                    <span className="text-[9px] font-mono tracking-widest text-blue-400 uppercase">Interactive Fan Pass</span>
                    <h3 className="text-base font-black text-white">현 세계 1호 한정판 프리패스</h3>
                  </div>
                  <div className="w-12 h-8 rounded-lg bg-gradient-to-r from-amber-200 via-amber-400 to-amber-600 shadow-md flex items-center justify-center font-mono text-[9px] text-amber-950 font-black tracking-widest">
                    VIP
                  </div>
                </div>

                <div className="space-y-4 py-6">
                  <div className="font-mono text-base md:text-lg tracking-[0.25em] text-cyan-300 drop-shadow-[0_0_10px_rgba(34,211,238,0.25)]">
                    SJT {profile?.userId ? profile.userId.substring(0, 5).toUpperCase() : '8839'} 0029 FANDOM
                  </div>
                  <div className="flex items-center gap-4">
                    <div>
                      <span className="text-[8px] uppercase tracking-wider text-slate-500 block font-mono">SUPPORTER NAME</span>
                      <span className="text-xs font-black tracking-normal uppercase text-white">{profile?.displayName || 'Supporter'}</span>
                    </div>
                    {selectedFanName && (
                      <div className="border-l border-slate-800 pl-4">
                        <span className="text-[8px] uppercase tracking-wider text-slate-500 block font-mono">STANDS BY</span>
                        <span className="text-xs font-black tracking-normal text-rose-400 flex items-center gap-1">
                          <Heart className="w-3 h-3 fill-rose-500 text-rose-500" />
                          <span>{selectedFanName.split(' ')[1] || selectedFanName.split('(')[0]}</span>
                        </span>
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex justify-between items-center text-[10px] text-slate-500 pt-4 border-t border-slate-900 font-medium">
                  <span>전일미디어 FANDOM PASS</span>
                  <span className="italic text-amber-400/80">Special Platinum Tag</span>
                </div>
              </div>

            </div>
          </div>
        )}

      </div>
    </div>
  );
}
