import { motion } from 'motion/react';
import { Plus, Sparkles } from 'lucide-react';
import { useState } from 'react';
import BenefitModal from './BenefitModal';
import { useSettings } from '../lib/useSettings';
import { ICON_MAP } from '../lib/settings';

export default function Benefits() {
  const { settings, loading } = useSettings();
  const [selectedBenefit, setSelectedBenefit] = useState<any | null>(null);

  if (loading) return null;

  return (
    <section id="benefits" className="py-20 md:py-28 px-5 md:px-12 bg-[#040815] relative z-10 overflow-hidden">
      {/* Background Neon Lights */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-indigo-500/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        <div className="mb-16 md:mb-20 space-y-4 text-center">
          <p className="text-[#D4AF37] text-xs md:text-sm font-bold uppercase tracking-widest flex items-center justify-center gap-1">
            <Sparkles className="w-4 h-4 text-amber-400 animate-pulse" />
            한정판 팬클럽 프리패스 카드 출시
          </p>
          <h2 className="text-3xl md:text-6xl font-display font-black tracking-tighter text-white">
            멤버카드의 <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-400 to-[#D4AF37] italic drop-shadow-[0_0_12px_rgba(59,130,246,0.3)]">특권 6가지</span>
          </h2>
          <div className="neon-line-blue max-w-xs mx-auto opacity-60" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {settings.benefits.map((benefit: any, index: number) => {
            const IconComponent = ICON_MAP[benefit.icon] || Plus;
            
            // Choose neon class based on index
            const cardClasses = index % 3 === 0 
              ? 'neon-card-blue' 
              : index % 3 === 1 
                ? 'neon-card-purple' 
                : 'neon-card-gold';

            const tagColor = index % 3 === 0
              ? 'bg-blue-500/10 text-blue-300 border-blue-500/20'
              : index % 3 === 1
                ? 'bg-purple-500/10 text-purple-300 border-purple-500/20'
                : 'bg-amber-500/10 text-amber-300 border-amber-500/20';

            const btnColor = index % 3 === 0
              ? 'text-blue-400 hover:text-blue-300'
              : index % 3 === 1
                ? 'text-purple-400 hover:text-purple-300'
                : 'text-amber-400 hover:text-amber-300';

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                onClick={() => setSelectedBenefit(benefit)}
                className={`${cardClasses} group cursor-pointer relative overflow-hidden transform hover:-translate-y-2 hover:scale-[1.02] duration-300`}
              >
                {/* Floating Micro particles inside card */}
                <div className="absolute top-3 right-3 w-1 h-1 rounded-full bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity" />
                
                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${benefit.color} flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform relative`}>
                  {/* Glowing absolute ring */}
                  <div className="absolute inset-0 rounded-2xl bg-white/20 blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity" />
                  <IconComponent className="w-7 h-7 text-white" />
                </div>

                <div className="space-y-4 relative z-10">
                   <div className={`inline-block px-3 py-1 rounded-md text-[10px] font-black uppercase border ${tagColor}`}>
                     BENEFIT {index + 1}
                   </div>
                   <h3 className="text-xl md:text-2xl font-black text-white tracking-tight group-hover:text-amber-200 transition-colors">
                     {benefit.title}
                   </h3>
                   <p className="text-slate-400 text-xs md:text-sm leading-relaxed min-h-[48px]">
                     {benefit.description}
                   </p>
                   
                   {/* Neon line divider inside card */}
                   <div className="pt-4 border-t border-slate-800/60 flex justify-between items-center">
                      <span className="text-[11px] font-bold text-slate-400/90">{benefit.price}</span>
                      <button className={`flex items-center gap-1.5 text-[11px] font-black uppercase tracking-widest group-hover:gap-2.5 transition-all ${btnColor}`}>
                         자세히 보기
                         <Plus className="w-3.5 h-3.5" />
                      </button>
                   </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      <BenefitModal 
        isOpen={!!selectedBenefit} 
        onClose={() => setSelectedBenefit(null)} 
        benefit={selectedBenefit ? {...selectedBenefit, icon: ICON_MAP[selectedBenefit.icon] || Plus} : null} 
      />
    </section>
  );
}
