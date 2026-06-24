import { motion } from 'motion/react';
import { CheckCircle2, Sparkles, TrendingUp } from 'lucide-react';

export default function ValueComparison() {
  const items = [
    { name: "속초 디너 팬미팅 프리패스", emoji: "🍽️", market: "8만원", member: "포함" },
    { name: "코요태 썸머 콘서트 프리패스", emoji: "🎤", market: "15만원", member: "포함" },
    { name: "All-inclusive 팬크루즈 투어", emoji: "🚢", market: "44만원", member: "포함" },
    { name: "코요태 단독 공연 VIP 관람", emoji: "🎫", market: "20만원 상당", member: "포함" },
    { name: "신지 한정판 기념 주화", emoji: "🪙", market: "15만원 상당", member: "포함" },
    { name: "기념 굿즈 카드 및 달력 패키지", emoji: "📅", market: "10만원 상당", member: "포함" },
  ];

  const totalMarketValue = "112만원+";
  const membershipFee = "55만원";

  return (
    <section id="value" className="py-20 md:py-28 px-4 md:px-12 bg-[#02050c] relative overflow-hidden">
      {/* Glow Effects */}
      <div className="absolute top-1/2 left-1/3 w-[500px] h-[500px] bg-blue-600/5 rounded-full blur-[130px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="mb-12 md:mb-16 space-y-4">
          <p className="text-[#D4AF37] font-black uppercase tracking-widest text-xs flex items-center gap-1.5">
            <TrendingUp className="w-4 h-4" />
            Cost Performance
          </p>
          <h2 className="text-3xl md:text-5xl font-display font-black tracking-tighter text-white">
             일반 이용 대비 <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-400 to-[#D4AF37] italic drop-shadow-[0_0_12px_rgba(59,130,246,0.35)]">압도적인 경제 가치</span>
          </h2>
          <p className="text-slate-400 text-xs md:text-sm">회원 가입비의 2배가 넘는 실질적인 혜택을 수치로 직접 비교해 보세요.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Table Container (Translucent Neon style) */}
          <div className="lg:col-span-7 bg-slate-950/80 rounded-[2rem] overflow-hidden border border-blue-500/20 shadow-[0_15px_40px_rgba(0,0,0,0.8),_0_0_20px_rgba(59,130,246,0.1)]">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse min-w-[320px]">
                 <thead>
                   <tr className="border-b border-slate-800 bg-[#0d1425]">
                     <th className="px-4 md:px-8 py-5 md:py-6 text-xs md:text-sm font-black text-slate-300 uppercase tracking-widest">혜택 항목</th>
                     <th className="px-4 md:px-8 py-5 md:py-6 text-xs md:text-sm font-black text-slate-300 uppercase tracking-widest text-right">일반 개별가</th>
                     <th className="px-4 md:px-8 py-5 md:py-6 text-xs md:text-sm font-black text-amber-400 uppercase tracking-widest text-right">멤버십 혜택</th>
                   </tr>
                 </thead>
                 <tbody className="divide-y divide-slate-900">
                   {items.map((item, i) => (
                     <tr key={i} className="hover:bg-blue-950/20 transition-colors text-xs md:text-sm group">
                        <td className="px-4 md:px-8 py-4.5 md:py-5.5 font-bold text-slate-200">
                          <span className="flex items-center gap-2">
                            <span className="text-base group-hover:scale-110 transition-transform">{item.emoji}</span>
                            <span className="hidden sm:inline group-hover:text-white transition-colors">{item.name}</span>
                            <span className="sm:hidden group-hover:text-white transition-colors">{item.name.replace(' 프리패스', '').replace(' 에디션', '').replace(' 패키지', '')}</span>
                          </span>
                        </td>
                        <td className="px-4 md:px-8 py-4.5 md:py-5.5 text-slate-500 text-right font-semibold text-[11px] md:text-xs whitespace-nowrap group-hover:text-slate-400 transition-colors">{item.market}</td>
                        <td className="px-4 md:px-8 py-4.5 md:py-5.5 font-black text-right whitespace-nowrap">
                           <span className="inline-flex items-center gap-1 justify-end text-cyan-400 bg-cyan-500/10 px-2.5 py-1 rounded-full border border-cyan-500/20 shadow-[0_0_10px_rgba(0,229,255,0.1)] group-hover:shadow-[0_0_15px_rgba(0,229,255,0.2)] transition-shadow">
                             <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400" />
                             <span>{item.member}</span>
                           </span>
                        </td>
                     </tr>
                   ))}
                 </tbody>
              </table>
            </div>
          </div>

          {/* Summary Card (Tactile VIP Gold Neon Theme) */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-5 bg-gradient-to-br from-[#0c1428] via-[#090d19] to-[#04060d] p-8 md:p-10 rounded-3xl flex flex-col justify-between border border-[#d4af37]/35 shadow-[0_20px_50px_rgba(0,0,0,0.9),_0_0_30px_rgba(212,175,55,0.08)] relative overflow-hidden"
          >
             {/* Amber glow halo */}
             <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/10 rounded-full blur-2xl pointer-events-none" />

             <div className="space-y-8 relative z-10">
                <div className="flex justify-between items-center border-b border-slate-800 pb-4">
                  <span className="text-xs font-black text-slate-400 uppercase tracking-widest flex items-center gap-1">
                    <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
                    Price Summary
                  </span>
                  <span className="text-[10px] text-amber-400/80 uppercase font-bold bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20">
                    Total: ₩1,120,000+
                  </span>
                </div>
                
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-slate-400 text-sm">일반 개별 총합 가치</span>
                    <span className="text-xl font-display font-medium text-slate-500 line-through decoration-slate-500">{totalMarketValue}</span>
                  </div>
                  <div className="flex justify-between items-center pt-5 border-t border-slate-800">
                    <span className="text-white font-black text-lg">오로라 특별 가입비</span>
                    <span className="text-4xl md:text-5xl font-display font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-100 via-amber-300 to-amber-100 tracking-tighter drop-shadow-[0_0_15px_rgba(212,175,55,0.35)]">
                      {membershipFee}
                    </span>
                  </div>
                </div>

                <div className="p-4 bg-slate-900/60 border border-blue-500/15 rounded-2xl">
                  <p className="text-[10px] text-cyan-400 leading-relaxed uppercase font-black mb-1 flex items-center gap-1">
                    <span>💎</span>
                    Benefit Points
                  </p>
                  <p className="text-xs text-slate-300 leading-relaxed font-semibold">
                    회원 가입 승인 즉시, 현금 가치 약 57만 원 이상의 압도적 이득을 안고 라이프스타일을 전환해 보세요.
                  </p>
                </div>
             </div>

             <div className="mt-10">
               <button 
                 onClick={() => alert('나의 팬 선택하기를 눌러 가입 신청 양식으로 이동해 주세요.')}
                 className="btn-neon-3d-gold w-full py-4 text-sm font-black tracking-widest block text-center"
               >
                 지금 가입하고 혜택 받기
               </button>
             </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
