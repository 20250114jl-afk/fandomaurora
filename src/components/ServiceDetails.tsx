import { motion } from 'motion/react';
import { Utensils, Play, Users, Sparkles } from 'lucide-react';

const programs = [
  {
    category: "Sky Lounge Fanmeeting",
    title: "팬덤 서비스의 90분",
    subtitle: "| 파노라마 오션뷰에 감동이 물결 스카이라운지 팬미팅 |",
    items: [
      { 
        type: "Dining", 
        icon: Utensils,
        desc: "이탈리안 최고의 셰프가 제공하는 디너",
        images: ["https://images.unsplash.com/photo-1544333346-64e4fe18274d?auto=format&fit=crop&q=80", "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&q=80"]
      },
      { 
        type: "Play", 
        icon: Play,
        desc: "파노라마 씨뷰 기념 촬영 그리고 코요테 특별 공연",
        images: ["https://images.unsplash.com/photo-1520390138845-fd2d229dd553?auto=format&fit=crop&q=80", "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&q=80"]
      },
      { 
        type: "Family", 
        icon: Users,
        desc: "즐거운 파티와 숙박제공",
        images: ["https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&q=80", "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?auto=format&fit=crop&q=80"]
      }
    ]
  },
  {
    category: "Cruise Tour",
    title: "팬크루즈 취향 1박2일",
    subtitle: "| 지루할 틈 없는 바다 위 24시간 |",
    items: [
      { 
        type: "Dining", 
        icon: Utensils,
        desc: "아침부터 야식까지, 전 미식을 맛보는 '메인 뷔페 레스토랑'",
        images: ["https://images.unsplash.com/photo-1550966841-3eeec794619d?auto=format&fit=crop&q=80", "https://images.unsplash.com/photo-1546039907-7fa05f864c02?auto=format&fit=crop&q=80"]
      },
      { 
        type: "Play", 
        icon: Play,
        desc: "동해선상의 밤바다, 카지노, 그리고 코요테 특별 공연",
        images: ["https://images.unsplash.com/photo-1548574505-5e239809ee19?auto=format&fit=crop&q=80", "https://images.unsplash.com/photo-1578496479914-723f74c24ee1?auto=format&fit=crop&q=80"]
      },
      { 
        type: "Family", 
        icon: Users,
        desc: "즐거운 사교 클럽과 고급 2인룸",
        images: ["https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&q=80", "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&q=80"]
      }
    ]
  }
];

export default function ServiceDetails() {
  return (
    <section className="py-20 md:py-32 px-5 md:px-12 bg-[#02050c] relative overflow-hidden">
      {/* Background neon glows */}
      <div className="absolute top-1/3 left-[10%] w-[400px] h-[400px] bg-blue-600/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-1/3 right-[10%] w-[400px] h-[400px] bg-purple-600/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto space-y-28 relative z-10">
        {programs.map((program, pIndex) => (
          <div key={pIndex} className="space-y-12">
            <div className="text-center space-y-4">
              <p className="text-amber-400 font-black text-xs md:text-sm tracking-widest uppercase flex items-center justify-center gap-1.5">
                <Sparkles className="w-4 h-4 text-amber-400 animate-pulse" />
                {program.subtitle}
              </p>
              <h2 className="text-3xl md:text-6xl font-display font-black tracking-tighter text-white">
                {program.title}
              </h2>
              <div className="neon-line-blue max-w-sm mx-auto opacity-40" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {program.items.map((item, iIndex) => {
                const IconComponent = item.icon;
                
                // Colors based on pIndex and iIndex
                const borderGlowClass = iIndex % 3 === 0 
                  ? 'border-blue-500/20 hover:border-blue-500/50 shadow-[0_4px_30px_rgba(59,130,246,0.05)]' 
                  : iIndex % 3 === 1 
                    ? 'border-purple-500/20 hover:border-purple-500/50 shadow-[0_4px_30px_rgba(168,85,247,0.05)]' 
                    : 'border-amber-400/20 hover:border-amber-400/50 shadow-[0_4px_30px_rgba(212,175,55,0.05)]';

                const textHighlightClass = iIndex % 3 === 0
                  ? 'text-blue-400'
                  : iIndex % 3 === 1
                    ? 'text-purple-400'
                    : 'text-amber-400';

                return (
                  <motion.div 
                    key={iIndex}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: iIndex * 0.1 }}
                    className={`bg-slate-950/70 backdrop-blur-md rounded-[2rem] overflow-hidden flex flex-col border ${borderGlowClass} transition-all duration-300 transform hover:-translate-y-1`}
                  >
                    <div className="p-8 pb-4 flex flex-col items-center">
                      <div className="flex items-center gap-2 mb-3">
                        <IconComponent className={`w-5 h-5 ${textHighlightClass}`} />
                        <span className={`font-black text-lg ${textHighlightClass}`}>{String(iIndex + 1).padStart(2, '0')}</span>
                      </div>
                      <h3 className={`text-3xl md:text-4xl font-display font-black text-transparent bg-clip-text bg-gradient-to-r ${iIndex % 3 === 0 ? 'from-blue-400 to-cyan-300' : iIndex % 3 === 1 ? 'from-purple-400 to-fuchsia-300' : 'from-amber-200 to-amber-400'} italic mb-3`}>
                        {item.type}
                      </h3>
                      <p className="text-slate-400 text-xs md:text-sm font-bold text-center leading-relaxed min-h-[40px] px-2">{item.desc}</p>
                    </div>
                    
                    <div className="flex-1 grid grid-cols-1 gap-3 p-5 pt-3">
                      {item.images.map((img, imgIndex) => (
                        <div key={imgIndex} className="aspect-square rounded-2xl overflow-hidden shadow-md border border-slate-800 relative group">
                          <img 
                            src={img} 
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
                            alt={item.type} 
                            referrerPolicy="no-referrer"
                          />
                          {/* Dark glow mask */}
                          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />
                        </div>
                      ))}
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
