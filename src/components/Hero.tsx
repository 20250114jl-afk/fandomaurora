import { motion } from 'motion/react';
import { useSettings } from '../lib/useSettings';
import { Loader2, Sparkles, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import Logo from './Logo';

export default function Hero() {
  const { settings, loading } = useSettings();

  if (loading) return (
    <div className="h-screen flex items-center justify-center bg-[#02050c]">
      <Loader2 className="w-8 h-8 text-blue-500 animate-spin" />
    </div>
  );

  return (
    <section className="relative min-h-screen flex items-center pt-28 pb-16 px-5 md:px-10 overflow-hidden bg-[#02050c]">
      {/* Cosmic Nebula Background & Light Effects */}
      <div className="absolute inset-0 opacity-60 pointer-events-none">
        <div className="absolute top-[5%] left-[10%] w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-[10%] right-[5%] w-[600px] h-[600px] bg-purple-600/10 rounded-full blur-[150px]" />
        <div className="absolute top-[30%] right-[30%] w-[400px] h-[400px] bg-indigo-500/10 rounded-full blur-[100px]" />
        <div className="absolute -top-[50px] left-1/2 -translate-x-1/2 w-full h-[150px] bg-gradient-to-b from-blue-500/10 to-transparent blur-md" />
      </div>

      {/* Floating Sparkles Background */}
      <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.015)_1px,transparent_1px)] [background-size:24px_24px] opacity-80" />

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center z-10 w-full relative">
        
        {/* Left Side: Copywriting & Actions */}
        <div className="lg:col-span-7 space-y-8 text-center lg:text-left">
          
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center lg:items-start gap-4"
          >
            <div className="flex items-center gap-1.5 px-4 py-1.5 bg-blue-500/10 backdrop-blur-md rounded-full border border-blue-500/30 shadow-[0_0_15px_rgba(59,130,246,0.2)]">
               <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping" />
               <span className="text-cyan-300 text-[10px] md:text-xs font-black uppercase tracking-widest">{settings.hero.badge}</span>
            </div>
            <h2 className="text-lg md:text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-amber-400 to-amber-200 drop-shadow-sm flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-amber-400 animate-pulse" />
              {settings.hero.artist}
            </h2>
          </motion.div>
          
          {/* Copywriting Titles */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="space-y-6"
          >
            {/* Logo/Badge Row */}
            <div className="flex justify-center lg:justify-start gap-3 flex-wrap">
              {(settings.hero.title + settings.hero.subtitle).split('').slice(0, 4).map((text: string, i: number) => (
                <div key={i} className="w-12 h-12 md:w-16 md:h-16 rounded-2xl bg-slate-900/80 backdrop-blur-md flex items-center justify-center border border-blue-500/30 shadow-[0_0_15px_rgba(59,130,246,0.25)]">
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300 text-xl md:text-2xl font-black">{text}</span>
                </div>
              ))}
            </div>

            <h1 className="text-5xl md:text-7xl lg:text-8xl font-display font-black leading-[1] tracking-tighter text-white">
              {settings.hero.title}
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-amber-400 to-amber-200 italic drop-shadow-[0_0_15px_rgba(212,175,55,0.3)]">
                {settings.hero.subtitle}
              </span>
            </h1>

            {/* Tagline Neon Box */}
            <div className="inline-block px-8 py-3.5 rounded-2xl border border-blue-500/20 backdrop-blur-md bg-blue-950/20 shadow-[0_0_20px_rgba(59,130,246,0.15)]">
               <span className="text-blue-300 text-sm md:text-lg font-bold tracking-tight">
                 ✨ {settings.hero.tagline}
               </span>
            </div>
          </motion.div>

          {/* Action Buttons */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-8 pt-4"
          >
            <Link to="/apply" className="btn-neon-3d-gold px-10 py-5 text-lg font-black group flex items-center gap-2">
              나의 팬 선택하기
              <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            
            <div className="flex flex-col text-center sm:text-left">
              <span className="text-xs text-slate-400 uppercase tracking-widest font-black flex items-center gap-1">
                <span>💳</span> 연회원 가입 혜택가
              </span>
              <span className="font-display font-black text-3xl md:text-4xl text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-100 to-blue-200 tracking-tighter drop-shadow-md">
                {settings.hero.membershipFee}
              </span>
            </div>
          </motion.div>

          {/* Neon line divider inside hero */}
          <div className="neon-line-blue pt-8 max-w-md mx-auto lg:mx-0 opacity-50" />
        </div>

        {/* Right Side: Luxury Card Mockup */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.8, y: 50 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 1, type: "spring", bounce: 0.4 }}
          className="lg:col-span-5 flex justify-center"
        >
          {/* Card Mockup (Luxurious Metallic Deep-Dark Neon theme) */}
          <div className="relative group w-full max-w-[420px] aspect-[1.58/1] rounded-[1.8rem] overflow-hidden shadow-[0_30px_60px_-15px_rgba(0,0,0,0.8),_0_0_40px_rgba(59,130,246,0.3)] border-2 border-amber-400/40 transform hover:-rotate-1 hover:scale-105 transition-all duration-700">
             
             {/* Rich Metallic Deep Dark Nebula Background */}
             <div className="absolute inset-0 bg-[#090e1a]" />
             <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(99,102,241,0.25)_0%,transparent_60%)]" />
             <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(217,70,239,0.15)_0%,transparent_60%)]" />

             {/* Shining laser micro lines */}
             <div className="absolute inset-0 bg-[linear-gradient(45deg,rgba(255,255,255,0.01)_25%,transparent_25%,transparent_50%,rgba(255,255,255,0.01)_50%,rgba(255,255,255,0.01)_75%,transparent_75%,transparent)] [background-size:10px_10px]" />

             {/* Gold Star and Orbit Accent Graphic (Replicating user logo feel) */}
             <div className="absolute top-[20%] right-[10%] w-32 h-32 border border-amber-400/20 rounded-full opacity-60 pointer-events-none filter blur-[1px] transform rotate-45" />
             <div className="absolute top-[20%] right-[10%] w-32 h-32 border-2 border-t-transparent border-indigo-500/40 rounded-full opacity-80 pointer-events-none" />

             {/* Star Sparkle on Card */}
             <div className="absolute top-[20%] right-[25%] opacity-70">
               <Sparkles className="w-6 h-6 text-amber-200 animate-pulse" />
             </div>

             {/* Artist Image Masked */}
             <div className="absolute right-0 bottom-0 top-0 w-[55%] pointer-events-none overflow-hidden">
               <img 
                 src="https://images.unsplash.com/photo-1516280440614-37939bbacd81?auto=format&fit=crop&q=80" 
                 alt="Shinji" 
                 className="w-full h-full object-cover object-center opacity-70 group-hover:scale-110 transition-transform duration-700"
                 referrerPolicy="no-referrer"
               />
               <div className="absolute inset-0 bg-gradient-to-r from-[#090e1a] via-transparent to-transparent" />
               <div className="absolute inset-0 bg-gradient-to-t from-[#090e1a]/60 to-transparent" />
             </div>

             {/* Card Top Details */}
             <div className="absolute top-6 left-6 right-6 flex justify-between items-center z-10">
               <div className="flex items-center gap-1.5">
                 <Logo size="sm" showText={false} />
                 <span className="text-[10px] font-black tracking-[0.2em] text-transparent bg-clip-text bg-gradient-to-r from-amber-100 to-amber-300 uppercase">
                   AURORA BLACK
                 </span>
               </div>
               {/* Smart Card Chip */}
               <div className="w-10 h-7 rounded-md bg-gradient-to-br from-amber-200 via-amber-400 to-amber-600 shadow-inner flex flex-col justify-between p-1.5">
                 <div className="h-[1px] bg-slate-900/20" />
                 <div className="h-[1px] bg-slate-900/20" />
                 <div className="h-[1px] bg-slate-900/20" />
               </div>
             </div>

             {/* Card Number & Expiry */}
             <div className="absolute bottom-6 left-6 right-6 flex justify-between items-end z-10">
               <div className="space-y-1">
                 <div className="text-amber-100/90 font-mono text-base md:text-lg tracking-[0.25em] drop-shadow-md">
                   8829 **** 2026 ****
                 </div>
                 <div className="flex items-center gap-4">
                   <div className="text-[9px] text-slate-400 font-bold tracking-widest uppercase">
                     EXP 12/29
                   </div>
                   <div className="text-[9px] text-slate-400 font-bold tracking-widest uppercase">
                     CVV ***
                   </div>
                 </div>
               </div>
               {/* Membership Signature Stamp */}
               <div className="text-right">
                 <div className="text-[9px] text-amber-400 font-black tracking-widest uppercase mb-0.5">SHINJI FANDOM</div>
                 <div className="text-xs font-display font-black text-white italic tracking-tighter">VIP Platinum</div>
               </div>
             </div>

             {/* Watermark Logo Accent */}
             <div className="absolute top-1/2 left-6 -translate-y-1/2 opacity-5 pointer-events-none">
               <Logo size="lg" showText={false} />
             </div>
             
             {/* Dynamic Light Shine Animation on hover */}
             <div className="absolute top-0 -left-full w-1/2 h-full bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-[-25deg] group-hover:animate-[shine_1.5s_infinite]" />
          </div>
        </motion.div>
      </div>

      {/* Modern Neon Wave divider */}
      <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-[#030712] to-transparent pointer-events-none" />
    </section>
  );
}
