export interface UserProfile {
  userId: string;
  email: string;
  displayName: string;
  tier: 'Basic' | 'Gold' | 'Legend Tier';
  role: 'User' | 'Sales' | 'Admin';
  referredByEmail: string;
  ancestors: string[];
  phoneNumber: string;
  createdAt?: any;
}

export interface CardApplication {
  id: string;
  userId: string;
  email: string;
  displayName: string;
  cardName: string;
  address: string;
  detailAddress: string;
  phoneNumber: string;
  cardColor: string;
  status: 'pending' | 'approved' | 'rejected';
  createdAt?: any;
  updatedAt?: any;
}

const INITIAL_USERS: UserProfile[] = [
  {
    userId: 'admin_mock_123',
    email: 'new2020.jeonil@gmail.com',
    displayName: '전일미디어 수석기획자',
    tier: 'Legend Tier',
    role: 'Admin',
    referredByEmail: '',
    ancestors: [],
    phoneNumber: '010-1234-5678',
    createdAt: { seconds: 1782200000, nanoseconds: 0 }
  },
  {
    userId: 'user_mock_456',
    email: 'tester@fandomaurora.com',
    displayName: '홍길동 프로',
    tier: 'Gold',
    role: 'Sales',
    referredByEmail: 'new2020.jeonil@gmail.com',
    ancestors: ['new2020.jeonil@gmail.com'],
    phoneNumber: '010-9876-5432',
    createdAt: { seconds: 1782210000, nanoseconds: 0 }
  },
  {
    userId: 'user_mock_789',
    email: 'creator1@fandomaurora.com',
    displayName: '아이유 크리에이터',
    tier: 'Legend Tier',
    role: 'Sales',
    referredByEmail: 'tester@fandomaurora.com',
    ancestors: ['tester@fandomaurora.com', 'new2020.jeonil@gmail.com'],
    phoneNumber: '010-1111-2222',
    createdAt: { seconds: 1782220000, nanoseconds: 0 }
  },
  {
    userId: 'user_mock_abc',
    email: 'creator2@fandomaurora.com',
    displayName: '임영웅 파트너',
    tier: 'Gold',
    role: 'User',
    referredByEmail: 'tester@fandomaurora.com',
    ancestors: ['tester@fandomaurora.com', 'new2020.jeonil@gmail.com'],
    phoneNumber: '010-3333-4444',
    createdAt: { seconds: 1782230000, nanoseconds: 0 }
  },
  {
    userId: 'user_mock_def',
    email: 'partner3@fandomaurora.com',
    displayName: '블랙핑크 크루',
    tier: 'Basic',
    role: 'User',
    referredByEmail: 'new2020.jeonil@gmail.com',
    ancestors: ['new2020.jeonil@gmail.com'],
    phoneNumber: '010-5555-6666',
    createdAt: { seconds: 1782240000, nanoseconds: 0 }
  }
];

const INITIAL_APPLICATIONS: CardApplication[] = [
  {
    id: 'app_1',
    userId: 'user_mock_456',
    email: 'tester@fandomaurora.com',
    displayName: '홍길동 프로',
    cardName: '팬덤 오로라 골드 레전드 에디션',
    address: '서울특별시 강남구 테헤란로 152',
    detailAddress: '강남파이낸스센터 24층',
    phoneNumber: '010-9876-5432',
    cardColor: 'Gold Glow',
    status: 'pending',
    createdAt: { seconds: 1782250000, nanoseconds: 0 },
    updatedAt: { seconds: 1782250000, nanoseconds: 0 }
  },
  {
    id: 'app_2',
    userId: 'user_mock_789',
    email: 'creator1@fandomaurora.com',
    displayName: '아이유 크리에이터',
    cardName: '팬덤 오로라 오로라 프리즘',
    address: '서울특별시 마포구 월드컵북로 396',
    detailAddress: '누리꿈스퀘어 R&D타워 11층',
    phoneNumber: '010-1111-2222',
    cardColor: 'Aurora Prism',
    status: 'approved',
    createdAt: { seconds: 1782240000, nanoseconds: 0 },
    updatedAt: { seconds: 1782245000, nanoseconds: 0 }
  }
];

export function getLocalMockUsers(): UserProfile[] {
  const data = localStorage.getItem('mock_db_users');
  if (!data) {
    localStorage.setItem('mock_db_users', JSON.stringify(INITIAL_USERS));
    return INITIAL_USERS;
  }
  try {
    return JSON.parse(data);
  } catch (e) {
    return INITIAL_USERS;
  }
}

export function saveLocalMockUsers(users: UserProfile[]) {
  localStorage.setItem('mock_db_users', JSON.stringify(users));
}

export function getLocalMockApplications(): CardApplication[] {
  const data = localStorage.getItem('mock_db_card_applications');
  if (!data) {
    localStorage.setItem('mock_db_card_applications', JSON.stringify(INITIAL_APPLICATIONS));
    return INITIAL_APPLICATIONS;
  }
  try {
    return JSON.parse(data);
  } catch (e) {
    return INITIAL_APPLICATIONS;
  }
}

export function saveLocalMockApplications(apps: CardApplication[]) {
  localStorage.setItem('mock_db_card_applications', JSON.stringify(apps));
}
