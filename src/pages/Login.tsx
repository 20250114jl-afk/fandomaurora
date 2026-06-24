import { motion } from 'motion/react';
import { Mail, Lock, LogIn, Loader2, Sparkles } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import React, { useState } from 'react';
import { useFirebase } from '../lib/FirebaseContext';
import { supabase } from '../lib/supabase';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { signInWithEmail } = useFirebase();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      await signInWithEmail(email, password);
      navigate('/');
    } catch (err: any) {
      console.error(err);
      setError(err.message || '이메일 또는 비밀번호가 올바르지 않습니다.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen pt-32 pb-20 px-5 flex items-center justify-center bg-[#02050c] relative overflow-hidden">
      {/* Decorative Aurora Blur */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] md:w-[600px] h-[300px] md:h-[600px] bg-blue-500/5 rounded-full blur-[120px] pointer-events-none" />

      <motion.div 
        initial={{ opacity: 0, scale: 0.95, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        className="relative w-full max-w-md bg-slate-950/85 backdrop-blur-md rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.8),_0_0_30px_rgba(59,130,246,0.15)] p-8 md:p-12 border border-blue-500/20 z-10"
      >
        <form onSubmit={handleLogin} className="space-y-6">
          <div className="text-center space-y-2">
            <h1 className="text-3xl font-display font-black tracking-tighter text-white">
              환영합니다! 🌟
            </h1>
            <p className="text-slate-400 text-xs font-semibold">팬덤 오로라의 특별한 혜택을 확인하세요</p>
          </div>

          {error && (
            <div className="p-4 bg-red-950/40 border border-red-500/20 text-red-400 text-xs font-bold rounded-xl text-center">
              {error}
            </div>
          )}

          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Email Address</label>
              <div className="relative">
                <input 
                  type="email" 
                  placeholder="name@example.com"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-800 rounded-2xl px-5 py-4 pl-12 text-slate-100 text-xs md:text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all placeholder-slate-600"
                />
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Password</label>
              <div className="relative">
                <input 
                  type="password" 
                  placeholder="••••••••"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-800 rounded-2xl px-5 py-4 pl-12 text-slate-100 text-xs md:text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all placeholder-slate-600"
                />
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
              </div>
            </div>
            
            <div className="flex items-center justify-end">
              <a href="#" className="text-xs font-bold text-cyan-400 hover:underline">비밀번호를 잊으셨나요?</a>
            </div>
          </div>

          <button 
            type="submit"
            disabled={loading}
            className="w-full py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-black rounded-2xl shadow-xl shadow-blue-600/10 hover:opacity-95 transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed text-xs md:text-sm"
          >
            {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <LogIn className="w-4 h-4" />}
            {loading ? '로그인 중...' : '로그인'}
          </button>

          <p className="text-center text-xs md:text-sm text-slate-400">
            계정이 없으신가요? {' '}
            <Link to="/signup" className="text-cyan-400 font-bold hover:underline">회원가입</Link>
          </p>
        </form>
      </motion.div>
    </div>
  );
}
