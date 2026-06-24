import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useNavigate, Link } from 'react-router-dom';
import { useFirebase } from '../lib/FirebaseContext';
import { supabase } from '../lib/supabase';
import { 
  Sparkles, 
  Check, 
  Loader2, 
  Heart, 
  ArrowLeft, 
  User, 
  AlertCircle,
  Award
} from 'lucide-react';

const PRESET_FANS = [
  {
    id: 'shinji_classic',
    name: '코요태 신지 (무대 엔딩 요정 에디션)',
    emoticon: '🎤🌟🧚‍♀️',
    imageUrl: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&w=800&q=80',
    description: '빛나는 페스티벌 무대 위 독보적 보컬 매력의 콘서트 씬.'
  },
  {
    id: 'shinji_vocal',
    name: '코요태 신지 (청초한 화이트 보컬)',
    emoticon: '👗✨🤍',
    imageUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80',
    description: '차분하면서도 우아한 감성 프로필 레전드 스냅.'
  },
  {
    id: 'shinji_peach',
    name: '코요태 신지 (러블리 피치 슈트)',
    emoticon: '🍑🌸☀️',
    imageUrl: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=800&q=80',
    description: '봄 햇살처럼 밝고 청량함을 머금은 시그니처 화보.'
  },
  {
    id: 'shinji_diva',
    name: '코요태 신지 (카리스마 블랙 디바 에디션)',
    emoticon: '🖤👑🔥',
    imageUrl: 'https://images.unsplash.com/photo-1550684848-fac1c5b4e853?auto=format&fit=crop&w=800&q=80',
    description: '무대를 압도하는 디바의 모던 블랙 테일러링 포토.'
  }
];

export default function Apply() {
  const { user, profile, loading: authLoading } = useFirebase();
  const navigate = useNavigate();

  const [savingId, setSavingId] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSelectFan = async (fanId: string, name: string, imageUrl: string) => {
    if (!user) {
      setErrorMessage('로그인이 필요한 서비스입니다.');
      return;
    }
    setSavingId(fanId);
    setErrorMessage('');

    try {
      const { error } = await supabase
        .from('users')
        .update({
          selectedFanId: fanId,
          selectedFanName: name,
          selectedFanPhotoUrl: imageUrl,
          selectedFanUpdatedAt: new Date().toISOString()
        })
        .eq('userId', user.uid);

      if (error) throw error;

      // Simulate subtle feedback duration
      await new Promise(resolve => setTimeout(resolve, 800));
    } catch (err: any) {
      console.error("Error updating selected fan: ", err);
      setErrorMessage('최애 팬 선택 저장에 실패했습니다: ' + err.message);
    } finally {
      setSavingId(null);
    }
  };

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#02050c]">
        <div className="text-center space-y-4">
          <Loader2 className="w-10 h-10 text-blue-500 animate-spin mx-auto" />
          <p className="text-slate-400 text-xs font-semibold">팬 선택 및 로그인 데이터 수신 중...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen pt-32 pb-20 px-5 flex items-center justify-center bg-[#02050c] relative overflow-hidden" id="login-required-container">
        <div className="absolute top-[20%] left-[20%] w-[400px] h-[400px] bg-blue-600/10 rounded-full blur-[120px] pointer-events-none" />
        <div className="max-w-md w-full bg-slate-950 rounded-3xl p-8 border border-blue-500/20 shadow-[0_0_30px_rgba(59,130,246,0.15)] text-center space-y-6 relative z-10">
          <div className="w-16 h-16 rounded-2xl bg-blue-500/10 flex items-center justify-center mx-auto text-blue-400 border border-blue-500/20">
            <Heart className="w-8 h-8 text-rose-500 fill-rose-500 animate-pulse" />
          </div>
          <div className="space-y-2">
            <h1 className="text-2xl font-black text-white tracking-tight">나의 팬 선택 서비스</h1>
            <p className="text-xs text-slate-400 leading-relaxed px-4">
              본 서비스는 코요태 신지 특별 마일리지를 누적할 수 있는 최애 아티스트 선택 공간입니다.<br />
              로그인 후 어떠한 복잡한 가입 절차 없이 클릭 한 번으로 최애를 선택해 보세요.
            </p>
          </div>
          <button
            onClick={() => navigate('/login')}
            className="w-full py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-2xl text-xs font-black hover:opacity-90 active:scale-[0.99] transition-all shadow-[0_0_15px_rgba(59,130,246,0.25)]"
          >
            로그인 하러 가기
          </button>
          <div className="text-center pt-2">
            <Link to="/" className="text-xs text-slate-500 underline font-medium hover:text-slate-300">메인 화면으로</Link>
          </div>
        </div>
      </div>
    );
  }

  const currentFanName = profile?.selectedFanName || '';
  const currentFanPhoto = profile?.selectedFanPhotoUrl || '';
  const currentFanId = profile?.selectedFanId || '';

  // Get matching emoticon for active selected fan
  const currentEmoticon = PRESET_FANS.find(f => f.id === currentFanId)?.emoticon || '💖🌟';

  return (
    <div className="min-h-screen pt-32 pb-20 px-4 md:px-8 bg-[#02050c] text-slate-100 relative overflow-hidden" id="apply-page-content-wrapper">
      {/* Background ambient lighting */}
      <div className="absolute top-[10%] left-[25%] w-[400px] h-[400px] bg-blue-600/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-[5%] right-[10%] w-[350px] h-[350px] bg-purple-600/5 rounded-full blur-[110px] pointer-events-none" />

      <div className="max-w-6xl mx-auto z-10 relative">
        {/* Title */}
        <div className="text-center mb-12 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 bg-blue-500/10 rounded-full border border-blue-500/20">
            <Sparkles className="w-3.5 h-3.5 text-amber-400 animate-spin" style={{ animationDuration: '6s' }} />
            <span className="text-cyan-300 text-[9px] font-black uppercase tracking-wider">My Active Fan Selection</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-display font-black text-white tracking-tight">
            나의 팬 선택 🌟
          </h1>
          
          {/* Responsive Copwriting Section */}
          <div className="max-w-xl mx-auto">
            {/* Desktop Only detailed explanation */}
            <p className="hidden md:block text-slate-400 text-xs md:text-sm leading-relaxed">
              원하는 최애 아티스트의 한정판 스타 사진을 마우스 클릭 단 한 번만으로 선택해 보세요!<br />
              선택하시는 순간, 마이페이지 나의 정보란에 실시간으로 반영되어 고유 엠블럼과 뱃지가 활성화됩니다.
            </p>
            {/* Mobile Only clean emoticon and simple text layout */}
            <p className="md:hidden text-amber-300 text-sm font-black flex items-center justify-center gap-1">
              <span>👉</span> 원하는 사진 클릭! 즉시 마이페이지 반영 📱🌟✨
            </p>
          </div>
        </div>

        {errorMessage && (
          <div className="max-w-2xl mx-auto mb-6 p-4 bg-red-950/40 text-red-400 text-xs font-bold rounded-2xl flex items-center gap-2 border border-red-500/20 animate-shake">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{errorMessage}</span>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Panel: Realtime Choice Summary (Sleek Dark Glass) */}
          <div className="lg:col-span-4 space-y-6">
            <div className="p-6 bg-slate-950/80 backdrop-blur-md rounded-3xl border border-blue-500/20 shadow-2xl space-y-5">
              <span className="text-[10px] md:text-xs font-black text-slate-400 uppercase tracking-widest block">
                실시간 탑재 상태
              </span>
              
              {currentFanName ? (
                <div className="space-y-4">
                  {/* Selected Fan Preview Photo Display */}
                  <div className="relative w-full aspect-square rounded-2xl overflow-hidden shadow-md border border-slate-800 group">
                    <img 
                      src={currentFanPhoto} 
                      alt={currentFanName} 
                      onError={(e) => {
                        e.currentTarget.src = "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&w=800&q=80";
                      }}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent" />
                    
                    <div className="absolute top-4 right-4 bg-gradient-to-r from-rose-600 to-pink-500 text-white rounded-full p-2.5 shadow-md">
                      <Heart className="w-4 h-4 fill-white animate-pulse" />
                    </div>

                    <div className="absolute bottom-4 left-4 right-4">
                      <span className="text-[9px] bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-bold uppercase tracking-widest px-2.5 py-0.5 rounded-full inline-block mb-1.5 backdrop-blur-sm shadow-md">
                        CURRENT STAR
                      </span>
                      {/* Responsive text presentation using emoticons for mobile */}
                      <h3 className="hidden md:block text-white text-base font-black truncate">{currentFanName}</h3>
                      <h3 className="md:hidden text-white text-lg font-black truncate flex items-center gap-1.5">
                        <span>{currentEmoticon}</span>
                        <span>선택 완료</span>
                      </h3>
                    </div>
                  </div>

                  <div className="space-y-2 pt-1 text-xs">
                    {/* Desktop detailed rows */}
                    <div className="hidden md:flex py-2.5 px-3.5 bg-slate-900/60 rounded-xl border border-slate-800 items-center justify-between">
                      <span className="text-slate-400 font-bold">탑재된 아티스트명</span>
                      <span className="font-extrabold text-[#D4AF37]">{currentFanName}</span>
                    </div>
                    {/* Mobile optimized Emoticon status row */}
                    <div className="md:hidden py-3 px-4 bg-[#D4AF37]/10 rounded-xl border border-[#D4AF37]/30 flex items-center justify-between">
                      <span className="text-amber-300 font-black">나의 최애 뱃지</span>
                      <span className="text-lg font-black animate-bounce">{currentEmoticon} ✅</span>
                    </div>
                    
                    <div className="py-2.5 px-3.5 bg-slate-900/40 rounded-xl border border-slate-900 flex items-center justify-between">
                      <span className="text-slate-500">기본 연동 상태</span>
                      <span className="font-extrabold text-emerald-400 flex items-center gap-1">
                        <Check className="w-3.5 h-3.5" /> 실시간 동기화 완료
                      </span>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="py-12 text-center space-y-4 bg-slate-900/30 border border-dashed border-slate-800 rounded-2xl">
                  <div className="w-12 h-12 rounded-full bg-blue-500/10 flex items-center justify-center mx-auto text-blue-400 border border-blue-500/20">
                    <Heart className="w-6 h-6 animate-pulse" />
                  </div>
                  <div className="space-y-1 px-4">
                    <p className="text-white text-xs font-black">아직 선택된 최애가 없습니다</p>
                    <p className="text-slate-500 text-[10px] leading-relaxed">우측 스타 리스트에서 원하는 사진을 클릭하시면 즉시 마이페이지 나의 정보에 표시됩니다.</p>
                  </div>
                </div>
              )}

              <Link 
                to="/mypage"
                className="w-full flex items-center justify-center gap-2 py-4 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white font-black text-xs rounded-2xl hover:opacity-95 transition-all shadow-[0_0_15px_rgba(99,102,241,0.25)]"
              >
                {/* Responsive label for Done/Mypage link */}
                <span className="hidden md:inline">나의 정보(마이페이지) 보러가기</span>
                <span className="md:hidden flex items-center gap-1">📱 마이페이지 즉시 확인</span>
                <AnimatePresence>
                  <motion.span animate={{ x: [0, 4, 0] }} transition={{ repeat: Infinity, duration: 1.5 }}>
                    →
                  </motion.span>
                </AnimatePresence>
              </Link>
            </div>

            {/* Instruction Banner */}
            <div className="p-6 bg-slate-950 rounded-3xl border border-blue-500/10 space-y-2.5">
              <h3 className="text-xs font-black text-[#D4AF37] uppercase tracking-wider flex items-center gap-1.5">
                <Award className="w-4 h-4 shrink-0" />
                <span>선택 동기화 원리</span>
              </h3>
              <p className="text-[11px] text-slate-400 leading-relaxed font-semibold">
                클라우드 파이어스토어 데이터베이스와 연계된 특화 구조로, 클릭하는 즉시 회원의 고유 식별 주소에 스타 정보가 매칭되어 저장됩니다. 보관은 평생 무료로 유지되며, 언제든 다른 스타로 자유롭게 교체하실 수 있습니다.
              </p>
            </div>
          </div>

          {/* Right Panel: Curated Selection of Fans */}
          <div className="lg:col-span-8 space-y-8">
            
            {/* Presets Grid */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm md:text-lg font-black text-white flex items-center gap-1.5">
                    <span>🌟</span> 
                    <span className="hidden md:inline">실시간 스타 사진 리스트 (클릭 시 사진 자동 선택 및 완료)</span>
                    <span className="md:hidden text-amber-200">스타 클릭 즉시 선택 완료!</span>
                  </h3>
                  <p className="text-[10px] md:text-xs text-slate-400 mt-0.5 font-medium">원하는 스타 에디션 사진을 클릭하여 나의 정보로 즉각 저장해 보세요.</p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6" id="presets-grid-wrapper">
                {PRESET_FANS.map((fan) => {
                  const isSelected = currentFanId === fan.id;
                  const isSaving = savingId === fan.id;

                  return (
                    <motion.div
                      key={fan.id}
                      whileHover={{ y: -4, scale: 1.01 }}
                      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                      onClick={() => !isSaving && handleSelectFan(fan.id, fan.name, fan.imageUrl)}
                      className={`relative aspect-[4/3] rounded-[2rem] overflow-hidden cursor-pointer group shadow-lg transition-all duration-300 ${
                        isSelected 
                          ? 'ring-4 ring-blue-500 ring-offset-4 ring-offset-slate-950 shadow-xl' 
                          : 'border border-slate-900 active:scale-[0.98]'
                      }`}
                    >
                      {/* Star image background */}
                      <img 
                        src={fan.imageUrl} 
                        alt={fan.name} 
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
                        referrerPolicy="no-referrer"
                      />
                      
                      {/* Gradient visual shield */}
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-black/30 to-black/10 group-hover:via-black/20 transition-all" />

                      {/* Header overlay for badge if selected */}
                      {isSelected && (
                        <div className="absolute top-4 left-4 bg-blue-600 text-white rounded-full px-3 py-1.5 text-[9px] md:text-[10px] font-black flex items-center gap-1 shadow-md">
                          <Check className="w-3 h-3" />
                          <span>선택됨</span>
                        </div>
                      )}

                      {/* Mobile Emoticon Floating Tag */}
                      <div className="absolute top-4 right-4 bg-slate-950/80 border border-slate-800 text-white text-xs px-2.5 py-1 rounded-lg font-black backdrop-blur-sm shadow-md">
                        {fan.emoticon}
                      </div>

                      {/* Hover action banner */}
                      <div className="absolute inset-0 bg-blue-950/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-[2px]">
                        <div className="bg-slate-950/95 border border-blue-500/30 px-4 py-2.5 rounded-full text-cyan-400 font-black text-xs flex items-center gap-1.5 shadow-2xl">
                          {isSaving ? (
                            <>
                              <Loader2 className="w-3.5 h-3.5 animate-spin" />
                              <span>프로필 연계 보관중...</span>
                            </>
                          ) : isSelected ? (
                            <>
                              <Check className="w-3.5 h-3.5" />
                              <span>현재 나의 정보 탑재 완료 💖</span>
                            </>
                          ) : (
                            <>
                              <Heart className="w-3.5 h-3.5 fill-rose-500 text-rose-500 animate-pulse" />
                              <span>이 스타 사진 클릭 선택</span>
                            </>
                          )}
                        </div>
                      </div>

                      {/* Info on bottom */}
                      <div className="absolute bottom-5 left-5 right-5 space-y-1">
                        {/* On mobile, output Name with Emoticon, and hide description for a clean layout */}
                        <h4 className="text-white font-black text-sm tracking-tight truncate flex items-center gap-1.5">
                          <span>{fan.emoticon}</span>
                          <span className="hidden sm:inline">{fan.name}</span>
                          <span className="sm:hidden">{fan.name.replace('코요태 ', '')}</span>
                        </h4>
                        <p className="hidden md:block text-slate-300 text-[10px] leading-relaxed truncate font-medium">{fan.description}</p>
                      </div>

                      {/* Saving overlay spinner */}
                      {isSaving && (
                        <div className="absolute inset-0 bg-slate-950/80 flex items-center justify-center z-10">
                          <div className="text-center space-y-2">
                            <Loader2 className="w-8 h-8 text-cyan-400 animate-spin mx-auto" />
                            <p className="text-xs font-black text-cyan-300">클라우드에 최애 탑재 중...</p>
                          </div>
                        </div>
                      )}
                    </motion.div>
                  );
                })}
              </div>
            </div>

            {/* Done button */}
            <div className="flex justify-end pt-2">
              <button
                onClick={() => navigate('/mypage')}
                className="px-6 py-3 bg-slate-900 border border-slate-800 hover:bg-slate-800 text-white font-black text-xs rounded-xl flex items-center gap-2 shadow-md transition-all self-end"
              >
                <span>선택 완료하고 나의 정보 돌아가기</span>
                <ArrowLeft className="w-4 h-4 rotate-180" />
              </button>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
}
