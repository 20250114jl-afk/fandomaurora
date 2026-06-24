import { motion, AnimatePresence } from 'motion/react';
import { X, Calendar, Clock, MapPin, CheckCircle2, Share2, Sparkles } from 'lucide-react';
import { useEffect, useState } from 'react';

interface BenefitModalProps {
  isOpen: boolean;
  onClose: () => void;
  benefit: {
    title: string;
    description: string;
    image: string;
    date: string; // ISO string or similar
    schedule: string[];
    price: string;
    color: string;
  } | null;
}

interface MapPlaceholderProps {
  location: string;
}

function MapPlaceholder({ location }: MapPlaceholderProps) {
  const isSokcho = location.includes('속초');
  const isWavePark = location.includes('웨이브파크');
  const isCruise = location.includes('크루즈');

  return (
    <div className="relative w-full h-40 bg-slate-950 rounded-2xl overflow-hidden border border-blue-500/20 group">
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        {/* Simple Grid Pattern for Map-like feel */}
        <div className="absolute inset-0 bg-blue-500/10" style={{ backgroundImage: 'radial-gradient(rgba(59, 130, 246, 0.2) 1px, transparent 1px)', backgroundSize: '20px 20px' }}></div>
      </div>
      
      {/* Decorative Landmasses (Abstract) */}
      <div className="absolute top-4 left-10 w-24 h-16 bg-blue-500/10 rounded-full blur-xl animate-pulse"></div>
      <div className="absolute bottom-6 right-12 w-32 h-20 bg-purple-500/10 rounded-full blur-2xl"></div>

      {/* Landmarks based on location */}
      <div className="absolute inset-0 flex items-center justify-center">
        <motion.div 
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="relative text-center"
        >
          <div className="w-5 h-5 bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full shadow-[0_0_20px_rgba(59,130,246,0.8)] animate-bounce mx-auto" />
          <div className="absolute top-6 left-1/2 -translate-x-1/2 whitespace-nowrap bg-slate-900 border border-blue-500/30 px-3 py-1.5 rounded-lg shadow-lg text-[10px] font-black text-cyan-300 uppercase tracking-widest">
            {isSokcho ? "Sokcho Sky Lounge" : isWavePark ? "Wave Park Stage" : isCruise ? "Cruise Terminal" : "Event Venue"}
          </div>
        </motion.div>

        {isSokcho && (
          <div className="absolute top-1/4 right-1/4">
             <div className="w-2 h-2 bg-blue-400 rounded-full opacity-50 animate-ping" />
             <div className="text-[8px] text-slate-400 font-bold mt-1">Eastern Coast</div>
          </div>
        )}
      </div>

      <div className="absolute bottom-3 left-3 flex items-center gap-2">
        <div className="w-6 h-6 rounded-lg bg-blue-500/10 backdrop-blur-sm flex items-center justify-center border border-blue-500/20 shadow-sm">
          <MapPin className="w-3 h-3 text-cyan-400" />
        </div>
        <span className="text-[9px] font-black text-cyan-400/80 uppercase tracking-widest">Live Map Preview</span>
      </div>
    </div>
  );
}

export default function BenefitModal({ isOpen, onClose, benefit }: BenefitModalProps) {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    if (!isOpen) {
      setIsSubscribed(false);
      setPhoneNumber('');
    }
  }, [isOpen]);

  const handleSubscribe = () => {
    if (phoneNumber.length >= 10) {
      setIsSubscribed(true);
    }
  };

  useEffect(() => {
    if (!benefit || !isOpen) return;

    const targetDate = new Date(benefit.date).getTime();

    const interval = setInterval(() => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference <= 0) {
        clearInterval(interval);
        return;
      }

      setTimeLeft({
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((difference % (1000 * 60)) / 1000)
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [benefit, isOpen]);

  if (!benefit) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-6">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/80 backdrop-blur-md"
          />
          
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative w-full max-w-4xl bg-slate-950 border border-blue-500/20 rounded-[2rem] overflow-hidden shadow-[0_0_50px_rgba(59,130,246,0.3)] flex flex-col md:flex-row h-full max-h-[90vh] md:h-auto z-[110]"
          >
            {/* Image & Countdown Section */}
            <div className="relative w-full md:w-1/2 h-56 md:h-auto min-h-[250px] md:min-h-0">
              <img 
                src={benefit.image} 
                className="absolute inset-0 w-full h-full object-cover"
                alt={benefit.title}
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-slate-950/65 hidden md:block" />
              
              <div className="absolute bottom-6 left-6 right-6 text-white bg-slate-950/85 p-5 rounded-2xl border border-blue-500/20 backdrop-blur-sm shadow-xl">
                <div className="text-[10px] uppercase font-black tracking-[0.2em] mb-3 text-cyan-400 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 animate-spin" style={{ animationDuration: '6s' }} />
                  Next Event Countdown
                </div>
                <div className="grid grid-cols-4 gap-2">
                  {[
                    { label: 'Days', value: timeLeft.days },
                    { label: 'Hrs', value: timeLeft.hours },
                    { label: 'Min', value: timeLeft.minutes },
                    { label: 'Sec', value: timeLeft.seconds }
                  ].map((unit, i) => (
                    <div key={i} className="text-center bg-slate-900/60 p-2 rounded-xl border border-slate-800">
                      <div className="text-xl md:text-2xl font-display font-black text-transparent bg-clip-text bg-gradient-to-b from-white to-slate-300 leading-none">
                        {String(unit.value).padStart(2, '0')}
                      </div>
                      <div className="text-[7px] md:text-[8px] uppercase font-black text-slate-400 mt-1">{unit.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Content & Form Section */}
            <div className="flex-1 p-6 md:p-10 overflow-y-auto text-slate-100 flex flex-col justify-between">
              <button 
                onClick={onClose}
                className="absolute top-6 right-6 w-9 h-9 rounded-full bg-slate-900 border border-slate-850 flex items-center justify-center hover:bg-slate-800 transition-colors z-20 text-slate-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="space-y-6">
                <div className="space-y-3">
                  <div className={`inline-block px-3 py-1 rounded-md bg-gradient-to-r ${benefit.color} text-white text-[10px] font-black uppercase tracking-widest border border-white/10`}>
                    Premium Program
                  </div>
                  <h2 className="text-2xl md:text-3xl font-display font-black tracking-tight text-white leading-tight">
                    {benefit.title}
                  </h2>
                  <p className="text-slate-400 text-xs md:text-sm leading-relaxed">
                    {benefit.description}
                  </p>
                </div>

                {/* Info Blocks */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                   <div className="flex items-center gap-3 p-3.5 bg-slate-900/60 rounded-xl border border-slate-800">
                      <div className="w-9 h-9 rounded-lg bg-blue-500/10 flex items-center justify-center shrink-0 border border-blue-500/20">
                         <Calendar className="w-4 h-4 text-cyan-400" />
                      </div>
                      <div>
                         <div className="text-[9px] font-black text-slate-500 uppercase tracking-widest">일정</div>
                         <div className="text-xs md:text-sm font-bold text-slate-200">{new Date(benefit.date).toLocaleDateString('ko-KR', { year: 'numeric', month: 'long', day: 'numeric' })}</div>
                      </div>
                   </div>
                   <div className="flex items-center gap-3 p-3.5 bg-slate-900/60 rounded-xl border border-slate-800">
                      <div className="w-9 h-9 rounded-lg bg-purple-500/10 flex items-center justify-center shrink-0 border border-purple-500/20">
                         <MapPin className="w-4 h-4 text-purple-400" />
                      </div>
                      <div>
                         <div className="text-[9px] font-black text-slate-500 uppercase tracking-widest">장소</div>
                         <div className="text-xs md:text-sm font-bold text-slate-200">추후 공지 (회원 전용)</div>
                      </div>
                   </div>
                </div>

                {/* Schedule list */}
                <div className="space-y-3">
                  <h4 className="flex items-center gap-2 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                    <Clock className="w-3.5 h-3.5 text-[#D4AF37]" />
                    Detailed Schedule
                  </h4>
                  <div className="space-y-2.5 bg-slate-900/30 p-4 rounded-xl border border-slate-900">
                    {benefit.schedule.map((item, i) => (
                      <div key={i} className="flex gap-3 items-start group">
                         <div className="w-px h-6 bg-blue-500/20 group-last:bg-transparent mt-1 ml-[5px] relative">
                            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-blue-500 border border-slate-950" />
                         </div>
                         <span className="text-xs text-slate-300 font-medium pt-0.5">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Live Map Accent */}
                <MapPlaceholder location={benefit.title} />

                {/* Share Row */}
                <div className="flex items-center justify-between pt-4 border-t border-slate-900">
                   <div className="text-[9px] font-black text-slate-500 uppercase tracking-widest flex items-center gap-1">
                     <Share2 className="w-3 h-3" />
                     Share Event
                   </div>
                   <div className="flex gap-2">
                      <button className="w-7 h-7 rounded-lg bg-[#FEE500] flex items-center justify-center hover:scale-105 active:scale-95 transition-all text-[11px] font-black text-[#3C1E1E]" title="Share to KakaoTalk">
                         K
                      </button>
                      <button className="w-7 h-7 rounded-lg bg-gradient-to-tr from-[#f9ce34] via-[#ee2a7b] to-[#6228d7] flex items-center justify-center hover:scale-105 active:scale-95 transition-all text-white" title="Share to Instagram">
                         <div className="w-3 h-3 border border-white rounded-sm relative after:content-[''] after:absolute after:top-0.5 after:right-0.5 after:w-0.5 after:h-0.5 after:bg-white after:rounded-full before:content-[''] before:absolute before:top-1/2 before:left-1/2 before:-translate-x-1/2 before:-translate-y-1/2 before:w-1.5 before:h-1.5 before:border before:border-white before:rounded-full" />
                      </button>
                   </div>
                </div>

                {/* SMS Notification Form */}
                <div className="p-5 bg-blue-950/20 rounded-2xl border border-blue-500/10 space-y-3">
                   <div className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
                      <span className="text-[9px] font-black text-cyan-400 uppercase tracking-widest">24H Notification</span>
                   </div>
                   
                   <AnimatePresence mode="wait">
                      {!isSubscribed ? (
                        <motion.div 
                          key="input"
                          initial={{ opacity: 0, y: 5 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -5 }}
                          className="space-y-2.5"
                        >
                           <p className="text-xs text-slate-300 font-bold">행사 시작 24시간 전에 VIP 알림 문자를 발송해 드립니다.</p>
                           <div className="flex gap-2">
                              <input 
                                type="tel" 
                                placeholder="010-0000-0000"
                                value={phoneNumber}
                                onChange={(e) => setPhoneNumber(e.target.value)}
                                className="flex-1 bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs focus:outline-none focus:ring-1 focus:ring-blue-500 text-slate-200"
                              />
                              <button 
                                onClick={handleSubscribe}
                                className="px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-xs font-black rounded-lg hover:from-blue-500 hover:to-indigo-500 transition-colors"
                              >
                                알림 신청
                              </button>
                           </div>
                        </motion.div>
                      ) : (
                        <motion.div 
                          key="success"
                          initial={{ opacity: 0, scale: 0.95 }}
                          animate={{ opacity: 1, scale: 1 }}
                          className="flex flex-col items-center justify-center py-2 text-center"
                        >
                           <div className="w-8 h-8 rounded-full bg-green-950/40 border border-green-500/30 flex items-center justify-center mb-1.5">
                              <CheckCircle2 className="w-4 h-4 text-green-400" />
                           </div>
                           <p className="text-xs font-black text-green-400">알림 예약 완료!</p>
                           <p className="text-[10px] text-slate-400 mt-0.5">입력하신 연락처로 행사 24시간 전 리마인드 전송됩니다.</p>
                        </motion.div>
                      )}
                   </AnimatePresence>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-900">
                <button 
                  onClick={() => alert('프리패스 회원권 보유 시 본인 가입 정보와 매핑되어 자동 참여 등록이 완료됩니다.')}
                  className="btn-neon-3d-blue w-full py-4 text-sm"
                >
                  참여 예약하기
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
