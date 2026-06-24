import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MessageCircle, X, Send, User, Sparkles } from 'lucide-react';

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [chatHistory, setChatHistory] = useState([
    { role: 'support', text: '안녕하세요! 팬덤 오로라 전담 서포트팀입니다. 코요태 신지 팬카드 혜택에 대해 궁금하신 점이 있으신가요?' }
  ]);

  const handleSend = () => {
    if (!message.trim()) return;
    
    const newHistory = [...chatHistory, { role: 'user', text: message }];
    setChatHistory(newHistory);
    setMessage('');

    // Mock response
    setTimeout(() => {
      setChatHistory(prev => [...prev, { 
        role: 'support', 
        text: '소중한 문의 감사드립니다. 현재 신지 전담 서포트 매니저가 메시지를 확인하고 있습니다. 대기 중이시라면 잠시만 기다려 주시거나, 상단의 1:1 온라인 팬 가입 양식을 기재해 주시면 보다 완벽한 예약 안내를 직접 받아보실 수 있습니다. ✨' 
      }]);
    }, 1000);
  };

  return (
    <div className="fixed bottom-6 right-6 z-[80] pointer-events-none">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="absolute bottom-20 right-0 w-[calc(100vw-48px)] sm:w-[380px] h-[500px] bg-slate-950 rounded-[2rem] shadow-[0_15px_50px_rgba(0,0,0,0.8),_0_0_25px_rgba(59,130,246,0.2)] border border-blue-500/20 flex flex-col overflow-hidden pointer-events-auto"
          >
            {/* Header with gradient cosmic blue-purple and gold subtitle */}
            <div className="bg-gradient-to-r from-blue-950 via-indigo-950 to-[#0c1428] p-5 border-b border-blue-500/10 text-white flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-blue-500/10 flex items-center justify-center border border-blue-500/20 shadow-md">
                  <User className="w-5 h-5 text-cyan-300" />
                </div>
                <div>
                  <h4 className="font-black text-xs md:text-sm text-white flex items-center gap-1.5">
                    오로라 VIP 전담 서포트
                    <Sparkles className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
                  </h4>
                  <p className="text-[9px] text-[#D4AF37] font-bold tracking-widest uppercase">현재 실시간 상담 가능 🟢</p>
                </div>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="w-8 h-8 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center hover:bg-slate-800 text-slate-400 hover:text-white transition-colors"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Chat Area with dark grid pattern */}
            <div className="flex-1 overflow-y-auto p-5 space-y-4 bg-[#02050c] bg-[radial-gradient(rgba(255,255,255,0.01)_1px,transparent_1px)] [background-size:16px_16px]">
              {chatHistory.map((chat, i) => (
                <div 
                  key={i} 
                  className={`flex ${chat.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`max-w-[85%] px-4 py-3 rounded-2xl text-xs md:text-sm leading-relaxed ${
                    chat.role === 'user' 
                      ? 'bg-blue-600 text-white rounded-tr-none shadow-[0_0_15px_rgba(59,130,246,0.25)] border border-blue-500/30' 
                      : 'bg-slate-900 text-slate-200 rounded-tl-none border border-slate-800 shadow-md'
                  }`}>
                    {chat.text}
                  </div>
                </div>
              ))}
            </div>

            {/* Input Form with sleek dark borders */}
            <div className="p-4 bg-slate-950 border-t border-slate-900">
              <div className="flex gap-2 p-1.5 bg-slate-900 rounded-xl border border-slate-850">
                <input 
                  type="text" 
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                  placeholder="메시지를 입력하세요..."
                  className="flex-1 bg-transparent px-3 py-1.5 text-xs focus:outline-none text-slate-100 placeholder-slate-500"
                />
                <button 
                  onClick={handleSend}
                  className="w-10 h-10 rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 flex items-center justify-center text-white shadow-lg shadow-blue-600/10 active:scale-95 transition-all shrink-0"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Sparkle Button */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="pointer-events-auto w-14 h-14 rounded-full bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 flex items-center justify-center text-white shadow-[0_0_20px_rgba(99,102,241,0.5)] hover:scale-110 active:scale-95 transition-transform group relative border border-white/10"
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div key="close" initial={{ opacity: 0, rotate: -45 }} animate={{ opacity: 1, rotate: 0 }} exit={{ opacity: 0, rotate: 45 }}>
              <X className="w-6 h-6" />
            </motion.div>
          ) : (
            <motion.div key="chat" initial={{ opacity: 0, rotate: 45 }} animate={{ opacity: 1, rotate: 0 }} exit={{ opacity: 0, rotate: -45 }}>
              <MessageCircle className="w-6 h-6" />
            </motion.div>
          )}
        </AnimatePresence>
        
        {/* Notification Dot with golden pulse ring */}
        {!isOpen && (
          <div className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-red-500 border-2 border-slate-950 rounded-full animate-bounce flex items-center justify-center text-[8px] font-black">
            1
          </div>
        )}
      </button>
    </div>
  );
}
