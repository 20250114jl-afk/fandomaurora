import Logo from './Logo';

export default function Footer() {
  return (
    <footer className="bg-[#02050c] py-12 px-6 md:px-12 border-t border-slate-900 flex flex-col md:flex-row justify-between items-center gap-8 text-[10px] text-slate-500 uppercase tracking-widest relative">
      {/* Absolute top neon divider line */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-blue-500/30 to-transparent" />
      
      <div className="flex flex-col items-center md:items-start gap-3">
        <Logo size="sm" showText={true} />
        <p className="text-center md:text-left leading-relaxed mt-2 text-[9px] font-semibold text-slate-500">
          © 2026 KOYOTE SHINJI FANDOM AURORA PROJECT. ALL RIGHTS RESERVED.
        </p>
      </div>

      <div className="flex flex-wrap justify-center gap-6 md:gap-8 font-black">
        <a href="#" className="hover:text-[#D4AF37] transition-all hover:shadow-[0_0_8px_rgba(212,175,55,0.2)]">TERMS OF SERVICE</a>
        <a href="#" className="hover:text-[#D4AF37] transition-all hover:shadow-[0_0_8px_rgba(212,175,55,0.2)]">PRIVACY POLICY</a>
        <a href="#" className="hover:text-[#D4AF37] transition-all hover:shadow-[0_0_8px_rgba(212,175,55,0.2)]">PARTNERSHIP</a>
      </div>
    </footer>
  );
}
