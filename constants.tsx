import React from 'react';
import { Home, User, Map, Image as ImageIcon, Mail, FileText, Cpu, Users, FlaskConical, Briefcase, Calculator, Languages, FileSpreadsheet, MessageSquareText, Lightbulb, Globe, Target, TrendingUp } from 'lucide-react';
import { TimelineEvent, GalleryItem } from './types';

export const APP_NAME = "IKARUS AI Hub";

// Simulate Admin User (In a real app, this would come from auth state)
export const ADMIN_USER = {
  isAdmin: true,
  name: "관리자",
  email: "admin@samhwa.com"
};

// Image Assets
export const IMAGES = {
  PROFILE: "https://loremflickr.com/800/800/artificial_intelligence,robot/all",
  // Updated to a darker, more atmospheric background for the new design
  HERO_BG: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072&auto=format&fit=crop", 
  GALLERY_1: "https://loremflickr.com/800/600/workshop,office/all",
  GALLERY_2: "https://loremflickr.com/800/600/computer,code/all",
  GALLERY_3: "https://loremflickr.com/800/600/team,success/all",
  GALLERY_4: "https://loremflickr.com/800/600/seminar,presentation/all",
};

export const HERO_TEXTS = {
  badge: "SYSTEM: ONLINE // CHEM_AI_V2.0",
  title: "우리 연구소를 위한\n생성형 AI 활용 가이드",
  desc: "삼화페인트 후배님들과 동료 연구원들을 위해 준비했습니다.\n낯선 생성형 AI를 연구와 실무에 어떻게 녹여낼지 함께 고민하고,\n지식의 나눔을 통해 더 높이 성장하는 계기를 만들어갑시다.",
  notification: "[공지] 다음 주 수요일 점심시간에 '프롬프트 엔지니어링 기초' 미니 세미나가 있습니다."
};

export const NAV_ITEMS = [
  { id: 'home', label: 'Home', icon: <Home size={20} /> },
  { id: 'about', label: 'About', icon: <User size={20} /> },
  { id: 'journey', label: 'Journey', icon: <Map size={20} /> },
  { id: 'lab', label: 'AI Lab', icon: <FlaskConical size={20} /> },
  { id: 'solution', label: 'Solution', icon: <Briefcase size={20} /> },
  { id: 'life', label: 'Life', icon: <ImageIcon size={20} /> },
  { id: 'contact', label: 'Contact', icon: <Mail size={20} /> },
];

export const TIMELINE_DATA: TimelineEvent[] = [
  {
    date: "2023. Q4",
    title: "IKARUS 프로젝트 발족",
    description: "삼화페인트 연구소 내 생성형 AI 도입을 위한 TF팀 구성 및 초기 기획 단계.",
    category: "milestone"
  },
  {
    date: "2024. Q1",
    title: "기초 인프라 구축",
    description: "사내 보안 가이드라인 수립 및 폐쇄형 AI 모델 테스트 환경 조성.",
    category: "project"
  },
  {
    date: "2024. Q2",
    title: "임직원 대상 1차 워크샵",
    description: "연구원 50명 대상 프롬프트 엔지니어링 기초 교육 실시 (만족도 4.8/5.0).",
    category: "education"
  },
  {
    date: "2024. Q3",
    title: "R&D 특화 모델 PoC",
    description: "화학 배합 및 물성 예측을 위한 도메인 특화 LLM 개념 증명 수행.",
    category: "project"
  },
  {
    date: "Current",
    title: "IKARUS Hub 오픈",
    description: "전사적 지식 공유를 위한 웹 플랫폼 런칭 및 커뮤니티 활성화.",
    category: "milestone"
  }
];

export const GALLERY_DATA: GalleryItem[] = [
  { id: 1, url: IMAGES.GALLERY_1, title: "제1회 AI 워크샵", category: "Education" },
  { id: 2, url: IMAGES.GALLERY_2, title: "프롬프트 연구 세션", category: "R&D" },
  { id: 3, url: IMAGES.GALLERY_3, title: "해커톤 우승팀", category: "Community" },
  { id: 4, url: IMAGES.GALLERY_4, title: "사내 세미나 발표", category: "Education" },
];

export const USE_CASES = [
  {
    id: 1,
    noteId: "STUDY NOTE 02",
    category: "2차 전지 소재",
    title: "MXene 공정 데이터 시각화",
    desc: "반응 온도와 시간에 따른 물성 변화 데이터를 시각화해보았습니다. 데이터가 쌓이면 불량률 예측도 가능할 것 같습니다.",
    chartData: [
      { label: 'SWCNT', value: 85, color: 'bg-[#005e54]' },
      { label: 'Graphene', value: 65, color: 'bg-[#00695c]' },
      { label: 'AgNW', value: 45, color: 'bg-[#00796b]' },
      { label: 'CB', value: 30, color: 'bg-[#00897b]' }
    ]
  },
  {
    id: 2,
    noteId: "STUDY NOTE 01",
    category: "배합 최적화",
    title: "친환경 페인트 점도 예측 모델",
    desc: "기존 3년치 배합 데이터를 학습시켜 목표 점도에 도달하기 위한 첨가제 비율을 추천받았습니다. 실험 횟수가 획기적으로 줄어들었습니다.",
    chartData: [
      { label: '기존 실험 횟수', value: 100, color: 'bg-gray-400' },
      { label: 'AI 예측 도입', value: 40, color: 'bg-teal-500' }
    ]
  }
];

export const KEY_MESSAGES = [
  { title: "업무 가이드", desc: "누구나 쉽게 시작하는 업무용 AI 가이드", icon: <FileText className="text-primary" /> },
  { title: "프롬프트", desc: "연구 효율을 높이는 프롬프트 엔지니어링", icon: <Cpu className="text-secondary" /> },
  { title: "커뮤니티", desc: "함께 성장하는 사내 AI 커뮤니티", icon: <Users className="text-primary" /> },
];

export const LAB_TOPICS = [
  {
    id: 1,
    title: "Part 1. 화학 연구원을 위한 GenAI 기초",
    desc: "LLM이 도대체 뭔가요? 우리 분야에서 할 수 있는 것들",
    badge: "입문"
  },
  {
    id: 2,
    title: "Part 2. 실험 설계를 위한 프롬프트 팁",
    desc: "어떻게 질문해야 AI가 똑똑하게 대답할까요? (예시 모음)",
    badge: "활용"
  },
  {
    id: 3,
    title: "Part 3. 보고서/문서 작업 자동화",
    desc: "반복적인 문서 작업 시간을 줄여주는 소소한 꿀팁",
    badge: "실무"
  }
];

export const SMART_WORK_CARDS = [
  {
    id: 'hr',
    title: '인사 / 총무',
    icon: <Briefcase size={24} className="text-purple-600" />,
    bg: 'bg-purple-100',
    items: ['사내 공지사항 작성', '면접 예상 질문 리스트', '교육 커리큘럼 초안']
  },
  {
    id: 'sales',
    title: '영업 / 마케팅',
    icon: <Mail size={24} className="text-blue-600" />,
    bg: 'bg-blue-100',
    items: ['고객 응대 이메일', '제품 홍보 문구', '시장 트렌드 조사']
  },
  {
    id: 'finance',
    title: '재무 / 회계',
    icon: <FileSpreadsheet size={24} className="text-green-600" />,
    bg: 'bg-green-100',
    items: ['복잡한 엑셀 수식 생성', '데이터 정리 매크로', '재무 보고서 요약']
  },
  {
    id: 'prod',
    title: '생산 / 품질',
    icon: <FileText size={24} className="text-orange-600" />,
    bg: 'bg-orange-100',
    items: ['작업 표준서 번역', '불량 유형 분류', '회의록 자동 정리']
  }
];

export const AI_TOOLS = [
  {
    id: 'email',
    label: '이메일 작성',
    icon: <Mail size={16} />,
    placeholder: "예: 거래처 김부장님께 견적서 송부가 늦어져서 죄송하다는 메일을 정중하게 쓰고 싶어.",
    systemPrompt: "당신은 비즈니스 이메일 작성 전문가입니다. 사용자의 요청 상황에 맞춰 정중하고 명확한 비즈니스 이메일 초안을 한국어로 작성해주세요."
  },
  {
    id: 'excel',
    label: '엑셀 함수',
    icon: <Calculator size={16} />,
    placeholder: "예: A열에 있는 날짜에서 '월'만 추출하고 싶은데 어떤 함수를 써야 해?",
    systemPrompt: "당신은 엑셀 전문가입니다. 사용자가 원하는 기능을 구현하기 위한 엑셀 함수나 수식을 제공하고, 간단한 사용법을 설명해주세요."
  },
  {
    id: 'summary',
    label: '내용 요약',
    icon: <MessageSquareText size={16} />,
    placeholder: "예: (요약하고 싶은 긴 텍스트를 붙여넣으세요) ... 이 내용을 3줄로 요약해줘.",
    systemPrompt: "당신은 텍스트 요약 전문가입니다. 입력된 텍스트의 핵심 내용을 파악하여 요청된 형식(예: 3줄 요약)으로 명확하게 요약해주세요."
  },
  {
    id: 'translate',
    label: '번역',
    icon: <Languages size={16} />,
    placeholder: "예: 다음 문장을 영어로 번역해줘: '이번 프로젝트의 성공적인 마무리를 축하합니다.'",
    systemPrompt: "당신은 전문 번역가입니다. 입력된 텍스트를 요청된 언어로 자연스럽고 정확하게 번역해주세요. 특별한 언급이 없으면 비즈니스 톤을 유지하세요."
  }
];

export const COMMUNITY_CATEGORIES = [
  { id: 'all', label: '전체보기' },
  { id: 'efficiency', label: '업무 효율화' },
  { id: 'creative', label: 'AI 창작물' },
  { id: 'prompt', label: '프롬프트 공유' },
  { id: 'free', label: '자유게시판' }
];

export const COMMUNITY_POSTS = [
  {
    id: 1,
    category: 'creative',
    catLabel: 'AI 창작물',
    title: '미드저니로 생성한 미래형 친환경 페인트 컨셉',
    excerpt: '페인트의 물성을 시각적으로 표현하기 위해 생성형 AI를 활용해봤습니다. "Eco-friendly liquid flow, abstract, 3d render" 키워드를 사용했어요.',
    author: '김연구',
    team: '선행연구팀',
    likes: 0,
    comments: 1,
    image: 'https://images.unsplash.com/photo-1505330622279-bf7d7fc918f4?q=80&w=2070&auto=format&fit=crop', // Abstract Yellow/Grey wall
    badgeColor: 'bg-purple-100 text-purple-600',
    date: '10분 전'
  },
  {
    id: 2,
    category: 'efficiency',
    catLabel: '업무 효율화',
    title: '회의록 자동 요약 프롬프트 공유합니다',
    excerpt: '긴 회의 내용을 구조화해서 요약해주는 프롬프트입니다. [회의록 내용]을 넣고 이 프롬프트를 쓰면 Action Item까지 뽑아줍니다. 업무 효율이 2배는 좋아진 것 같습니다.',
    author: '박수석',
    team: '기술영업팀',
    likes: 1,
    comments: 0,
    badgeColor: 'bg-blue-100 text-blue-600',
    date: '1시간 전'
  },
  {
    id: 3,
    category: 'prompt',
    catLabel: '프롬프트 공유',
    title: '화학 논문 요약용 System Prompt',
    excerpt: '영문 화학 논문을 넣으면 핵심 실험 결과와 수치 위주로 요약해주는 프롬프트입니다. 연구소 분들께 도움될 것 같아 공유합니다.',
    author: '이수석',
    team: '기반기술팀',
    likes: 5,
    comments: 3,
    badgeColor: 'bg-orange-100 text-orange-600',
    date: '3시간 전'
  }
];

// Insights & Trends Data
export const INSIGHT_STEPS = [
  {
    id: 1,
    icon: <Lightbulb size={28} className="text-teal-600" />,
    title: "아이디어 씨앗",
    desc: "일상 업무 속 작은 불편함 발견"
  },
  {
    id: 2,
    icon: <Globe size={28} className="text-teal-600" />,
    title: "트렌드 탐색",
    desc: "글로벌 유사 사례 및 기술 검색"
  },
  {
    id: 3,
    icon: <Target size={28} className="text-teal-600" />,
    title: "PoC 검증",
    desc: "AI로 빠르게 가설 검증해보기"
  },
  {
    id: 4,
    icon: <TrendingUp size={28} className="text-teal-600" />,
    title: "사내 제안",
    desc: "구체화된 기획안으로 발전"
  }
];

export const INSIGHT_TREND_DATA = {
  title: "글로벌 화학 AI 트렌드",
  desc: "BASF, Dow 등 글로벌 화학 기업들의 디지털 전환(DX) 사례와 최신 머신러닝 도입 현황을 정리해두었습니다. 우리도 어떤 준비를 해야 할지 함께 고민해봅시다.",
  items: [
    "Materials Informatics 최신 동향",
    "자율 실험실(Self-driving Lab) 사례"
  ]
};

export const INSIGHT_STARTUP_DATA = {
  title: "오픈 이노베이션 & 스타트업",
  desc: "흥미로운 기술을 가진 화학/소재 스타트업들을 눈여겨보고 있습니다. 외부 기술을 우리 연구에 접목할 수 있는 기회를 찾아봅니다.",
  sections: [
    { title: "Tech Radar", desc: "관심 기술 분야" },
    { title: "Collaboration", desc: "협업 가능성 탐색" }
  ]
};

// Utility function to download content as a file
export const downloadAsFile = (filename: string, content: string) => {
  const element = document.createElement('a');
  const file = new Blob([content], {type: 'text/plain'});
  element.href = URL.createObjectURL(file);
  element.download = filename;
  document.body.appendChild(element); // Required for this to work in FireFox
  element.click();
  document.body.removeChild(element);
};