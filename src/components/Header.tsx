import { motion, useScroll, useSpring } from 'motion/react';
import { Link } from 'react-router-dom';
import { useFirebase } from '../lib/FirebaseContext';
import { auth } from '../lib/firebase';
import { User, LogOut, Settings } from 'lucide-react';
import Logo from './Logo';

export default function Header() {
  const { scrollYProgress } = useScroll();
  const { user, profile } = useFirebase();
  const isAdmin = user && user.email === 'new2020.jeonil@gmail.com';

  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const handleLogout = async () => {
    try {
      await auth.signOut();
      window.location.reload();
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-indigo-500 to-[#D4AF37] origin-[0%] z-[60]"
        style={{ scaleX }}
      />
      <motion.header 
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-5 md:px-10 py-3 md:py-4 backdrop-blur-lg bg-slate-950/80 border-b border-blue-500/20 shadow-[0_4px_20px_rgba(59,130,246,0.15)]"
      >
        <Link to="/" className="flex items-center gap-2 group">
          <Logo size="sm" showText={true} />
        </Link>
        
        <nav className="hidden lg:flex items-center gap-8 text-sm font-bold text-slate-300">
          <a href="/#benefits" className="hover:text-[#D4AF37] transition-colors">멤버 특권</a>
          <a href="/#trust" className="hover:text-[#D4AF37] transition-colors">리콜 제도</a>
          <a href="/#value" className="hover:text-[#D4AF37] transition-colors">가치 비교</a>
          <a href="/#faq" className="hover:text-[#D4AF37] transition-colors">문의하기</a>
          <Link to="/apply" className="text-amber-200 hover:text-amber-300 transition-colors font-extrabold flex items-center gap-1.5 bg-amber-500/10 px-3.5 py-1.5 rounded-full border border-amber-500/30 shadow-[0_0_10px_rgba(212,175,55,0.15)]">나의 팬 선택 🌟</Link>
          {user && (
            <Link to="/mypage" className="text-blue-400 hover:text-blue-300 transition-all font-black flex items-center gap-1 bg-blue-950/50 px-3.5 py-1.5 rounded-full border border-blue-500/30">
              마이페이지
              {profile && (profile.role === 'Sales' || profile.role === 'Admin') && (
                <span className="text-[9px] bg-blue-600 text-white px-1.5 py-0.5 rounded font-black uppercase">Sales</span>
              )}
            </Link>
          )}
        </nav>
        
        <div className="flex items-center gap-3">
          {user ? (
            <div className="flex items-center gap-4">
               {user && (
                  <Link to="/mypage" className="p-2.5 rounded-full bg-indigo-950/50 text-indigo-400 hover:bg-indigo-900/50 transition-colors lg:hidden" title="Mypage">
                    <User className="w-4 h-4" />
                  </Link>
               )}
               {isAdmin && (
                  <Link to="/admin" className="p-2.5 rounded-full bg-blue-950/50 text-blue-400 hover:bg-blue-100/50 transition-colors" title="Admin Settings">
                    <Settings className="w-4 h-4" />
                  </Link>
               )}
               <div className="hidden md:flex items-center gap-2 px-4 py-2 bg-blue-950/40 rounded-full border border-blue-500/20">
                  <User className="w-3 h-3 text-blue-400" />
                  <span className="text-xs font-black text-blue-200">{profile?.displayName || user.email}님 환영합니다</span>
               </div>
               <button 
                  onClick={handleLogout}
                  className="p-2.5 rounded-full bg-slate-900 text-slate-400 hover:bg-slate-800 transition-colors"
                  title="로그아웃"
               >
                  <LogOut className="w-4 h-4" />
               </button>
            </div>
          ) : (
            <>
              <Link to="/login" className="hidden sm:block py-2 px-6 text-sm font-bold text-blue-400 border border-blue-500/50 hover:border-blue-400 hover:text-white hover:shadow-[0_0_15px_rgba(59,130,246,0.3)] transition-all rounded-full">
                로그인
              </Link>
              <Link to="/signup" className="px-5 py-2.5 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white rounded-full text-xs md:text-sm font-black shadow-[0_0_15px_rgba(59,130,246,0.4)] hover:scale-105 hover:shadow-[0_0_20px_rgba(99,102,241,0.6)] transition-all text-center">
                가입하기
              </Link>
            </>
          )}
        </div>
      </motion.header>
    </>
  );
}
