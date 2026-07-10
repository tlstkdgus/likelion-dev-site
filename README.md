# 개발 아는 척 완전정복 — 6주 완성 웹사이트(7/10일자 update)

비개발자 대상 점심시간 사내 교육 6회차 강의안 + 실시간 인터랙티브 데모를 홈 + 회차별 6개 페이지로 담은 사이트 (HashRouter 라우팅)입니다.
React + TypeScript + Tailwind CSS v4 + Vite. 디자인은 Apple 웹 디자인 시스템을 참고했습니다.

## 구성

| 회차 | 강의안 | 라이브 데모 |
|---|---|---|
| 1. 소프트웨어 구조 | 식당 비유 대응표 | 로그인 요청 왕복 여정 시뮬레이터 |
| 2. 용어 사전 | 용어 플립 카드 8종 | 커피 쿠폰 퀴즈 (6문제) |
| 3. Git & GitHub | 타임머신/CCTV/동시편집 | 브랜치→커밋→PR→머지 시뮬레이터 |
| 4. 대화하는 법 | 버튼 하나의 빙산 | 좋은 요청 빌더 (핑퐁 미터) |
| 5. 바이브 코딩 | LLM의 정체 | 점심 룰렛 (폭죽 포함) 🎡 |
| 6. AI 트렌드 | 하네스/컨텍스트/MCP | 챗봇 vs 에이전트 비교 데모 |
| 수료 | 치트키 카드 6선 | — |

## 로컬 실행

```bash
npm install
npm run dev        # http://localhost:5173
```

빌드 결과 미리보기: `dist/index.html`을 그대로 브라우저로 열어도 동작합니다 (base: "./").

## Vercel 배포 (2가지 방법)

**방법 1 — CLI (가장 빠름)**
```bash
npm i -g vercel
vercel            # 로그인 후 엔터 몇 번이면 끝. 프레임워크: Vite 자동 감지
vercel --prod     # 프로덕션 배포
```

**방법 2 — GitHub 연동**
1. 이 폴더를 GitHub 저장소로 푸시
2. vercel.com → Add New Project → 저장소 선택
3. Framework Preset: Vite (자동 감지) → Deploy

빌드 설정은 자동 감지됩니다 (Build: `npm run build`, Output: `dist`).
