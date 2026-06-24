import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Link } from 'react-router-dom';
import { ArrowLeft, BookOpen, Network, Users, Calculator, Sparkles, Send, CheckCircle2 } from 'lucide-react';
import PlanTab from './PlanTab';
import OrganizationTab from './OrganizationTab';
import RecruitTab from './RecruitTab';
import CalculatorTab from './CalculatorTab';

type TabType = 'plan' | 'org' | 'recruit' | 'calc';

export default function AuroraHub() {
  const [activeTab, setActiveTab] = useState<TabType>('plan');
  const [showApplyModal, setShowApplyModal] = useState(false);
  const [applyName, setApplyName] = useState('');
  const [applyPhone, setApplyPhone] = useState('');
  const [applyMemo, setApplyMemo] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const tabs = [
    { id: 'plan' as TabType, label: '영업 계획서', emoji: '📄', component: <PlanTab /> },
    { id: 'org' as TabType, label: '조직 운영 제안서', emoji: '🏢', component: <OrganizationTab /> },
    { id: 'recruit' as TabType, label: '크리에이터 대모집', emoji: '📣', component: <RecruitTab /> },
    { id: 'calc' as TabType, label: '수익 시뮬레이터', emoji: '🧮', component: <CalculatorTab /> }
  ];

  const handleApplySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!applyName || !applyPhone) return;
    setSubmitted(true);
    setTimeout(() => {
      setShowApplyModal(false);
      setSubmitted(false);
      setApplyName('');
      setApplyPhone('');
      setApplyMemo('');
    }, 2500);
  };

  return (
    <div className="min-h-screen pt-28 md:pt-32 pb-24 bg-white text-slate-800 relative overflow-hidden">
      {/* Decorative backdrop blobs (very subtle, high-key eyesafe) */}
      <div className="absolute top-12 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-gradient-to-r from-blue-50/50 to-indigo-50/30 rounded-full blur-[140px] pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-4 md:px-10 space-y-8 md:space-y-10 relative z-10">
        
        {/* Navigation Breadcrumb & Backbutton */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-5 border-b border-slate-100 pb-6">
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <Link to="/mypage" className="p-2 md:p-2.5 bg-slate-50 border border-slate-200 hover:bg-slate-100 transition-colors rounded-full text-slate-500 shadow-sm">
                <ArrowLeft className="w-4 h-4" />
              </Link>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-gradient-to-r from-blue-50 to-indigo-50 text-blue-600 rounded-full text-[10px] font-black uppercase tracking-wider">
                <Sparkles className="w-3 h-3 text-blue-500 animate-pulse" />
                <span className="hidden sm:inline">Aurora Sales Rep Workspace</span>
                <span className="sm:hidden">AURORA Rep 🌟</span>
              </div>
            </div>
            
            <h1 className="text-2.5xl md:text-4.5xl font-black text-slate-900 tracking-tight leading-tight pt-1">
              팬덤 오로라 전문 영업 지원 센터
            </h1>
            <p className="text-slate-400 text-xs md:text-sm font-semibold">
              영업 파트너 분들의 압도적 실적과 안전한 성장을 위한 계획서 및 지원 툴킷 모음입니다.
            </p>
          </div>

          <button
            onClick={() => setShowApplyModal(true)}
            className="px-5 py-3.5 md:px-6 md:py-4 bg-gradient-to-r from-blue-600 via-indigo-600 to-slate-900 text-white text-xs font-black rounded-2xl shadow-xl hover:shadow-2xl hover:scale-[1.01] active:scale-[0.99] transition-all whitespace-nowrap"
          >
            🚀 지금 영업 조직원 신청하기
          </button>
        </div>

        {/* Tab Selection Header (Glassmorphic Container with 3D shadow) */}
        <div className="bg-slate-50/75 backdrop-blur-md p-1.5 md:p-2 rounded-2xl md:rounded-2.5xl border border-slate-200/60 shadow-[0_4px_30px_rgba(0,0,0,0.02)] flex flex-wrap md:flex-nowrap gap-1.5 md:gap-2">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-1 min-w-[70px] md:min-w-[140px] py-2.5 md:py-4 rounded-xl text-xs font-extrabold tracking-tight transition-all text-center select-none ${
                  isActive
                    ? 'bg-white text-blue-600 shadow-md md:shadow-lg shadow-slate-200/50 border border-slate-200 font-black'
                    : 'text-slate-500 hover:bg-white/40 hover:text-slate-800'
                }`}
              >
                <div className="flex flex-col md:flex-row items-center justify-center gap-1">
                  <span className="text-xl md:text-sm">{tab.emoji}</span>
                  <span className="hidden md:inline">{tab.label}</span>
                  {/* For mobile, display emoticon-heavy representation as requested */}
                  <span className="md:hidden text-[9px] block whitespace-nowrap mt-0.5 opacity-90">
                    {tab.id === 'plan' ? '계획서' : tab.id === 'org' ? '조직' : tab.id === 'recruit' ? '모집' : '수익계산'}
                  </span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Tab Screen Content */}
        <div className="pt-4">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              {tabs.find((t) => t.id === activeTab)?.component}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Apply modal */}
      {showApplyModal && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-5 animate-fade-in">
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="w-full max-w-lg bg-white rounded-[2.5rem] p-8 border border-slate-100 shadow-2xl relative space-y-6"
          >
            <div className="space-y-1">
              <span className="text-[10px] font-black text-blue-600 tracking-wider block uppercase">Join the Team</span>
              <h3 className="text-xl md:text-2xl font-black text-slate-900 tracking-tight">전문 크리에이터 및 지역 파트너 라운지 개설 상담 신청</h3>
              <p className="text-slate-400 text-xs font-semibold leading-relaxed">
                정보를 입력하시면 담당 지역 지사장이 24시간 이내 휴대폰으로 직접 유선 연락을 드립니다.
              </p>
            </div>

            {submitted ? (
              <div className="py-10 text-center space-y-3 animate-pulse">
                <div className="w-16 h-16 bg-blue-50 border border-blue-100 rounded-2xl flex items-center justify-center mx-auto text-blue-600">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <h4 className="font-black text-slate-800 text-lg">상담 신청 접수 완료!</h4>
                <p className="text-slate-500 text-xs font-semibold px-4 leading-relaxed">
                  본사의 위변조 검증과 지역 배분이 시작됩니다. 신속히 연락을 드리겠습니다.
                </p>
              </div>
            ) : (
              <form onSubmit={handleApplySubmit} className="space-y-5">
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest block font-sans">성함 및 담당 닉네임</label>
                  <input
                    type="text"
                    required
                    value={applyName}
                    onChange={(e) => setApplyName(e.target.value)}
                    placeholder="예: 홍길동 (신지러버)"
                    className="w-full bg-slate-50/50 focus:bg-white border border-slate-100 focus:border-blue-500 rounded-xl px-4 py-3 text-xs font-bold text-slate-800 focus:outline-none transition-colors"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest block font-sans">수령 가능한 모바일 연락처</label>
                  <input
                    type="text"
                    required
                    value={applyPhone}
                    onChange={(e) => setApplyPhone(e.target.value)}
                    placeholder="예: 010-1234-5678"
                    className="w-full bg-slate-50/50 focus:bg-white border border-slate-100 focus:border-blue-500 rounded-xl px-4 py-3 text-xs font-bold text-slate-800 focus:outline-none transition-colors"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest block font-sans">남기실 질문 또는 주요 활동지역 예시</label>
                  <textarea
                    value={applyMemo}
                    onChange={(e) => setApplyMemo(e.target.value)}
                    placeholder="예: 서울 강남 지역 파트너 라운지 개설 유무 또는 광주 권역 프리랜서 활동을 희망합니다."
                    rows={3}
                    className="w-full bg-slate-50/50 focus:bg-white border border-slate-100 focus:border-blue-500 rounded-xl px-4 py-3 text-xs font-bold text-slate-800 focus:outline-none transition-colors resize-none leading-relaxed"
                  />
                </div>

                <div className="pt-2 flex gap-3">
                  <button
                    type="button"
                    onClick={() => setShowApplyModal(false)}
                    className="flex-1 py-4 bg-slate-100 text-slate-600 hover:bg-slate-200 transition-all font-black text-xs rounded-xl"
                  >
                    닫기
                  </button>
                  <button
                    type="submit"
                    className="flex-1 py-4 bg-blue-600 hover:bg-blue-700 text-white transition-all shadow-lg font-black text-xs rounded-xl flex items-center justify-center gap-1.5"
                  >
                    <Send className="w-3.5 h-3.5" /> 신청 등록
                  </button>
                </div>
              </form>
            )}
          </motion.div>
        </div>
      )}
    </div>
  );
}
