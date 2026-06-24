import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Megaphone, X, ChevronRight, Calendar, Sparkles, Bell } from 'lucide-react';
import { Link } from 'react-router-dom';

interface NoticeItem {
  id: number;
  badge: string;
  badgeColor: string;
  text: string;
  link: string;
  isExternal?: boolean;
}

const NOTICES: NoticeItem[] = [
  {
    id: 1,
    badge: "공연 확정",
    badgeColor: "bg-emerald-500/15 text-emerald-400 border-emerald-500/30",
    text: "속초 디너 콘서트&토크쇼 일정 확정! VIP 멤버십 가입 시 프리패스 입장 가능",
    link: "/apply"
  },
  {
    id: 2,
    badge: "HOT 혜택",
    badgeColor: "bg-amber-500/15 text-amber-400 border-amber-500/30",
    text: "신지 싸인 각인 한정판 체크카드 발급 개시! 마이페이지에서 상세 정보 확인",
    link: "/mypage"
  },
  {
    id: 3,
    badge: "썸머 페스티벌",
    badgeColor: "bg-cyan-500/15 text-cyan-400 border-cyan-500/30",
    text: "시흥 웨이브파크 초대형 파도풀 콘서트 & BBQ 파티 예약 접수 진행중",
    link: "/apply"
  },
  {
    id: 4,
    badge: "VIP 한정",
    badgeColor: "bg-purple-500/15 text-purple-400 border-purple-500/30",
    text: "2026년 오리지널 신지 순금 소장용 기념 주화 선착순 증정 마감 임박",
    link: "/apply"
  }
];

export default function NoticeBanner() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Check if user dismissed it for this session
    const isDismissed = sessionStorage.getItem('dismiss_notice_banner');
    if (isDismissed) {
      setIsVisible(false);
    }
  }, []);

  useEffect(() => {
    if (!isVisible) return;
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % NOTICES.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [isVisible]);

  const handleDismiss = () => {
    setIsVisible(false);
    sessionStorage.setItem('dismiss_notice_banner', 'true');
  };

  if (!isVisible) return null;

  return (
    <div className="relative w-full bg-[#02050c] pt-20 pb-1 px-4 md:px-8 z-40">
      <div className="max-w-7xl mx-auto">
        {/* Neon Glow Box Wrapper */}
        <div className="relative overflow-hidden rounded-2xl border border-blue-500/40 bg-[#050b18]/90 backdrop-blur-md px-4 py-3.5 shadow-[0_0_20px_rgba(59,130,246,0.25)] flex flex-col md:flex-row items-center justify-between gap-3 md:gap-6">
          
          {/* Animated Neon Background Line */}
          <div className="absolute top-0 left-0 w-full h-[1.5px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent animate-pulse" />
          
          {/* Left Title Label */}
          <div className="flex items-center gap-3 shrink-0">
            <div className="relative flex items-center justify-center w-9 h-9 rounded-xl bg-blue-500/10 border border-blue-400/30 text-cyan-400 shadow-[0_0_10px_rgba(34,211,238,0.2)]">
              <Megaphone className="w-4 h-4 animate-[bounce_1.5s_infinite]" />
              <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-red-500 border border-[#02050c] animate-ping" />
            </div>
            <div className="text-left">
              <h3 className="text-xs md:text-sm font-black tracking-widest text-slate-100 uppercase flex items-center gap-1">
                실시간 소식
                <span className="text-[9px] bg-red-500/15 text-red-400 border border-red-500/20 px-1 py-0.2 rounded font-black tracking-normal animate-pulse">LIVE</span>
              </h3>
              <p className="text-[10px] text-slate-400 font-bold hidden sm:block">공연 일정 및 회원 혜택 안내</p>
            </div>
          </div>

          {/* Center Rotating Message with Animation */}
          <div className="flex-1 w-full overflow-hidden relative min-h-[30px] flex items-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.35, ease: "easeInOut" }}
                className="flex items-center gap-2.5 w-full justify-center md:justify-start"
              >
                {/* Notice Item Badge */}
                <span className={`text-[10px] font-black tracking-tight px-2 py-0.5 rounded-md border shrink-0 ${NOTICES[currentIndex].badgeColor}`}>
                  {NOTICES[currentIndex].badge}
                </span>

                {/* Notice Text */}
                <Link 
                  to={NOTICES[currentIndex].link} 
                  className="text-xs md:text-sm font-semibold text-slate-200 hover:text-cyan-400 transition-colors duration-200 truncate pr-4 text-center md:text-left hover:underline"
                >
                  {NOTICES[currentIndex].text}
                </Link>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Right Controls */}
          <div className="flex items-center gap-3 shrink-0">
            {/* Quick Link Button */}
            <Link 
              to={NOTICES[currentIndex].link}
              className="px-3.5 py-1.5 bg-blue-500/10 hover:bg-blue-500/20 border border-blue-400/30 hover:border-blue-400/60 rounded-xl text-[11px] font-black text-cyan-300 transition-all duration-300 flex items-center gap-1 group shadow-[0_0_12px_rgba(59,130,246,0.15)] cursor-pointer"
            >
              상세보기
              <ChevronRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
            </Link>

            {/* Dismiss Close Button */}
            <button
              onClick={handleDismiss}
              className="text-slate-400 hover:text-white transition-colors duration-200 p-1 hover:bg-slate-800/50 rounded-lg"
              title="오늘 하루 안보기"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
