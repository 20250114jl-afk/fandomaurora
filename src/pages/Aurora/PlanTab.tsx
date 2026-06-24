import React from 'react';
import { motion } from 'motion/react';
import { Sparkles, Gift, Star, Award, MapPin, Calendar, Compass, ShieldCheck, Heart, ArrowUpRight } from 'lucide-react';

export default function PlanTab() {
  const products = [
    {
      title: "① 2026 한정판 팬덤 프리패스 카드",
      subtitle: "스마트 온라인 사전 연동 완료",
      highlights: [
        "회원 직접 선택 아티스트 디자인",
        "아티스트 친필 사인 고해상도 각인",
        "2026 한정판 피지컬 소장용 카드",
        "회원 고유번호 및 팬덤 오로라 인증"
      ],
      comment: "회원 가입 완료 후 15일 ~ 30일 이내에 등기 수령",
      icon: <Award className="w-5 h-5 text-blue-600 animate-pulse" />
    },
    {
      title: "② 오로라 아티스트 기념 순금화",
      subtitle: "고품격 실물 서장 가치 제공",
      highlights: [
        "선택 아티스트 초상 레이저 정밀 세공",
        "2026 한정판 일련번호 레이저 각인",
        "아티스트 영문 기념 싸인 디자인",
        "팬덤 보관용 최고급 아크릴 케이스 케어"
      ],
      comment: "회원 가입 완료 시 즉각적인 자택 무상 배송 기회 제공",
      icon: <Gift className="w-5 h-5 text-amber-500" />
    }
  ];

  const events = [
    {
      stage: "1차 특별 행사",
      title: "VIP 스카이라운지 오션 뷰 팬미팅",
      location: "속초 더블루테라 호텔 28층 스카이라운지 (카페 더 테라)",
      price: "250,000원 상당",
      services: [
        "호텔 1박 고급 숙박권 기본 무상 지원 (2인 1실 기준)",
        "28층 스카이 뷰 오션 특별 케이터링 정찬 및 만찬 제공",
        "아티스트 스페셜 명품 라이브 단독 콘서트",
        "1:1 프라이빗 팬과의 깊은 대화 및 소통 프로그램",
        "바다 전망 포토타임 & 미러링 단체 단독 사인회"
      ],
      theme: "border-blue-200 bg-blue-50/20"
    },
    {
      stage: "2차 특별 행사",
      title: "썸머 익스클루시브 웨이브 풀파티",
      location: "웨이브파크 [현지 사정에 의해 최적지 변동 가능]",
      price: "180,000원 상당",
      services: [
        "풀사이드 오로라 팬덤 전용 VIP석 사전 배정",
        "시원한 분위기 속 여름 아티스트 스페셜 라이브 뮤직",
        "아티스트와 마주 보며 즐기는 유쾌한 미니 게임 및 예능 토크",
        "물놀이 특화 한정 썸머 스페셜 팬 기프트 지급"
      ],
      theme: "border-sky-200 bg-sky-50/20"
    },
    {
      stage: "3차 특별 행사",
      title: "럭셔리 2박 3일 크루즈 스타 팬투어",
      location: "동해 출발 - 일본 경유 크루즈 대형 연안 여객선",
      price: "800,000원 상당",
      services: [
        "크루즈 2박 3일 선실 및 전 일정 특선 식사/바베큐 풀 코스 제공",
        "회원 단독 크루즈 대극장 오리엔탈 스페셜 콘서트",
        "일출을 바라보며 연출하는 아티스트와의 단독 추억 메이킹",
        "여행상품 50% 할인권 환율 가치 즉시 지원 (여권/비자/유주세 별도)"
      ],
      theme: "border-emerald-200 bg-emerald-50/20"
    },
    {
      stage: "4차 특별 행사",
      title: "2026 오로라 라스크 앙코르 패밀리 콘서트",
      location: "서울 올림픽공원 내 단독 대관 극장",
      price: "150,000원 상당",
      services: [
        "스테이지 가장 가까운 최고 프리미엄 VIP 석 단독 지정",
        "피날레 콘서트 한정 스페셜 감사 기프트 세트 제공",
        "콘서트 미공개 백스테이지 아티스트 비하인드 독점 투어"
      ],
      theme: "border-indigo-200 bg-indigo-50/20"
    }
  ];

  return (
    <div className="space-y-12">
      {/* Overview Block */}
      <motion.div 
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="p-8 md:p-10 bg-white rounded-[2.5rem] border border-slate-100 shadow-xl shadow-slate-200/40 relative overflow-hidden"
      >
        <div className="absolute top-0 right-0 w-48 h-48 bg-gradient-to-br from-blue-100/50 to-indigo-100/30 rounded-bl-full pointer-events-none" />
        
        <div className="max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-1 bg-blue-50 text-blue-600 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider">
            PRODUCT PLAN OVERVIEW
          </div>
          <h2 className="text-2xl md:text-3.5xl font-black text-slate-900 tracking-tight">
            팬덤 오로라(Fandom Aurora) 2026 한정판 멤버십
          </h2>
          <p className="text-slate-500 text-sm md:text-base leading-relaxed font-semibold">
            팬과 아티스트가 단순히 먼 발치에서 바라보는 관람 관계를 과감히 넘어섭니다. 생생한 특별 추억을 함께 건설하고 교감하며, 상생과 평생 소장의 기쁨을 공유하는 프리미엄 체험형 팬덤 비즈니스를 대한민국에 첫 선보입니다.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4">
            <div className="p-4 rounded-2xl bg-slate-50/80 border border-slate-100">
              <span className="text-[10px] font-black text-slate-400 block uppercase">정규 멤버십 가격</span>
              <span className="text-lg font-black text-slate-900">500,000원 <span className="text-xs text-slate-400 font-medium">(VAT 별도)</span></span>
            </div>
            <div className="p-4 rounded-2xl bg-slate-50/80 border border-slate-100">
              <span className="text-[10px] font-black text-slate-400 block uppercase">가입 자격 조건</span>
              <span className="text-lg font-black text-blue-600">제한 없음 <span className="text-xs text-slate-400 font-medium">(스타 팬 누구나)</span></span>
            </div>
            <div className="p-4 rounded-2xl bg-slate-50/80 border border-slate-100">
              <span className="text-[10px] font-black text-slate-400 block uppercase">시범 연도 운영 기간</span>
              <span className="text-lg font-black text-amber-600">2026 년 한정판</span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Provided Products */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {products.map((p, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            whileHover={{ y: -4 }}
            className="p-8 bg-white border border-slate-150 rounded-[2rem] shadow-lg hover:shadow-2xl hover:border-slate-300 transition-all space-y-6 flex flex-col justify-between"
          >
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center border border-slate-100 shadow-inner">
                  {p.icon}
                </div>
                <div>
                  <h3 className="text-lg font-black text-slate-800 tracking-tight">{p.title}</h3>
                  <span className="text-[10px] text-slate-400 font-black tracking-wide uppercase block">{p.subtitle}</span>
                </div>
              </div>
              <div className="h-px bg-slate-100" />
              <ul className="space-y-3">
                {p.highlights.map((h, hIdx) => (
                  <li key={hIdx} className="flex items-center gap-2 text-xs font-bold text-slate-600">
                    <Star className="w-3.5 h-3.5 text-yellow-400 fill-yellow-400 shrink-0" />
                    <span>{h}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="pt-4 mt-4 border-t border-slate-100">
              <span className="text-[10px] text-blue-600 bg-blue-50/50 px-2.5 py-1 rounded-md font-black border border-blue-100 block text-center">
                ⚙️ {p.comment}
              </span>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Premium Exclusive Events */}
      <div className="space-y-6">
        <div className="text-center space-y-1">
          <span className="text-[10px] font-black text-blue-600 tracking-widest uppercase">Premium Membership Season Schedule</span>
          <h3 className="text-xl md:text-2xl font-black text-slate-900 tracking-tight">연간 총 4회 제공 아티스트 오프라인 투어 서비스</h3>
          <p className="text-slate-400 text-xs font-semibold">각 시즌별로 최고의 테마와 가치 가중 설계가 적용된 오로라 독점 만찬회</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {events.map((ev, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.01 }}
              className={`p-6 rounded-[2rem] border shadow-md flex flex-col justify-between gap-5 transition-all ${ev.theme}`}
            >
              <div className="space-y-4">
                <div className="flex justify-between items-start gap-2">
                  <div className="space-y-0.5">
                    <span className="text-[10px] font-black text-blue-600 tracking-widest uppercase block">{ev.stage}</span>
                    <h4 className="font-black text-slate-800 text-base leading-tight">{ev.title}</h4>
                  </div>
                  <span className="text-[10px] font-black text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full whitespace-nowrap">
                    {ev.price}
                  </span>
                </div>
                
                <div className="flex items-center gap-1.5 text-xs text-slate-500 font-bold bg-white/70 py-1.5 px-3 rounded-xl border border-slate-100">
                  <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                  <span className="truncate">{ev.location}</span>
                </div>

                <div className="space-y-2 pt-2">
                  {ev.services.map((srv, sIdx) => (
                    <div key={sIdx} className="flex items-start gap-2 text-xs font-medium text-slate-600">
                      <div className="w-1.5 h-1.5 rounded-full bg-blue-500 shrink-0 mt-1.5" />
                      <span className="leading-tight">{srv}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Attendance Protection Policy */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="p-8 rounded-[2rem] bg-gradient-to-r from-amber-50 via-amber-100/30 to-slate-50 border border-amber-200 shadow-md space-y-4 relative overflow-hidden"
      >
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-amber-500/5 rotate-12 blur-3xl pointer-events-none" />
        <div className="flex items-center gap-3">
          <div className="p-2 bg-amber-500 text-white rounded-xl">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div>
            <h4 className="font-black text-slate-800 text-base">국내 최초, 미참석 자동 보상 제도 (Attendance Compensation)</h4>
            <span className="text-[10px] text-amber-700 font-black uppercase tracking-wider block">Membership Value Safety Net</span>
          </div>
        </div>
        <p className="text-xs text-slate-600 leading-relaxed font-bold">
          회원이 개인 업무 소홀 방지 또는 건강 상의 부득이한 지위 불참으로 시즌 행사에 직접 참석하지 못할 경우에도, 그 가치를 완전하게 환원해 드립니다.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-semibold text-slate-700 pt-2">
          <div className="p-4 bg-white/80 rounded-xl border border-amber-100 flex items-center gap-3">
            <div className="w-2.5 h-2.5 rounded-full bg-amber-500 shrink-0" />
            <span>행사 미참석 시 회당 <strong className="text-slate-900 border-b-2 border-amber-300 pb-0.5">100,000원 상당</strong> 리워드 환급 지원</span>
          </div>
          <div className="p-4 bg-white/80 rounded-xl border border-amber-100 flex items-center gap-3">
            <div className="w-2.5 h-2.5 rounded-full bg-amber-500 shrink-0" />
            <span>또는 미참석 행사 대비 <strong className="text-indigo-600 font-black">한정판 골드 기프트 패키지</strong> 개별 우편 배송 수령</span>
          </div>
        </div>
        <div className="pt-2">
          <span className="text-[10px] font-black text-slate-400">
            * 4회 연말 올 시즌 불참 처리 시, 최대 300,000원 정액 지원 혜택을 전면적으로 보충 보장합니다.
          </span>
        </div>
      </motion.div>

      {/* Cost-Benefit Value Analysis */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="p-8 bg-white border border-slate-150 rounded-[2.5rem] shadow-xl space-y-6"
      >
        <div className="space-y-1">
          <span className="text-[10px] font-black text-blue-600 tracking-widest block uppercase">Economic Benefits Modeling</span>
          <h3 className="text-xl md:text-2xl font-black text-slate-900 tracking-tight">수혜자 중심 혜택 가치 명세표</h3>
          <p className="text-slate-400 text-xs font-bold font-sans">회원 실가입 비 대비 체감하는 오토매틱 실효 혜택 정합 분석</p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-100 text-slate-500 uppercase tracking-wider font-sans">
                <th className="p-4 rounded-l-xl font-black">대항목 구분</th>
                <th className="p-4 font-black">제공 가치 (일반 판매 환산가)</th>
                <th className="p-4 rounded-r-xl font-black">상세 구성 내역 요약</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50 font-bold text-slate-700">
              <tr>
                <td className="p-4 font-black text-slate-900">1차: 오션뷰 팬미팅</td>
                <td className="p-4 text-blue-600">250,000원</td>
                <td className="p-4 text-slate-500">호텔 1박 룸 지원, 정통 케이터링, 대화 소통, 사인회</td>
              </tr>
              <tr>
                <td className="p-4 font-black text-slate-900">2차: 썸머 풀파티</td>
                <td className="p-4 text-blue-600">180,000원</td>
                <td className="p-4 text-slate-500">풀사이드 스페셜 보장석, 워터 한정판 사은품 배포</td>
              </tr>
              <tr>
                <td className="p-4 font-black text-slate-900">3차: 크루즈 일본여행 혜택</td>
                <td className="p-4 text-blue-600">400,000원</td>
                <td className="p-4 text-slate-500">크루즈 전일정 숙식 풀바비큐 패키지 및 50% 지분 지원</td>
              </tr>
              <tr>
                <td className="p-4 font-black text-slate-900">4차: 라스트 콘서트 VIP석</td>
                <td className="p-4 text-blue-600">150,000원</td>
                <td className="p-4 text-slate-500">서울 대극장 최고 근접석, 백스테이지 가이드 패스</td>
              </tr>
              <tr>
                <td className="p-4 font-black text-slate-900">실물: 팬덤 프리패스 가죽 카드</td>
                <td className="p-4 text-blue-600">100,000원</td>
                <td className="p-4 text-slate-500">레이저 커스텀 이니셜 공정, 실물 기프트 세트 보존</td>
              </tr>
              <tr>
                <td className="p-4 font-black text-slate-900">실물: 순금 초상 기념금화</td>
                <td className="p-4 text-blue-600">100,000원</td>
                <td className="p-4 text-slate-500">일련번호 보증, 고급 원목/아크릴 방진 스탠드 마감</td>
              </tr>
              <tr className="bg-blue-50/50">
                <td className="p-4 rounded-l-xl font-black text-blue-800">총 혜택 가치 총량</td>
                <td className="p-4 text-blue-700 text-base font-black">1,180,000원</td>
                <td className="p-4 rounded-r-xl text-blue-700 font-extrabold text-xs">
                  실가입비 약 50만원 대비 누적 2.3배 이상 명백한 수익률 보장
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  );
}
