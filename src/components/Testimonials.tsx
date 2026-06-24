import { motion } from 'motion/react';
import { Quote, Star, Sparkles } from 'lucide-react';

const testimonials = [
  {
    name: "김서연",
    role: "VIP 회원 / 신지 최애팬 🌟",
    quote: "스카이라운지 디너쇼는 정말 인생 최고의 경험이었어요. 가까운 거리에서 신지님의 감미로운 목소리를 들으며 같은 공간에 숨 쉬고 있다는 것만으로도 가입 가치가 넘칩니다.",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150&h=150"
  },
  {
    name: "이준호",
    role: "Premium 회원 / 코요태 열혈팬 🔥",
    quote: "크루즈 투어에서 아티스트와 오션뷰를 바라보며 찍은 기념 폴라로이드는 제 보물 1호가 되었습니다. 단순 팬미팅을 넘어 격조 높은 프라이빗 VIP 휴가 대접을 받는 기분이었어요.",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150&h=150"
  },
  {
    name: "박지민",
    role: "Gold 회원 / 오로라 가입자 💎",
    quote: "갑작스러운 해외 출장 때문에 행사에 참여하지 못했는데, 오로라만의 '이행 리콜 제도'를 통해 10만원 리워드를 즉각 환급받았습니다. 팬을 끝까지 배려해 주는 신뢰에 감동했습니다.",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=150&h=150"
  }
];

export default function Testimonials() {
  return (
    <section className="py-24 px-6 md:px-12 bg-[#02050c] relative overflow-hidden">
      {/* Decorative Aurora Glow Blur */}
      <div className="absolute bottom-0 left-0 w-full h-[300px] bg-gradient-to-t from-indigo-500/5 to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-16 space-y-4">
          <p className="text-[#D4AF37] font-black uppercase tracking-widest text-[10px] md:text-xs flex items-center justify-center gap-1">
            <Sparkles className="w-4 h-4 text-amber-400 animate-pulse" />
            REAL REVIEWS
          </p>
          <h2 className="text-3xl md:text-5xl font-display font-black tracking-tight text-white leading-tight">
            이미 많은 팬들이 <br className="sm:hidden" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-400 to-[#D4AF37] italic drop-shadow-[0_0_12px_rgba(59,130,246,0.3)]">
              오로라와 함께하고 있습니다
            </span>
          </h2>
          <p className="text-slate-400 text-xs md:text-sm">프리미엄 혜택을 직접 경험한 회원님들의 진솔한 이야기</p>
          <div className="neon-line-blue max-w-xs mx-auto opacity-40" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((t, i) => {
            // Neon accent border classes for testimonials grid
            const cardNeonClass = i % 3 === 0 
              ? 'neon-card-blue' 
              : i % 3 === 1 
                ? 'neon-card-purple' 
                : 'neon-card-gold';

            return (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className={`${cardNeonClass} p-8 flex flex-col h-full relative group transform hover:-translate-y-2 hover:scale-[1.01] duration-300`}
              >
                <Quote className="absolute top-6 right-8 w-10 h-10 text-indigo-500/10 group-hover:text-indigo-500/20 transition-colors pointer-events-none" />
                
                <div className="flex items-center gap-4 mb-6">
                  <div className="relative">
                    <img 
                      src={t.image} 
                      alt={t.name} 
                      className="w-14 h-14 rounded-full object-cover border-2 border-slate-800 group-hover:border-indigo-500/40 transition-colors"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-slate-900 border border-slate-850 rounded-full flex items-center justify-center">
                      <Star className="w-3 h-3 text-[#D4AF37] fill-[#D4AF37]" />
                    </div>
                  </div>
                  <div>
                    <h4 className="font-black text-white text-base">{t.name}</h4>
                    <p className="text-[10px] text-cyan-400 font-bold tracking-widest uppercase mt-0.5">{t.role}</p>
                  </div>
                </div>

                <p className="text-slate-300 text-xs md:text-sm leading-relaxed italic relative z-10 flex-1 min-h-[72px]">
                  "{t.quote}"
                </p>
                
                {/* 5-Star Rating Line */}
                <div className="mt-6 pt-5 border-t border-slate-900 flex gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star key={star} className="w-3.5 h-3.5 text-[#D4AF37] fill-[#D4AF37]" />
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
