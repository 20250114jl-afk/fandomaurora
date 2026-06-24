import { motion } from 'motion/react';
import { Search, ShieldCheck, ShieldAlert, Sparkles, AlertCircle } from 'lucide-react';

const exclusions = [
  { title: "크루즈 투어", desc: "주류 미포함", icon: "🚢" },
  { title: "웨이브파크 단독 콘서트", desc: "주류 및 추가음식 불포함", icon: "🎡" },
  { title: "팬미팅 디너쇼", desc: "판매상품, 음료, 주류, 조식 미포함", icon: "🥂" },
  { title: "공연티켓", desc: "멤버외 추가 인원 불포함", icon: "🎫" }
];

const inclusions = [
  { title: "크루즈 투어", desc: "공연, 식사, 음료 포함", icon: "🚢" },
  { title: "웨이브파크 단독 콘서트", desc: "BBQ, 풀 입장료 포함", icon: "🎡" },
  { title: "팬미팅 디너쇼", desc: "디너, 입장료, 숙박 2인 1실 제공 (단독 사용 시 5만원 추가)", icon: "🥂" },
  { title: "공연티켓", desc: "단독 공연 VIP석 제공", icon: "🎫" },
  { title: "팬 맞춤 서비스", desc: "선상 안내 방송, 전용 라운지 이용", icon: "✨" }
];

export default function Trust() {
  return (
    <section id="trust" className="py-24 px-5 md:px-12 bg-[#030712] text-white overflow-hidden relative">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-1/4 w-[350px] h-[350px] bg-blue-500/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-10 right-1/4 w-[350px] h-[350px] bg-emerald-500/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-6xl mx-auto space-y-16 relative z-10">
        <div className="text-center space-y-4">
          <p className="text-amber-400 font-black uppercase tracking-widest text-xs md:text-sm flex items-center justify-center gap-1.5">
            <Sparkles className="w-4 h-4 text-amber-400 animate-pulse" />
            꼭! 확인하세요
          </p>
          <div className="flex items-center justify-center gap-3">
            <h2 className="text-3xl md:text-5xl font-display font-black tracking-tighter text-white">
              팬덤 프리카드 발매 정보
            </h2>
            <Search className="w-6 h-6 md:w-8 md:h-8 text-[#D4AF37] animate-pulse" />
          </div>
          <div className="neon-line-blue max-w-xs mx-auto opacity-40" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Inclusion Panel (Glowing neon green border) */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-slate-950/80 backdrop-blur-md border border-emerald-500/25 rounded-[2.5rem] overflow-hidden shadow-[0_10px_40px_rgba(0,0,0,0.8),_0_0_20px_rgba(16,185,129,0.05)] transition-all hover:border-emerald-500/50"
          >
            <div className="bg-emerald-950/40 px-8 py-5 flex items-center gap-3.5 border-b border-emerald-500/20">
               <div className="w-7 h-7 rounded-full border border-emerald-400 flex items-center justify-center font-black text-emerald-400 text-sm bg-emerald-950/80">O</div>
               <span className="text-white font-black text-xl">포함 사항</span>
            </div>
            <div className="p-8 space-y-6">
               {inclusions.map((item, i) => (
                 <div key={i} className="flex gap-5 items-start">
                    <div className="w-12 h-12 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center text-xl shadow-inner shrink-0">
                       {item.icon}
                    </div>
                    <div className="space-y-1">
                       <h4 className="font-bold text-white text-base">{item.title}</h4>
                       <p className="text-slate-400 text-xs md:text-sm leading-relaxed">{item.desc}</p>
                    </div>
                 </div>
               ))}
            </div>
          </motion.div>

          {/* Exclusion Panel (Glowing neon red/purple border) */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-slate-950/80 backdrop-blur-md border border-rose-500/20 rounded-[2.5rem] overflow-hidden shadow-[0_10px_40px_rgba(0,0,0,0.8),_0_0_20px_rgba(239,68,68,0.05)] transition-all hover:border-rose-500/40"
          >
            <div className="bg-rose-950/30 px-8 py-5 flex items-center gap-3.5 border-b border-rose-500/20">
               <div className="w-7 h-7 rounded-full border border-rose-400 flex items-center justify-center font-black text-rose-400 text-sm bg-rose-950/80">X</div>
               <span className="text-white font-black text-xl">불포함 사항</span>
            </div>
            <div className="p-8 space-y-6">
               {exclusions.map((item, i) => (
                 <div key={i} className="flex gap-5 items-start opacity-70">
                    <div className="w-12 h-12 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center text-xl shadow-inner shrink-0">
                       {item.icon}
                    </div>
                    <div className="space-y-1">
                       <h4 className="font-bold text-slate-300 text-base">{item.title}</h4>
                       <p className="text-slate-400 text-xs md:text-sm leading-relaxed">{item.desc}</p>
                    </div>
                 </div>
               ))}
            </div>
          </motion.div>
        </div>

        {/* Check Point Box (Glowing gold neon border) */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-slate-950/90 border border-[#d4af37]/30 rounded-3xl p-8 shadow-[0_0_30px_rgba(212,175,55,0.08)] relative overflow-hidden"
        >
          {/* Subtle gold halo */}
          <div className="absolute top-0 right-0 w-48 h-48 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
            <div className="space-y-2 flex items-center gap-3 md:block">
              <AlertCircle className="w-8 h-8 text-[#D4AF37] mb-2 shrink-0 animate-pulse" />
              <h3 className="text-xl md:text-2xl font-display font-black tracking-tight text-white leading-tight">
                예약 안내 및<br className="hidden md:inline" /> 취소 규정
              </h3>
            </div>
            <div className="md:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-6 text-xs md:text-sm font-medium text-slate-300">
              <div className="space-y-2 bg-slate-900/40 p-4 rounded-xl border border-slate-900">
                <p className="text-white font-black flex items-center gap-1.5">
                  <span className="text-amber-400">⚡</span>
                  서비스 유효기간 : 1년
                </p>
                <p className="text-slate-300 flex items-center gap-1.5">
                  <span className="text-blue-400">▪</span>
                  예약금 : 가입 시 55만원 완납 후 확약
                </p>
              </div>
              <div className="space-y-2 bg-slate-900/40 p-4 rounded-xl border border-slate-900">
                <p className="text-white font-black flex items-center gap-1.5">
                  <span className="text-red-400">⛔</span>
                  취소 규정 : 서비스 만료 시 환불 불가능
                </p>
                <p className="text-cyan-300 font-black flex items-center gap-1.5">
                  <span className="text-cyan-400">🌟</span>
                  혜택 미수령자 : 회당 10만원 리턴 보상
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Pulsing Recall Guarantee Capsule (Tactile Cybernetic style) */}
        <div className="flex justify-center pt-6">
           <motion.div 
             whileHover={{ scale: 1.05 }}
             className="flex items-center gap-3 px-6 py-3.5 bg-slate-950 border border-emerald-500/40 text-emerald-300 rounded-full font-black text-xs md:text-sm shadow-[0_0_20px_rgba(16,185,129,0.25)] animate-pulse"
           >
              <ShieldCheck className="w-5 h-5 text-emerald-400" />
              대한민국 최초 팬덤 특권 이행 리콜 보장제 실시 (불만족 시 100% 환불 보증)
           </motion.div>
        </div>
      </div>
    </section>
  );
}
