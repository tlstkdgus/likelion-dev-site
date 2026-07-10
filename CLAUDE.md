# 개발 아는 척 완전정복 — 사내 교육 웹사이트

비개발자(기획/운영/마케팅) 대상 점심시간 사내 교육 6회차 코스의 웹사이트.
Cowork(Claude)에서 제작을 시작했고, 이 시점부터 Claude Code로 이어서 개발한다.

## 기술 스택
- React 18 + TypeScript (strict)
- Tailwind CSS v4 (`@tailwindcss/vite` 플러그인, 설정 파일 없음 — `src/index.css`의 `@theme` 블록에 디자인 토큰)
- Vite 6, `base: "./"` (file:// 로컬 열기 + Vercel 모두 대응)
- react-router-dom **HashRouter** (Vercel rewrite 불필요. BrowserRouter로 바꾸려면 vercel.json rewrite 추가할 것)

## 디자인 시스템 (Apple 웹 스타일 — getdesign apple 스펙 기반)
- 단일 액센트: Action Blue `#0066cc` (다크 표면에서는 Sky Blue `#2997ff`)
- 표면: white / parchment `#f5f5f7` / dark tile `#272729`·`#2a2a2c`·`#252527` 교차 리듬
- 텍스트: ink `#1d1d1f`, 본문 17px, 자간 -0.374px, 헤드라인 weight 600 + 음수 자간
- 버튼: pill(9999px) 형태, active 시 scale(0.95). 카드: hairline border + 18px radius, 그림자 금지
- 폰트: SF Pro → Pretendard(CDN, index.html) → system-ui 폴백

## 구조
- `src/App.tsx` — 라우터, EPISODES 메타데이터(6회차 정의), 글로벌 네비, 푸터
- `src/pages/Home.tsx` — 히어로 + 커리큘럼 카드 + 치트키 프리뷰
- `src/pages/Ep1~6.tsx` — 회차별 페이지 (강의 콘텐츠 + 라이브 데모 + 치트키 + 이전/다음 내비)
- `src/components/EpLayout.tsx` — 회차 페이지 공통 레이아웃
- `src/components/Ep*.tsx` — 인터랙티브 데모: Ep1Journey(로그인 왕복), Ep2Cards(플립카드)/Ep2Quiz(퀴즈), Ep3GitSim(SVG Git 시뮬레이터), Ep4Builder(요청 빌더), Ep5Roulette(canvas 룰렛+폭죽), Ep6Agent(챗봇vs에이전트)
- `src/components/ui.tsx` — Reveal(스크롤 등장), Pill, Tile, SectionHead, DemoPanel

## 명령어
- `npm run dev` — 개발 서버
- `npm run build` — tsc -b && vite build (타입 에러 시 빌드 실패)
- 배포: `vercel --prod` (Vite 자동 감지)

## 콘텐츠 톤
친근하고 위트 있는 사내 교육 톤. 식당 비유(홀=프론트, 주방=백엔드, 냉장고=DB, 주문서=API) 일관 유지.
같은 내용의 PPT 6종이 별도로 존재함 (LIKELION 다크+오렌지 양식 — 웹과 디자인이 다른 것은 의도된 것).
