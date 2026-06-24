import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowDown, CheckCircle2, DollarSign, GitFork, Network, Landmark, Building, Briefcase, Target, ShieldCheck, Activity, TrendingUp, Sparkles, Coins } from 'lucide-react';

interface ActivityItem {
  id: string;
  lounge: string;
  creator: string;
  type: 'referral' | 'creator_upgrade' | 'lounge_open' | 'referral_bonus';
  desc: string;
  time: string;
  amount: string;
}

export default function OrganizationTab() {
  const [selectedBranch, setSelectedBranch] = useState('seoul');

  const [activities, setActivities] = useState<ActivityItem[]>([
    {
      id: 'init-1',
      lounge: '경기 분당 라운지',
      creator: '김*현',
      type: 'creator_upgrade',
      desc: '멤버십 6장 구매 완료! 정식 [크리에이터] 자격 부여 및 승격',
      time: '방금 전',
      amount: '정식 승격 👑'
    },
    {
      id: 'init-2',
      lounge: '서울 강남 라운지',
      creator: '이*민',
      type: 'referral',
      desc: '신규 오로라 특별 패키지 1건 추천 가입 완료 - 20% 정산',
      time: '1분 전',
      amount: '+100,000원 💸'
    },
    {
      id: 'init-3',
      lounge: '부산 해운대 라운지',
      creator: '정*우',
      type: 'referral_bonus',
      desc: '신규 가맹 파트너 라운지 유치 최고 기여! 단독 추천 포상금 정산',
      time: '4분 전',
      amount: '+2,500,000원 💎'
    },
    {
      id: 'init-4',
      lounge: '인천 송도 라운지',
      creator: '박*수',
      type: 'lounge_open',
      desc: '[송도 센트럴 라운지] 정식 가맹 개설 및 웰컴패키지 지원 개시',
      time: '8분 전',
      amount: '신규 개설 🏢'
    },
    {
      id: 'init-5',
      lounge: '광주 상무 라운지',
      creator: '최*혜',
      type: 'referral',
      desc: '신규 멤버십 추천 가입 -> DIRECT SALES SHARE 20% 마진 발생',
      time: '15분 전',
      amount: '+100,000원 💸'
    }
  ]);

  useEffect(() => {
    const locations = ['대구 수성', '울산 남구', '대전 둔산', '수원 영통', '제주 삼도', '천안 신부', '전주 완산', '청주 상당', '창원 의창', '경기 일산'];
    const creators = ['정*헌', '조*호', '임*인', '배*은', '신*진', '황*영', '권*지', '안*우', '오*석', '양*민'];
    const types: ('referral' | 'creator_upgrade' | 'lounge_open' | 'referral_bonus')[] = [
      'referral', 'referral', 'creator_upgrade', 'referral_bonus', 'referral'
    ];
    const descs = {
      referral: '신규 멤버십 추천 및 DIRECT SALES SHARE 20% 가입 즉시 정산',
      creator_upgrade: '멤버십 6장 선구매 완료! 공식 [크리에이터] 마커스 승급 및 20% 수혜 대상 부여',
      lounge_open: '지정 지역 파트너 라운지 신규 오프라인 거점 가맹 개설 등록 완료',
      referral_bonus: '파트너 라운지 개설 유치 성공으로 본사 250만원 특별 보조금 정산 완료'
    };
    const amounts = {
      referral: '+100,000원 💸',
      creator_upgrade: '정식 승격 👑',
      lounge_open: '신규 개설 🏢',
      referral_bonus: '+2,500,000원 💎'
    };

    const interval = setInterval(() => {
      const randomLoc = locations[Math.floor(Math.random() * locations.length)];
      const randomCreator = creators[Math.floor(Math.random() * creators.length)];
      const randomType = types[Math.floor(Math.random() * types.length)];
      
      const newItem: ActivityItem = {
        id: `live-${Date.now()}`,
        lounge: `${randomLoc} 라운지`,
        creator: randomCreator,
        type: randomType,
        desc: descs[randomType],
        time: '방금 전',
        amount: amounts[randomType]
      };

      setActivities(prev => {
        const updated = prev.map((act) => {
          if (!act || !act.time) return act;
          if (act.time === '방금 전') return { ...act, time: '1분 전' };
          if (act.time === '1분 전') return { ...act, time: '5분 전' };
          if (act.time === '4분 전') return { ...act, time: '10분 전' };
          if (act.time === '5분 전') return { ...act, time: '12분 전' };
          if (act.time === '8분 전') return { ...act, time: '18분 전' };
          if (act.time === '15분 전') return { ...act, time: '25분 전' };
          if (typeof act.time === 'string' && act.time.includes('분 전')) {
            const minutes = parseInt(act.time.replace('분 전', ''), 10);
            return { ...act, time: `${isNaN(minutes) ? 30 : minutes + 5}분 전` };
          }
          return act;
        });
        return [newItem, ...updated.slice(0, 5)];
      });
    }, 5500);

    return () => clearInterval(interval);
  }, []);

  const getLoungeTreeNodes = (branchId: string) => {
    switch (branchId) {
      case 'seoul':
        return [
          {
            id: 'seoul-1',
            name: '강남 파트너 라운지',
            leader: '이*민 대표',
            iconLabel: '강남',
            creators: [
              { name: '최*지 크리에이터', performance: '누계 51건 추천', subCreator: { name: '강*수 정회원' } }
            ]
          },
          {
            id: 'seoul-2',
            name: '마포 파트너 라운지',
            leader: '조*호 대표',
            iconLabel: '마포',
            creators: [
              { name: '오*석 크리에이터', performance: '누계 19건 추천', subCreator: null }
            ]
          },
          {
            id: 'seoul-3',
            name: '송파 파트너 라운지',
            leader: '권*지 대표',
            iconLabel: '송파',
            creators: [
              { name: '김*은 크리에이터', performance: '누계 8건 추천', subCreator: null }
            ]
          },
          {
            id: 'seoul-4',
            name: '용산 파트너 라운지',
            leader: '정*우 대표',
            iconLabel: '용산',
            creators: [
              { name: '박*민 크리에이터', performance: '누계 14건 추천', subCreator: null }
            ]
          }
        ];
      case 'gyeonggi':
        return [
          {
            id: 'gyeonggi-1',
            name: '분당 파트너 라운지',
            leader: '김*현 대표',
            iconLabel: '분당',
            creators: [
              { name: '정*헌 크리에이터', performance: '누계 80건 추천', subCreator: { name: '배*은 정회원' } }
            ]
          },
          {
            id: 'gyeonggi-2',
            name: '수원 파트너 라운지',
            leader: '신*진 대표',
            iconLabel: '수원',
            creators: [
              { name: '황*영 크리에이터', performance: '누계 24건 추천', subCreator: { name: '안*우 정회원' } }
            ]
          },
          {
            id: 'gyeonggi-3',
            name: '용인 파트너 라운지',
            leader: '소*민 대표',
            iconLabel: '용인',
            creators: [
              { name: '장*은 크리에이터', performance: '누계 12건 추천', subCreator: null }
            ]
          },
          {
            id: 'gyeonggi-4',
            name: '일산 파트너 라운지',
            leader: '양*민 대표',
            iconLabel: '일산',
            creators: [
              { name: '윤*현 크리에이터', performance: '누계 7건 추천', subCreator: null }
            ]
          }
        ];
      case 'busan':
        return [
          {
            id: 'busan-1',
            name: '해운대 파트너 라운지',
            leader: '이*우 대표',
            iconLabel: '해운',
            creators: [
              { name: '김*진 크리에이터', performance: '누계 60건 추천', subCreator: { name: '하*정 정회원' } }
            ]
          },
          {
            id: 'busan-2',
            name: '수영 파트너 라운지',
            leader: '윤*서 대표',
            iconLabel: '수영',
            creators: [
              { name: '정*석 크리에이터', performance: '누계 31건 추천', subCreator: null }
            ]
          },
          {
            id: 'busan-3',
            name: '센텀 파트너 라운지',
            leader: '한*림 대표',
            iconLabel: '센텀',
            creators: [
              { name: '임*혁 크리에이터', performance: '누계 11건 추천', subCreator: null }
            ]
          },
          {
            id: 'busan-4',
            name: '동래 파트너 라운지',
            leader: '오*택 대표',
            iconLabel: '동래',
            creators: [
              { name: '차*주 크리에이터', performance: '누계 5건 추천', subCreator: null }
            ]
          }
        ];
      case 'honam':
      default:
        return [
          {
            id: 'honam-1',
            name: '상무 파트너 라운지',
            leader: '송*현 대표',
            iconLabel: '상무',
            creators: [
              { name: '지*민 크리에이터', performance: '누계 44건 추천', subCreator: { name: '한*서 정회원' } }
            ]
          },
          {
            id: 'honam-2',
            name: '수완 파트너 라운지',
            leader: '유*호 대표',
            iconLabel: '수완',
            creators: [
              { name: '김*현 크리에이터', performance: '누계 15건 추천', subCreator: null }
            ]
          },
          {
            id: 'honam-3',
            name: '덕진 파트너 라운지',
            leader: '김*도 대표',
            iconLabel: '덕진',
            creators: [
              { name: '김*우 크리에이터', performance: '누계 11건 추천', subCreator: null }
            ]
          },
          {
            id: 'honam-4',
            name: '여수 파트너 라운지',
            leader: '박*정 대표',
            iconLabel: '여수',
            creators: [
              { name: '이*진 크리에이터', performance: '누계 6건 추천', subCreator: null }
            ]
          }
        ];
    }
  };

  const steps = [
    {
      role: "오로라 본사 (HQ)",
      desc: "온라인 대외 마케팅, 방송 콘텐츠 제작, 연예인 매니지먼트, 오프라인 이벤트 운영, 리워드 조달 및 고객 서비스 컨트롤",
      color: "bg-blue-600 text-white shadow-blue-500/10 border-blue-500"
    },
    {
      role: "지사 (17개 연합)",
      desc: "전국 권역별 파트너 라운지 모집 및 관리 교육, 연쇄 실적 관리 감독, 소속 파트너 라운지 통합 서포트",
      color: "bg-indigo-50 border-indigo-200 text-indigo-900"
    },
    {
      role: "지역 파트너 라운지 (400개 목표)",
      desc: "지방 거점 오프라인 상품 홍보 및 팬 소통 라운지 개설, 소속 크리에이터 정례 모집, 지역 마케팅 및 회원 대리 케어",
      color: "bg-slate-50 border-slate-200 text-slate-800"
    },
    {
      role: "전문 영업 크리에이터 (5,000명)",
      desc: "온/오프라인 팬덤 멤버십 회원 밀착 수습, 개인 SNS 광고 및 라이브 방송 연계 활동, VIP 특별 케어",
      color: "bg-amber-50/80 border-amber-200 text-amber-900"
    },
    {
      role: "팬덤 회원 (10만 누적)",
      desc: "한정판 팬클럽 멤버십 혜택을 온전히 수령하고 평생 소장의 유대감을 만끽하는 최종 수혜 오너 군집",
      color: "bg-emerald-50 border-emerald-100 text-emerald-900"
    }
  ];

  const details = [
    {
      category: "지사 운영 제도 (Branch)",
      highlights: [
        "지사 수익: 산하 개설 및 관리 파트너 라운지 총매출의 5% 매월 누적 지급 (산하 라운지 볼륨 성장 시 폭증)",
        "주요 역할: 지역 하부 네트워킹 구축, 영업 마케터 대상 멘토링 프로그램, 정례 실적 정합성 확인"
      ],
      icon: <Landmark className="w-5 h-5 text-indigo-600" />
    },
    {
      category: "지역 파트너 라운지 제도 (Lounge)",
      highlights: [
        "개설 요건: 파트너 라운지 운영 임시 보증금 1,000만원 납입 (본사 100% 안전 보증)",
        "본사 원조: 팬덤 오로라 전용 웰컴 패키지 100개 무상 포진, 오프라인 포스터 및 대형 브로셔 풀 지원",
        "수익 보장: 파트너 라운지 관내에서 발생하는 총매출액의 10% 일괄 평생 누적 정산 (3개월 누적 지속형 지급)"
      ],
      icon: <Building className="w-5 h-5 text-slate-700" />
    },
    {
      category: "전문 영업 크리에이터 제도 (Creator)",
      highlights: [
        "가입 조건: 멤버십 6장을 구매한 분들에게 '크리에이터'라는 최고 영예의 수석 마케터 명칭이 부여됩니다.",
        "활동 지원금 보조: 본사 지원 월 150만원 고정 배수 (총 3개월 연속 무상 보조, 총 450만원의 실탄 지원)",
        "유통 마진 셰어: 오직 크리에이터에게만 DIRECT SALES SHARE 판매가의 20% (1건당 약 10만 원) 가입 추천 마진 즉시 정산",
        "소속 추천 보너스: 크리에이터 간 신규 동행 영입 시, 추천인에게 월 50만원 특별 활동 보조비 3개월간 균등 지급"
      ],
      icon: <Briefcase className="w-5 h-5 text-amber-600" />
    }
  ];

  const compensationMatrix = [
    { trigger: "파트너 라운지 ➔ 신규 라운지 추천 시", receiver: "추천 라운지 본인", amount: "350만 원 일시불 지급", note: "지사에 별도로 50만원 수수료 오버라이드 지원" },
    { trigger: "크리에이터 ➔ 신규 파트너 라운지 유치 시", receiver: "추천 크리에이터 본인", amount: "250만 원 특별 포상", note: "소속 파트너 라운지에 100만원 지원, 지사에 50만원 동시 분배" },
    { trigger: "소속 파트너 라운지 산하 라운지 신규 가맹", receiver: "모(母) 소속 파트너 라운지", amount: "100만 원 보조 포상", note: "네트워크 확장 기여도로 귀속" }
  ];

  return (
    <div className="space-y-12">
      {/* Interactive Branch Organizational Network Tree (추천 영업 네트워크 트리) */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="p-6 md:p-10 bg-white border border-slate-150 rounded-[2.5rem] shadow-xl text-center space-y-8 relative overflow-hidden"
      >
        <div className="space-y-1.5 text-left md:text-center">
          <span className="text-[10px] font-black text-indigo-600 tracking-widest uppercase">NATIONWIDE INTERACTIVE ORG CHART</span>
          <h3 className="text-2xl md:text-3xl font-black text-slate-900 tracking-tight">
            오로라 실시간 추천 영업 네트워크 트리
          </h3>
          <p className="text-slate-400 text-xs font-semibold max-w-2xl mx-auto">
            원하는 전국 거점 지사를 선택하면, 지사 산하 오프라인 파트너 라운지 및 수석 크리에이터, 신규 영입 크리에이터로 연결되는 투명한 조직 네트워크가 시각화됩니다.
          </p>
        </div>

        {/* Branch Selector Tabs */}
        <div className="flex flex-wrap justify-center gap-2 max-w-2xl mx-auto p-1.5 bg-slate-50/80 rounded-2xl border border-slate-200/50">
          {[
            { id: 'seoul', name: '서울 연합지사', leader: '박*현 지사장', color: 'border-rose-500' },
            { id: 'gyeonggi', name: '경기남부지사', leader: '임*우 지사장', color: 'border-blue-500' },
            { id: 'busan', name: '부산영남지사', leader: '정*우 지사장', color: 'border-indigo-500' },
            { id: 'honam', name: '호남광주지사', leader: '최*혜 지사장', color: 'border-emerald-500' },
          ].map((branch) => (
            <button
              key={branch.id}
              onClick={() => setSelectedBranch(branch.id)}
              className={`flex-1 min-w-[120px] px-4 py-3 rounded-xl text-xs font-black transition-all duration-300 flex flex-col items-center gap-0.5 ${
                selectedBranch === branch.id
                  ? 'bg-white text-slate-900 shadow-md border border-slate-200/80 scale-102'
                  : 'text-slate-400 hover:text-slate-600 hover:bg-white/40'
              }`}
            >
              <span className="block text-slate-900 font-extrabold">{branch.name}</span>
              <span className="block text-[10px] text-slate-400 font-bold">{branch.leader}</span>
            </button>
          ))}
        </div>

        {/* Tree Render Canvas Viewport with Grid Background */}
        <div className="w-full overflow-x-auto pb-8 rounded-3xl border border-slate-100 bg-[#fbfbfb] bg-[linear-gradient(to_right,#eef2f6_1px,transparent_1px),linear-gradient(to_bottom,#eef2f6_1px,transparent_1px)] bg-[size:24px_24px] relative p-8">
          <div className="min-w-[850px] flex flex-col items-center relative py-4">
            
            {/* LEVEL 1: Root Node (The Selected Branch) */}
            <div className="relative pb-8 flex justify-center w-full">
              <motion.div
                key={`${selectedBranch}-root`}
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                whileHover={{ y: -2 }}
                className="w-64 bg-white border border-slate-205 shadow-md rounded-lg overflow-hidden flex items-center p-3 relative text-left border-t-4 border-t-rose-500"
              >
                <div className="w-11 h-11 rounded-full bg-gradient-to-br from-rose-400 to-red-500 text-white font-black flex items-center justify-center shrink-0 shadow-sm text-xs">
                  HQ
                </div>
                <div className="ml-3 select-none">
                  <h4 className="text-xs font-black text-slate-800 tracking-tight uppercase">
                    {selectedBranch === 'seoul' && 'SEOUL REGION HQ'}
                    {selectedBranch === 'gyeonggi' && 'GYEONGGI BRANCH'}
                    {selectedBranch === 'busan' && 'BUSAN YEONGNAM'}
                    {selectedBranch === 'honam' && 'HONAM GWANGJU'}
                  </h4>
                  <p className="text-[13px] font-extrabold text-slate-900 block mt-0.5">
                    {selectedBranch === 'seoul' && '서울 연합지사'}
                    {selectedBranch === 'gyeonggi' && '경기남부지사'}
                    {selectedBranch === 'busan' && '부산영남지사'}
                    {selectedBranch === 'honam' && '호남광주지사'}
                  </p>
                  <span className="text-[10px] text-slate-500 font-semibold block">
                    {selectedBranch === 'seoul' && '박성현 지사장'}
                    {selectedBranch === 'gyeonggi' && '임정우 지사장'}
                    {selectedBranch === 'busan' && '정정우 지사장'}
                    {selectedBranch === 'honam' && '최은혜 지사장'}
                  </span>
                </div>
              </motion.div>

              {/* Vertical connector line going down from Root Node */}
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0.5 h-8 bg-slate-300" />
            </div>

            {/* LEVEL 2: Horizontal Bar and Child Nodes (Regional Partner Lounges) */}
            <div className="relative w-full">
              {/* Horizontal Connector Line Bridge linking all nodes */}
              <div className="absolute top-0 left-[12.5%] right-[12.5%] h-0.5 bg-slate-300" />

              <div className="grid grid-cols-4 gap-4 pt-6 w-full relative">
                
                {/* BRANCH NODES GENERATOR BASED ON SELECTION */}
                {getLoungeTreeNodes(selectedBranch).map((node, nIdx) => (
                  <div key={node.id} className="flex flex-col items-center relative">
                    {/* Vertical guideline going down from the horizontal bridge to the Node Card */}
                    <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-0.5 h-6 bg-slate-300" />

                    {/* Partner Lounge Node Card */}
                    <motion.div
                      whileHover={{ y: -2 }}
                      className="w-52 bg-white border border-slate-205 shadow-sm rounded-lg overflow-hidden flex items-center p-3 relative text-left border-t-3 border-t-indigo-500"
                    >
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-400 to-blue-500 text-white font-bold flex items-center justify-center shrink-0 shadow-sm text-xs">
                        {node.iconLabel}
                      </div>
                      <div className="ml-2.5">
                        <span className="text-[9px] font-black text-indigo-500 tracking-wider block uppercase">PARTNER LOUNGE</span>
                        <h5 className="text-[12px] font-black text-slate-900 tracking-tight leading-none block pt-0.5">{node.name}</h5>
                        <p className="text-[10px] text-slate-500 font-semibold pt-0.5">{node.leader}</p>
                      </div>
                    </motion.div>

                    {/* Connection indicators for grandchildren (Creators) if present in state */}
                    {node.creators && node.creators.length > 0 && (
                      <React.Fragment>
                        {/* Vertical line going down from the Lounge Node to Level 3 */}
                        <div className="w-0.5 h-10 bg-slate-300" />

                        {/* LEVEL 3 CARD: Chief Creator */}
                        <div className="relative flex flex-col items-center">
                          <motion.div
                            whileHover={{ y: -2 }}
                            className="w-52 bg-white border border-slate-205 shadow-sm rounded-lg overflow-hidden flex items-center p-3 relative text-left border-t-3 border-t-amber-500"
                          >
                            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 text-white font-extrabold flex items-center justify-center shrink-0 shadow-sm text-xs">
                              CR
                            </div>
                            <div className="ml-2.5">
                              <span className="text-[9px] font-black text-amber-600 block uppercase tracking-wider">CHIEF CREATOR</span>
                              <h5 className="text-[12px] font-black text-slate-900 tracking-tight leading-none block pt-0.5">
                                {node.creators[0].name}
                              </h5>
                              <p className="text-[10px] text-slate-500 font-semibold pt-0.5">
                                {node.creators[0].performance}
                              </p>
                            </div>
                          </motion.div>

                          {/* LEVEL 4 CARD: Referred Member Creator under specific chief creators to simulate vertical hierarchy */}
                          {node.creators[0].subCreator && (
                            <React.Fragment>
                              {/* Vertical connector line split to side link */}
                              <div className="w-0.5 h-8 bg-slate-250 border-r border-slate-300" />
                              
                              <motion.div
                                whileHover={{ y: -2 }}
                                className="w-48 bg-white border border-slate-200/90 shadow-xs rounded-lg overflow-hidden flex items-center p-2.5 relative text-left border-t-2 border-t-emerald-500"
                              >
                                <div className="w-9 h-9 rounded-full bg-gradient-to-br from-emerald-400 to-teal-500 text-white font-bold flex items-center justify-center shrink-0 text-xs">
                                  MB
                                </div>
                                <div className="ml-2.5">
                                  <span className="text-[8px] font-black text-emerald-600 block uppercase tracking-widest">REFERRED MEMBER</span>
                                  <h6 className="text-[11px] font-black text-slate-800 leading-none block pt-0.5">
                                    {node.creators[0].subCreator.name}
                                  </h6>
                                  <p className="text-[9px] text-slate-400 font-bold block pt-0.5">공동 추천 가입</p>
                                </div>
                              </motion.div>
                            </React.Fragment>
                          )}
                        </div>
                      </React.Fragment>
                    )}
                  </div>
                ))}

              </div>
            </div>

          </div>
        </div>

        {/* Tree guide legend */}
        <div className="flex flex-wrap justify-center items-center gap-6 text-[11px] font-bold text-slate-500 border-t border-slate-100 pt-6">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 bg-rose-500 rounded-sm" />
            <span>HQ / 전국 거점 지사</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 bg-indigo-500 rounded-sm" />
            <span>오프라인 파트너 라운지</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 bg-amber-500 rounded-sm" />
            <span>정식 수석 '크리에이터'</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 bg-emerald-500 rounded-sm" />
            <span>영입 정회원 / 일반 멤버십</span>
          </div>
        </div>
      </motion.div>

      {/* Visual Hierarchy Tree Flow */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="p-8 md:p-10 bg-white border border-slate-100 rounded-[2.5rem] shadow-xl text-center space-y-8"
      >
        <div className="space-y-1">
          <span className="text-[10px] font-black text-blue-600 tracking-widest uppercase">NATIONWIDE NETWORK FLOW</span>
          <h3 className="text-xl md:text-2xl font-black text-slate-900 tracking-tight">전국 5단계 영업 네트워크 연계 구조</h3>
          <p className="text-slate-400 text-xs font-semibold">각 거점이 상호 보완하고 고정 마일리지를 공유하는 무한 유통 구조체</p>
        </div>

        <div className="flex flex-col items-center gap-4 max-w-4xl mx-auto pt-4 relative">
          {steps.map((st, sIdx) => (
            <React.Fragment key={sIdx}>
              {sIdx > 0 && <ArrowDown className="w-5 h-5 text-slate-300 animate-bounce" />}
              <motion.div
                whileHover={{ scale: 1.01 }}
                className={`w-full p-5 rounded-2xl border text-left flex flex-col md:flex-row md:items-center justify-between gap-4 transition-all shadow-sm ${st.color}`}
              >
                <div className="flex items-center gap-3 shrink-0">
                  <div className="w-8 h-8 rounded-full bg-white/20 border border-slate-200/20 flex items-center justify-center font-black text-xs">
                    0{sIdx + 1}
                  </div>
                  <h4 className="font-extrabold text-sm md:text-base">{st.role}</h4>
                </div>
                <p className="text-xs md:text-sm font-semibold opacity-90 leading-relaxed max-w-2xl text-left md:text-right">
                  {st.desc}
                </p>
              </motion.div>
            </React.Fragment>
          ))}
        </div>
      </motion.div>

      {/* Structural Requirements Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {details.map((dt, dIdx) => (
          <motion.div
            key={dIdx}
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            whileHover={{ y: -3 }}
            className="p-6 bg-white border border-slate-150 rounded-[2rem] shadow-md flex flex-col justify-between"
          >
            <div className="space-y-5">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-slate-50 flex items-center justify-center border border-slate-100 shadow-inner">
                  {dt.icon}
                </div>
                <h4 className="font-black text-slate-800 text-sm md:text-base tracking-tight">{dt.category}</h4>
              </div>
              <div className="h-px bg-slate-100" />
              <div className="space-y-4">
                {dt.highlights.map((hl, hlIdx) => (
                  <div key={hlIdx} className="flex gap-2.5 items-start text-xs text-slate-600 font-semibold leading-relaxed">
                    <CheckCircle2 className="w-4 h-4 text-blue-500 shrink-0 mt-0.5" />
                    <span>{hl}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Referral Rewards Matrix */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="p-8 bg-white border border-slate-150 rounded-[2.5rem] shadow-xl space-y-6"
      >
        <div className="space-y-1">
          <span className="text-[10px] font-black text-amber-600 tracking-widest block uppercase">COMMISSION & OVERRIDE MATRIX</span>
          <h3 className="text-xl md:text-2xl font-black text-slate-900 tracking-tight">수평적 추천 파트너 라운지 개설 파격 보상 체계</h3>
          <p className="text-slate-400 text-xs font-semibold">동료 영입 및 지사 대리 개척 시 누수 없이 실시간 지급되는 직접적인 인센티브 리스트</p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-100 text-slate-500 uppercase tracking-wider font-sans">
                <th className="p-4 rounded-l-xl font-black">추천 발생 트리거</th>
                <th className="p-4 font-black">수혜 정액 대상</th>
                <th className="p-4 font-black text-blue-600">지급 포상 실질 가치</th>
                <th className="p-4 rounded-r-xl font-black">추가 오버라이딩 비고</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50 font-semibold text-slate-600">
              {compensationMatrix.map((cm, idx) => (
                <tr key={idx} className="hover:bg-slate-50/50 transition-colors">
                  <td className="p-4 font-black text-slate-900">{cm.trigger}</td>
                  <td className="p-4">{cm.receiver}</td>
                  <td className="p-4 font-black text-blue-600 text-sm">{cm.amount}</td>
                  <td className="p-4 text-slate-400 text-[11px]">{cm.note}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>

      {/* Real-time Activity Feed for Lounge & Creators */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="p-8 bg-white border border-slate-150 rounded-[2.5rem] shadow-xl space-y-6 relative overflow-hidden"
      >
        <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-50/40 rounded-full blur-2xl pointer-events-none" />
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1 text-left">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 bg-emerald-50 text-emerald-600 rounded-full text-[10px] font-black border border-emerald-100 uppercase tracking-wider animate-pulse">
              <Activity className="w-3.5 h-3.5" />
              <span>실시간 라이브 피드</span>
            </div>
            <h3 className="text-xl font-black text-slate-900 tracking-tight">
              파트너 라운지 & 크리에이터 실시간 활동 피드
            </h3>
            <p className="text-slate-400 text-xs font-semibold">
              전국 파트너 라운지 소속 크리에이터들의 최근 신규 추천 가입 및 수당 지급 현황입니다.
            </p>
          </div>
          
          <div className="bg-slate-50 border border-slate-100 rounded-2xl p-4 flex items-center gap-4 text-left">
            <div className="bg-indigo-50 p-2.5 rounded-xl border border-indigo-100 text-indigo-600">
              <TrendingUp className="w-5 h-5 animate-pulse" />
            </div>
            <div>
              <span className="text-[10px] font-black text-slate-400 block uppercase">크리에이터 총 추천 보상액 (누적)</span>
              <span className="text-base font-black text-indigo-600 font-mono">1,842,400,000 원</span>
            </div>
          </div>
        </div>

        <div className="space-y-3 pt-2">
          <AnimatePresence mode="popLayout">
            {activities.map((act) => {
              let badgeColor = 'bg-slate-50 border-slate-100 text-slate-600';
              let badgeText = '일반';
              let icon = <Activity className="w-4 h-4 text-slate-500" />;

              if (act.type === 'referral') {
                badgeColor = 'bg-blue-50 border-blue-100 text-blue-600';
                badgeText = '추천 가입';
                icon = <Coins className="w-4 h-4 text-blue-500" />;
              } else if (act.type === 'creator_upgrade') {
                badgeColor = 'bg-amber-50 border-amber-100 text-amber-600';
                badgeText = '크리에이터 승격';
                icon = <Sparkles className="w-4 h-4 text-amber-500" />;
              } else if (act.type === 'referral_bonus') {
                badgeColor = 'bg-indigo-50 border-indigo-100 text-indigo-600';
                badgeText = '라운지 추천포상';
                icon = <Landmark className="w-4 h-4 text-indigo-500" />;
              } else if (act.type === 'lounge_open') {
                badgeColor = 'bg-emerald-50 border-emerald-100 text-emerald-600';
                badgeText = '라운지 신규가맹';
                icon = <Building className="w-4 h-4 text-emerald-500" />;
              }

              return (
                <motion.div
                  key={act.id}
                  layout
                  initial={{ opacity: 0, y: -20, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 20, scale: 0.95 }}
                  transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                  className="p-4 bg-slate-50/30 hover:bg-slate-50 border border-slate-100 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-4 transition-all"
                >
                  <div className="flex items-center gap-3 text-left">
                    <div className="w-9 h-9 rounded-xl bg-white border border-slate-150 flex items-center justify-center shadow-sm shrink-0">
                      {icon}
                    </div>
                    <div className="space-y-0.5">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-xs font-black text-slate-900">{act.lounge}</span>
                        <span className="text-[10px] text-slate-400">|</span>
                        <span className="text-xs font-black text-blue-600">{act.creator} 크리에이터</span>
                      </div>
                      <p className="text-xs font-semibold text-slate-500 leading-relaxed">
                        {act.desc}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between sm:justify-end gap-3 shrink-0">
                    <span className={`text-[10px] px-2.5 py-0.5 border rounded-full font-black ${badgeColor}`}>
                      {badgeText}
                    </span>
                    <span className="text-xs font-black text-slate-900 font-mono tracking-tight bg-white px-3 py-1.5 border border-slate-150 rounded-xl shadow-xs">
                      {act.amount}
                    </span>
                    <span className="text-[10px] font-bold text-slate-400 font-mono w-16 text-right shrink-0">
                      {act.time}
                    </span>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      </motion.div>

      {/* Business Goal Targets (Bento Block) */}
      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        className="p-8 bg-blue-50/40 rounded-[2rem] border border-blue-100 text-center space-y-5"
      >
        <div className="inline-flex items-center gap-1.5 bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-[10px] font-black uppercase">
          <Target className="w-3.5 h-3.5 animate-spin" />
          <span>AURORA NATIONWIDE ROADMAP</span>
        </div>
        <h4 className="font-black text-slate-800 text-lg">2026 오로라 전국 로드맵 및 예상 조직 목표</h4>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 pt-2">
          {[
            { label: "전국 거점 지사", emoji: "🏢", value: "17개", color: "text-blue-600" },
            { label: "지역 파트너 라운지", emoji: "🏪", value: "400개", color: "text-indigo-600" },
            { label: "소속 활동 크리에이터", emoji: "🎙️", value: "5,000명", color: "text-amber-500" },
            { label: "최종 가입 목표 회원", emoji: "👥", value: "100,000명", color: "text-emerald-500" }
          ].map((item, idx) => (
            <div key={idx} className="bg-white p-4 md:p-5 rounded-2xl border border-blue-50 relative overflow-hidden shadow-sm flex flex-col justify-between items-center text-center">
              <span className="text-2xl md:text-xl md:mb-1 block">{item.emoji}</span>
              <span className="text-[9px] md:text-[10px] font-black text-slate-400 uppercase tracking-tight block">
                <span className="hidden md:inline">{item.label}</span>
                <span className="md:hidden">{item.label.replace('소속 활동 ', '').replace('최종 가입 ', '')}</span>
              </span>
              <span className={`text-xl md:text-3xl font-display font-black tracking-tight ${item.color} block mt-1`}>
                {item.value}
              </span>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
