import { supabase } from './supabase';
import { Star, Music, Ship, Sparkles, Coins, CreditCard } from 'lucide-react';

export const ICON_MAP: Record<string, any> = {
  Star,
  Music,
  Ship,
  Sparkles,
  Coins,
  CreditCard,
};

export const DEFAULT_SETTINGS = {
  hero: {
    badge: "Shinji Official Project",
    artist: "대한민국 댄스 레전드 그룹 코요태 신지",
    title: "팬클럽",
    subtitle: "카드출시",
    tagline: "2026년 한정판 팬클럽기념 카드출시",
    membershipFee: "₩550,000",
  },
  benefits: [
    {
      title: "속초 디너 신지 팬미팅 프리패스",
      description: "음식과 음료, 주류가 제공되는 코요테 신지의 미니 콘서트 & 토크쇼",
      price: "회당 일반 판매가 80,000원",
      icon: "Star",
      color: "from-blue-500 to-blue-600",
      image: "https://images.unsplash.com/photo-1517457373958-b7bdd4587205?auto=format&fit=crop&q=80",
      date: "2026-07-15T18:00:00",
      schedule: ["17:00 - 입장 및 웰컴 드링크", "18:00 - 셰프 특별 디너 코스 시식", "19:30 - 신지 미니 콘서트 (Part 1)", "20:30 - 팬 토크 및 Q&A 세션", "21:30 - 개별 기념 촬영 및 유대 관계의 시간"]
    },
    {
      title: "코요테 썸머 콘서트 프리패스",
      description: "시흥시 웨이브파크 대형 파도풀 콘서트 & BBQ 식사, 레이저 쇼",
      price: "일반 판매가 150,000원",
      icon: "Music",
      color: "from-blue-400 to-cyan-400",
      image: "https://images.unsplash.com/photo-1540039155733-5bb30b53aa14?auto=format&fit=crop&q=80",
      date: "2026-08-22T19:00:00",
      schedule: ["16:00 - 웨이브파크 입장 및 자유 서핑", "18:00 - 풀사이드 프리미엄 BBQ 파티", "19:30 - 코요테 메인 무대 오프닝", "20:45 - 워터 레이저 판타지 쇼", "21:30 - 올나잇 팬덤 파티"]
    },
    {
      title: "All-inclusive 팬크루즈 투어",
      description: "5성급 셰프 정찬과 팬미팅 투어 화려한 쇼가 모두 포함된 1박 2일",
      price: "일반 판매가 440,000원",
      icon: "Ship",
      color: "from-blue-600 to-blue-800",
      image: "https://images.unsplash.com/photo-1548574505-5e239809ee19?auto=format&fit=crop&q=80",
      date: "2026-09-12T10:00:00",
      schedule: ["Day 1 10:00 - 승선 및 스위트룸 체크인", "Day 1 13:00 - 파노라마 오션뷰 런치", "Day 1 19:00 - 스타와 함께하는 선상 갈라쇼", "Day 2 09:00 - 선상 조식 및 포토타임", "Day 2 14:00 - 하선 및 기념품 증정"]
    },
    {
      title: "코요테 단독 공연 VIP석",
      description: "코요테 공연 VIP석 제공 및 화려한 무대 이벤트",
      price: "회원 전용 특권",
      icon: "Sparkles",
      color: "from-indigo-500 to-blue-500",
      image: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&q=80",
      date: "2026-10-29T19:30:00",
      schedule: ["18:30 - VIP 전용 라운지 이용", "19:30 - 정기 단독 공연 메인 세트", "20:45 - 앵콜 및 스페셜 이벤트", "21:15 - VIP 백스테이지 투어", "22:00 - 행사 종료"]
    },
    {
      title: "코요테 기념 주화",
      description: "2026년 한정판 소장가치 최고의 코요테 신지 기념 금주화 증정",
      price: "소장용 한정판",
      icon: "Coins",
      color: "from-[#D4AF37] to-[#B8860B]",
      image: "https://images.unsplash.com/photo-1624365169192-37d37a85e921?auto=format&fit=crop&q=80",
      date: "2026-06-30T00:00:00",
      schedule: ["2026-06-01 - 한정판 디자인 공개", "2026-06-15 - 제작 공정 브이로그 업데이트", "2026-06-30 - 가입 순차적 배송 시작", "2026-07-15 - 잔여 수량 파기 및 가치 보전"]
    },
    {
      title: "한정판 코요테 신지 굿즈 카드",
      description: "신지 싸인이 각인된 실생활 거래 가능 리워드 체크카드",
      price: "가입 후 15일 이내 발송",
      icon: "CreditCard",
      color: "from-slate-700 to-black",
      image: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?auto=format&fit=crop&q=80",
      date: "2026-06-15T00:00:00",
      schedule: ["가입 당일 - 개인 정보 확인 및 발급 승인", "가입 D+3 - 카드 제작 및 레이저 각인", "가입 D+5 - 특수 보안 배송팀 인계", "가입 D+10 - 회원 본인 수령 확인", "가입 D+15 - 전용 혜택 활성화"]
    }
  ]
};

export async function getSettings() {
  try {
    const { data, error } = await supabase
      .from('settings')
      .select('data')
      .eq('id', 'landing')
      .single();

    if (error) {
      if (error.code !== 'PGRST116') {
        console.error("Error fetching settings from Supabase:", error);
      }
      return DEFAULT_SETTINGS;
    }
    return data.data;
  } catch (error) {
    console.error("Error fetching settings:", error);
    return DEFAULT_SETTINGS;
  }
}

export async function saveSettings(settings: any) {
  const { error } = await supabase
    .from('settings')
    .upsert({ id: 'landing', data: settings });
  
  if (error) throw error;
}
