import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Calculator, TrendingUp, HelpCircle, AlertCircle, ShieldCheck, DollarSign, Wallet } from 'lucide-react';

export default function CalculatorTab() {
  const [directMembers, setDirectMembers] = useState(6);
  const [referredAgents, setReferredAgents] = useState(2);
  const [referredAgencies, setReferredAgencies] = useState(1);
  const [isAgencyOwner, setIsAgencyOwner] = useState(false);
  const [agencySales, setAgencySales] = useState(25000000); // default 25,000,000 KRW (25M)

  // Pricing constants (KRW)
  const MEMBERSHIP_FEE = 500000;
  const COMMISSION_RATE = 0.20; // 20%
  const DIRECT_COMMISSION = MEMBERSHIP_FEE * COMMISSION_RATE; // 100,000 KRW / signup
  const MONTHLY_BASIC_SUPPORT = 1500000; // 1.5M / month
  const MONTHLY_AGENT_REFERRED_SUPPORT = 500000; // 500k / month per agent
  const AGENCY_REFERRAL_PAYOUT = 2500000; // 2.5M per referred agency
  const AGENCY_OVERRIDE_RATE = 0.10; // 10% on agency total sales

  // 3-Month total projections
  const basicSupport3Months = MONTHLY_BASIC_SUPPORT * 3; // 4,500,000 KRW
  const directCommissionEarned = directMembers * DIRECT_COMMISSION;
  const agentReferralBonus3Months = referredAgents * MONTHLY_AGENT_REFERRED_SUPPORT * 3; // 1.5M per agent total
  const agencyReferralEarned = referredAgencies * AGENCY_REFERRAL_PAYOUT;
  const agencyOverrideEarned = isAgencyOwner ? agencySales * AGENCY_OVERRIDE_RATE : 0;

  const totalRevenueSimulated = 
    basicSupport3Months + 
    directCommissionEarned + 
    agentReferralBonus3Months + 
    agencyReferralEarned + 
    agencyOverrideEarned;

  // Investment vs Recovery safety
  const initialCost = 3300000; // 6 memberships * 550,000 KRW (incl VAT) pre-purchase
  const recoveryRate = Math.min(Math.round((totalRevenueSimulated / initialCost) * 100), 2000);

  return (
    <div className="space-y-12">
      {/* Intro and Warning Banner */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="p-8 bg-white border border-slate-100 rounded-[2.5rem] shadow-xl space-y-6"
      >
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-blue-50 border border-blue-100 rounded-xl flex items-center justify-center text-blue-600">
            <Calculator className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-xl md:text-2xl font-black text-slate-900 tracking-tight">수익 & 활동 자금 시뮬레이션 계산기</h3>
            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest block font-sans">Interactive Profitability Simulator</span>
          </div>
        </div>
        <p className="text-slate-500 text-xs md:text-sm leading-relaxed font-semibold">
          마케터 초기가입 시 소속 등급(정규 6구좌 스타트)에 따라 발생하는 본사 전행 활동지원금 및 직접/간접 수익, 대리 및 추천 유치 가중치를 유연하게 배합하여 직접 시뮬레이션해 보세요.
        </p>
      </motion.div>

      {/* Simulator Interface Container (Bento Layout) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Sliders and Controls (7 Cols) */}
        <div className="lg:col-span-7 bg-white p-6 md:p-8 rounded-[2rem] border border-slate-150 space-y-8 shadow-md">
          {/* Slider 1 */}
          <div className="space-y-3">
            <div className="flex justify-between items-end">
              <label className="text-xs md:text-sm font-black text-slate-800 uppercase tracking-tight block">
                🎯 나의 직접 팬클럽 회원 모집 목표
              </label>
              <span className="text-sm font-black text-blue-600">
                {directMembers} 명 <span className="text-[10px] text-slate-400 font-medium">({(directMembers * DIRECT_COMMISSION).toLocaleString()}원 분)</span>
              </span>
            </div>
            <input 
              type="range"
              min="0"
              max="50"
              step="1"
              value={directMembers}
              onChange={(e) => setDirectMembers(Number(e.target.value))}
              className="w-full accent-blue-600 h-2 bg-slate-100 rounded-full appearance-none cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-400 font-black font-sans">
              <span>0명</span>
              <span>10명</span>
              <span>20명</span>
              <span>30명</span>
              <span>40명</span>
              <span>50명 max</span>
            </div>
          </div>

          {/* Slider 2 */}
          <div className="space-y-3">
            <div className="flex justify-between items-end">
              <label className="text-xs md:text-sm font-black text-slate-800 uppercase tracking-tight block">
                👥 동료 영업 마케터 영입 추천수
              </label>
              <span className="text-sm font-black text-indigo-600">
                {referredAgents} 명 <span className="text-[10px] text-slate-400 font-medium">({(referredAgents * MONTHLY_AGENT_REFERRED_SUPPORT * 3 * 10000 / 10000).toLocaleString()}원 분)</span>
              </span>
            </div>
            <input 
              type="range"
              min="0"
              max="15"
              step="1"
              value={referredAgents}
              onChange={(e) => setReferredAgents(Number(e.target.value))}
              className="w-full accent-indigo-600 h-2 bg-slate-100 rounded-full appearance-none cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-400 font-black font-sans">
              <span>0명</span>
              <span>3명</span>
              <span>6명</span>
              <span>9명</span>
              <span>12명</span>
              <span>15명 max</span>
            </div>
            <p className="text-[10px] text-indigo-500 font-bold leading-none">
              * 영입 추천 완료된 동료 활동 시 사원당 월 50만원씩 3개월 분 (총 150만원 상당) 추가 귀속
            </p>
          </div>

          {/* Slider 3 */}
          <div className="space-y-3">
            <div className="flex justify-between items-end">
              <label className="text-xs md:text-sm font-black text-slate-800 uppercase tracking-tight block">
                🏢 산하 신규 지역 파트너 라운지 개척/유치 수
              </label>
              <span className="text-sm font-black text-amber-500">
                {referredAgencies} 개 파트너 라운지 <span className="text-[10px] text-slate-400 font-medium">({(referredAgencies * AGENCY_REFERRAL_PAYOUT).toLocaleString()}원 분)</span>
              </span>
            </div>
            <input 
              type="range"
              min="0"
              max="5"
              step="1"
              value={referredAgencies}
              onChange={(e) => setReferredAgencies(Number(e.target.value))}
              className="w-full accent-amber-500 h-2 bg-slate-100 rounded-full appearance-none cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-400 font-black font-sans">
              <span>0개</span>
              <span>1개</span>
              <span>2개</span>
              <span>3개</span>
              <span>4개</span>
              <span>5개 max</span>
            </div>
          </div>

          {/* Toggle 4 (Agency Owner Option) */}
          <div className="h-px bg-slate-100" />
          
          <div className="p-5 rounded-2xl bg-slate-50 border border-slate-100 space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <span className="text-xs font-black text-slate-800 block">🏢 본인 지역 파트너 라운지 별도 운영 여부</span>
                <span className="text-[10px] text-slate-400 font-bold block leading-relaxed">라운지 권한 획득 시 산하 마케터 총 매출의 추가 10% 지급</span>
              </div>
              <input 
                type="checkbox"
                checked={isAgencyOwner}
                onChange={(e) => setIsAgencyOwner(e.target.checked)}
                className="w-5 h-5 accent-blue-600 rounded border-slate-300 cursor-pointer"
              />
            </div>

            {isAgencyOwner && (
              <motion.div 
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                className="space-y-3 pt-3 border-t border-slate-200"
              >
                <div className="flex justify-between items-end">
                  <label className="text-[11px] font-black text-slate-600 uppercase tracking-wider block">
                    📈 파트너 라운지 관할 소속 마케터 분 연쇄 총매출 목표 (3개월 분)
                  </label>
                  <span className="text-xs font-black text-emerald-600 font-mono">
                    {agencySales.toLocaleString()} 원 <span className="text-[10px] text-slate-400 font-bold">({(agencySales * AGENCY_OVERRIDE_RATE).toLocaleString()}원 분)</span>
                  </span>
                </div>
                <input 
                  type="range"
                  min="0"
                  max="100000000"
                  step="5000000"
                  value={agencySales}
                  onChange={(e) => setAgencySales(Number(e.target.value))}
                  className="w-full accent-emerald-600 h-2 bg-slate-200 rounded-full appearance-none cursor-pointer"
                />
                <div className="flex justify-between text-[9px] text-slate-400 font-black font-mono">
                  <span>0원</span>
                  <span>2.5천만</span>
                  <span>5천만</span>
                  <span>7.5천만</span>
                  <span>1억 max</span>
                </div>
              </motion.div>
            )}
          </div>
        </div>

        {/* Breakdown Panel Output (5 Cols) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-gradient-to-b from-slate-900 to-slate-950 p-6 md:p-8 rounded-[2rem] text-white shadow-2xl relative overflow-hidden space-y-6 border border-slate-800">
            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-bl-full pointer-events-none" />
            
            <div className="space-y-1">
              <span className="text-[10px] font-black text-blue-400 tracking-wider block uppercase">Total Simulated Earnings</span>
              <h4 className="text-sm font-black text-slate-300">나의 3개월 누적 예상 최저 및 수수료</h4>
              <div className="text-3xl md:text-3.5xl font-display font-black tracking-tight text-white pt-2 animate-pulse font-sans">
                ₩ {totalRevenueSimulated.toLocaleString()} <span className="text-xs text-slate-400 font-semibold tracking-normal">원</span>
              </div>
            </div>

            <div className="h-px bg-slate-800" />

            <div className="space-y-3.5 text-xs">
              <div className="flex justify-between font-medium items-center">
                <span className="text-slate-400 flex items-center gap-1">
                  <span>① 💵</span>
                  <span className="hidden sm:inline">본사 기본 고정 활동지원금</span>
                  <span className="sm:hidden text-[11px]">기본 지원금</span>
                </span>
                <span className="font-mono text-slate-200">{basicSupport3Months.toLocaleString()}원</span>
              </div>
              <div className="flex justify-between font-medium items-center">
                <span className="text-slate-400 flex items-center gap-1">
                  <span>② 🎟️</span>
                  <span className="hidden sm:inline">직접 영입 멤버십 총 수수료</span>
                  <span className="sm:hidden text-[11px]">직접 수수료</span>
                </span>
                <span className="font-mono text-blue-400 font-extrabold">{directCommissionEarned.toLocaleString()}원</span>
              </div>
              <div className="flex justify-between font-medium items-center">
                <span className="text-slate-400 flex items-center gap-1">
                  <span>③ 🤝</span>
                  <span className="hidden sm:inline">동료 영입 활동 매칭 수당</span>
                  <span className="sm:hidden text-[11px]">매칭 수당</span>
                </span>
                <span className="font-mono text-indigo-400 font-extrabold">{agentReferralBonus3Months.toLocaleString()}원</span>
              </div>
              <div className="flex justify-between font-medium items-center">
                <span className="text-slate-400 flex items-center gap-1">
                  <span>④ 🏢</span>
                  <span className="hidden sm:inline">파트너 라운지 연쇄 개척 일회성 포상</span>
                  <span className="sm:hidden text-[11px]">라운지 유치</span>
                </span>
                <span className="font-mono text-amber-400 font-extrabold">{agencyReferralEarned.toLocaleString()}원</span>
              </div>
              {isAgencyOwner && (
                <div className="flex justify-between font-medium items-center">
                  <span className="text-slate-400 flex items-center gap-1">
                    <span>⑤ 📈</span>
                    <span className="hidden sm:inline">파트너 라운지 승급 10% 오버라이딩</span>
                    <span className="sm:hidden text-[11px]">관할 오버라이딩</span>
                  </span>
                  <span className="font-mono text-emerald-400 font-extrabold">{agencyOverrideEarned.toLocaleString()}원</span>
                </div>
              )}
            </div>

            <div className="p-4 rounded-xl bg-white/5 border border-white/10 space-y-2">
              <div className="flex justify-between items-center text-xs font-bold text-slate-300">
                <span>초기 투자 6구좌 비용 대비 회수율</span>
                <span className="text-amber-300 font-black font-sans">{recoveryRate}%</span>
              </div>
              <div className="w-full bg-white/10 rounded-full h-2 overflow-hidden">
                <div 
                  className="bg-gradient-to-r from-blue-500 to-amber-500 h-2 rounded-full transition-all duration-500" 
                  style={{ width: `${Math.min(recoveryRate, 100)}%` }}
                />
              </div>
              <span className="text-[9px] text-slate-400 block">* 초기구좌 선구매 3,300,000원 기준 완충 회수 분석치</span>
            </div>
          </div>

          {/* Safe Profit Assurance */}
          <div className="p-6 bg-blue-50/40 rounded-2xl border border-blue-100 flex gap-3 items-start shadow-sm">
            <ShieldCheck className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
            <div className="space-y-1">
              <h5 className="text-xs font-black text-blue-800">리스크 프리 멤버십 영업의 확증성</h5>
              <p className="text-[10px] text-slate-500 leading-relaxed font-semibold">
                본 정산 분석 시뮬레이터는 회사 내규 및 포스터에 기입된 사실에 명확히 입각하여 가동됩니다. 기본 고정 활동 수혜금 450만원 배수만으로도 가입 초기투자비를 완벽히 상쇄하고 흑자 정착을 지원합니다.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
