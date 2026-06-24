import React from 'react';
import { motion } from 'motion/react';
import { Users, ShieldAlert, Sparkles, AlertCircle, Play, Laptop, HelpCircle, CheckCircle } from 'lucide-react';

export default function RecruitTab() {
  const fields = [
    { title: "지원 자격", content: "성별/연령 불문 남녀노소 누구나 가능 (가사 주부, 대학생, 프리랜서, 주중 투잡 가능)" },
    { title: "선호 요건", content: "동종 스타 팬덤 활동 경험 및 대리영업 수습에 흥미가 있으며, 인플루언서 마케팅이 친근한 분 적극 우대" },
    { title: "교육 보장", content: "스타 영업 초보자도 안심할 수 있는 기초 본사 동행 멘토링 및 세무/정합성 트레이닝 무료 지원" }
  ];

  const tasks = [
    { title: "✅ 멤버십 오너 가입 촉진", desc: "코요태 신지 등 대표 아티스트의 특별 2026 패키지 가치를 주변에 소개하고 회원 영입" },
    { title: "✅ 연관 라이프 홍보 마케팅", desc: "오 OCEAN 뷰 팬미팅, 크루즈 소장 투어, 풀파티 등의 희귀 혜택 명세 전달" },
    { title: "✅ 소셜 SNS 마이 채널 채널링", desc: "유튜브 Shorts, 틱톡, 인스타그램 릴스를 적극 수시 연계 배포 및 바이럴 전파" },
    { title: "✅ 지사/지역 파트너 라운지 네트워크 관리", desc: "지역별 팬 오프 모임 활성화 지원 및 피드백 본사 유연 소통 전달책 역할" }
  ];

  return (
    <div className="space-y-12">
      {/* Visual Digital Poster Mockup */}
      <motion.div
        initial={{ opacity: 0, scale: 0.99 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        className="max-w-4xl mx-auto rounded-[3rem] bg-gradient-to-b from-blue-50 to-white border-2 border-blue-600/10 p-8 md:p-12 shadow-2xl relative overflow-hidden text-center space-y-8"
      >
        <div className="absolute top-0 left-0 w-32 h-32 bg-blue-500/5 rounded-br-full blur-xl pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-32 h-32 bg-indigo-500/5 rounded-tl-full blur-xl pointer-events-none" />

        {/* Hero Banner header inside poster */}
        <div className="space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-blue-600 text-white rounded-full text-[10px] font-black uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 animate-spin" />
            <span>FANDOM AURORA PROFESSIONAL MARKETER RECRUIT</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-black text-slate-900 tracking-tighter leading-none">
            팬덤 오로라 전문 크리에이터 대모집
          </h2>
          <p className="text-slate-500 text-xs md:text-sm font-semibold max-w-xl mx-auto leading-relaxed">
            K-POP, 트로트, 추억의 영원한 스타들과 팬덤을 잇는 국내 유일의 혁신 모델! 좋아하는 스타와 함께 투어하며 유정의 가치도 쌓고, 압도적인 업계 최고 수당도 벌 찬스입니다!
          </p>
        </div>

        {/* Subsidies block inside poster */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto pt-4">
          <div className="p-6 bg-white rounded-2xl border border-blue-200/60 shadow-md space-y-2 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-16 h-16 bg-blue-50 rounded-bl-full pointer-events-none" />
            <span className="text-[10px] font-black text-blue-600 uppercase tracking-widest block text-left">GUARANTEED SUBSIDY</span>
            <span className="text-3xl font-black text-slate-800 tracking-tight block text-left pt-1">
              월 150만 원 <span className="text-xs text-slate-400 font-semibold tracking-normal">(3개월 연속 고정)</span>
            </span>
            <p className="text-xs text-slate-500 text-left leading-relaxed font-medium">
              본사에서 안정적인 정착을 위한 마케터 활동비 총 <strong className="text-blue-600">450만원</strong>를 완전 고정 배정 보증해 드립니다.
            </p>
          </div>

          <div className="p-6 bg-white rounded-2xl border border-emerald-200 shadow-md space-y-2 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-16 h-16 bg-emerald-50 rounded-bl-full pointer-events-none" />
            <span className="text-[10px] font-black text-emerald-600 uppercase tracking-widest block text-left">DIRECT SALES SHARE</span>
            <span className="text-3xl font-black text-emerald-600 tracking-tight block text-left pt-1">
              판매가의 20% <span className="text-xs text-slate-400 font-semibold tracking-normal">(크리에이터 한정: 1건당 약 10만 원)</span>
            </span>
            <p className="text-xs text-slate-500 text-left leading-relaxed font-medium">
              <strong className="text-amber-600 text-[11px] block mb-1">※ 멤버십을 6장 구매한 분들에게는 '크리에이터'라는 권위있는 명칭이 주어지며, 오직 크리에이터에게만 이 20% 리베이트가 보장됩니다!</strong>
              모집 인원에 비례하여 누수 없이 쏟아지는 업계 최대 수준의 프리미엄 보증 마커스 리베이트 마진을 확보하세요.
            </p>
          </div>
        </div>

        {/* Requirements Lists */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2 text-left max-w-3xl mx-auto">
          {fields.map((f, i) => (
            <div key={i} className="p-5 bg-slate-50 rounded-2xl border border-slate-100 space-y-2 shadow-inner">
              <h4 className="font-extrabold text-slate-800 text-xs uppercase tracking-wider">{f.title}</h4>
              <p className="text-[11px] text-slate-500 font-semibold leading-relaxed">{f.content}</p>
            </div>
          ))}
        </div>

        <div className="h-px bg-slate-100 max-w-3xl mx-auto" />

        {/* Main Activities Panel */}
        <div className="max-w-3xl mx-auto text-left space-y-4">
          <h4 className="font-black text-slate-800 text-base">주요 마케팅 및 활동 성과 영역</h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {tasks.map((t, idx) => (
              <div key={idx} className="p-4 bg-white border border-slate-150 rounded-xl space-y-1 shadow-sm leading-relaxed">
                <span className="font-extrabold text-slate-800 text-xs block">{t.title}</span>
                <span className="text-[10px] text-slate-500 font-medium leading-relaxed block">{t.desc}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Benefits & Safety Net Summary */}
        <div className="p-6 bg-amber-50/50 rounded-3xl border border-amber-200/70 text-left space-y-4 max-w-3xl mx-auto">
          <h4 className="text-sm font-black text-amber-800 uppercase tracking-wider">크리에이터만의 평생 한정판 독점 혜택 리포트</h4>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-semibold text-slate-700">
            {[
              "연예인 팬미팅 및 단독 만찬회 무상 우선 프리패스 기회",
              "시즌 콘서트 VIP 프리미엄 직결 한정 티켓 증정",
              "2박 3일 스타 투어 크루즈 패키지 동반 승선 무상 지원",
              "실적 최우수 마케터 연례 연말 특별 보너스 및 현금 포상",
              "재택 근무 전면 허용 - 원하는 시간과 공간에서 자유로운 비대면 비즈니스 가능"
            ].map((ben, bId) => (
              <div key={bId} className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                <span className="leading-tight text-[11px]">{ben}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Refund Policy (Safety Margin) */}
        <div className="p-5 bg-red-50/20 rounded-2xl border border-red-100 text-left max-w-3xl mx-auto flex gap-3 items-start">
          <AlertCircle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
          <div className="space-y-1">
            <h5 className="text-xs font-black text-red-800 uppercase tracking-wider">마케터 안심 퇴사 보증: 90% 상품 반환 보장 제도</h5>
            <p className="text-[10px] text-slate-500 font-semibold leading-relaxed">
              활동 중 부득이하게 개인적 사유로 은퇴하거나 그만두실 경우, 판매하지 못한 채 소지하고 계신 지분용 제품에 대하여 최초 구매 원가 기준 무려 <strong>90% 전액 현금 반환</strong> 처리를 원스톱 보장해 드립니다. 어떠한 투자 리스크도 일체 성립하지 않습니다.
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
