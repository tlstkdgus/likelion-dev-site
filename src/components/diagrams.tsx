import type { ReactNode } from "react";
import { Reveal } from "./ui";

/* ────────────────────────────────────────────────────────────
   회차별 시그니처 SVG 도식 모음.
   - 전부 인라인 SVG (외부 이미지 없음 → file:// / 오프라인에서도 안전)
   - Apple 톤: hairline stroke, 단일 액센트(Action Blue), 그림자 없음
   - Ep3만 다크 표면용 (dark 프롭)
   좌표는 viewBox 기준, 컨테이너 폭에 맞춰 자동 스케일된다.
   ──────────────────────────────────────────────────────────── */

const C = {
  blue: "#0066cc",
  blueSoft: "#9fc7f0",
  fillSoft: "#eaf3ff",
  ink: "#1d1d1f",
  muted: "#7a7a7a",
  hair: "#e0e0e0",
  track: "#ededf0",
};
const GREEN = "#1a7f37";
const GREEN_BG = "#e6f4ea";
const RED = "#b3402f";
const RED_BG = "#fce8e6";

/** 도식 프레임 — 카드 + 캡션 (실습 패널과 구분되는 '그림' 컨테이너) */
function Frame({ caption, dark = false, children }: { caption?: string; dark?: boolean; children: ReactNode }) {
  return (
    <Reveal className="mt-6">
      <figure className={`rounded-lg2 border overflow-hidden ${dark ? "border-[#3a3a3c] bg-tile2" : "border-hairline bg-pearl"}`}>
        <div className="px-6 py-7 max-md:px-4 max-md:py-5 overflow-x-auto">{children}</div>
        {caption && (
          <figcaption className={`text-[12.5px] leading-[1.5] px-6 py-3.5 border-t ${
            dark ? "border-[#3a3a3c] text-[#8e8e93]" : "border-hairline text-ink-48"}`}>
            <span className={dark ? "text-skylink font-semibold mr-1.5" : "text-primary font-semibold mr-1.5"}>그림</span>
            {caption}
          </figcaption>
        )}
      </figure>
    </Reveal>
  );
}

const svgProps = {
  className: "w-full h-auto",
  style: { fontFamily: "inherit" as const },
  role: "img" as const,
};

/* ───────────────────────── Ep1 · 식당 흐름도 ───────────────────────── */
export function RestaurantFlow() {
  const box = (x: number, term: string, role: string, hi = false) => {
    const cx = x + 90;
    return (
      <g>
        <rect x={x} y={68} width={180} height={100} rx={16}
          fill={hi ? C.fillSoft : "#fff"} stroke={hi ? C.blue : C.hair} strokeWidth={hi ? 1.5 : 1} />
        <text x={cx} y={112} textAnchor="middle" fontSize={25} fontWeight={600} fill={C.ink} letterSpacing="-0.5">{term}</text>
        <text x={cx} y={140} textAnchor="middle" fontSize={14} fontWeight={500} fill={C.blue}>{role}</text>
      </g>
    );
  };
  return (
    <Frame caption="요청은 홀(프론트엔드)에서 출발해 주문서(API)를 타고 주방(백엔드)·냉장고(DB)를 왕복합니다. 화면이 문제면 홀, 데이터가 문제면 주방을 의심하세요.">
      <svg viewBox="0 0 760 250" aria-label="식당에 빗댄 소프트웨어 구조 흐름도" {...svgProps}>
        <defs>
          <marker id="ep1arr" markerWidth="9" markerHeight="9" refX="6" refY="3" orient="auto">
            <path d="M0,0 L6,3 L0,6" fill="none" stroke={C.blue} strokeWidth="1.4" />
          </marker>
          <marker id="ep1arrM" markerWidth="9" markerHeight="9" refX="6" refY="3" orient="auto">
            <path d="M0,0 L6,3 L0,6" fill="none" stroke={C.muted} strokeWidth="1.3" />
          </marker>
        </defs>

        {box(30, "홀", "= 프론트엔드")}
        {box(290, "주방", "= 백엔드")}
        {box(550, "냉장고", "= DB", true)}

        {/* 홀 → 주방 (주문서/API) */}
        <line x1={210} y1={118} x2={286} y2={118} stroke={C.blue} strokeWidth={1.6} markerEnd="url(#ep1arr)" />
        <text x={248} y={104} textAnchor="middle" fontSize={12} fontWeight={600} fill={C.blue}>주문서 = API</text>
        {/* 주방 → 냉장고 */}
        <line x1={470} y1={118} x2={546} y2={118} stroke={C.blue} strokeWidth={1.6} markerEnd="url(#ep1arr)" />
        <text x={508} y={104} textAnchor="middle" fontSize={11.5} fill={C.muted}>조회·저장</text>

        {/* 응답 왕복 (아래로 돌아오는 경로) */}
        <path d="M640,168 L640,214 L120,214 L120,172" fill="none" stroke={C.muted} strokeWidth={1.3}
          strokeDasharray="4 4" markerEnd="url(#ep1arrM)" />
        <rect x={318} y={202} width={124} height={24} rx={12} fill="#fff" stroke={C.hair} />
        <text x={380} y={218} textAnchor="middle" fontSize={12} fill={C.muted}>응답 · 화면에 반영</text>
      </svg>
    </Frame>
  );
}

/* ───────────────────────── Ep2 · 배포 파이프라인 ───────────────────────── */
export function DeployPipeline() {
  const stage = (x: number, name: string, sub: string, hi = false) => {
    const cx = x + 85;
    return (
      <g>
        <rect x={x} y={72} width={170} height={84} rx={15}
          fill={hi ? C.fillSoft : "#fff"} stroke={hi ? C.blue : C.hair} strokeWidth={hi ? 1.5 : 1} />
        <text x={cx} y={110} textAnchor="middle" fontSize={18} fontWeight={600} fill={hi ? C.blue : C.ink} letterSpacing="-0.3">{name}</text>
        <text x={cx} y={133} textAnchor="middle" fontSize={12} fill={C.muted}>{sub}</text>
      </g>
    );
  };
  return (
    <Frame caption="코드는 로컬 → 스테이징 → 운영 순서로 나아갑니다. 운영에서 문제가 나면 이전 버전으로 되돌리는 것이 롤백, 정식 절차를 건너뛰는 응급 배포가 핫픽스입니다.">
      <svg viewBox="0 0 760 210" aria-label="배포 파이프라인 — 로컬에서 운영까지, 그리고 롤백" {...svgProps}>
        <defs>
          <marker id="ep2arr" markerWidth="9" markerHeight="9" refX="6" refY="3" orient="auto">
            <path d="M0,0 L6,3 L0,6" fill="none" stroke={C.blue} strokeWidth="1.4" />
          </marker>
          <marker id="ep2arrM" markerWidth="9" markerHeight="9" refX="6" refY="3" orient="auto">
            <path d="M0,0 L6,3 L0,6" fill="none" stroke={C.muted} strokeWidth="1.3" />
          </marker>
        </defs>

        {stage(40, "로컬", "개발자 PC")}
        {stage(295, "스테이징", "리허설 매장")}
        {stage(550, "운영", "고객 앞", true)}

        <line x1={210} y1={114} x2={291} y2={114} stroke={C.blue} strokeWidth={1.6} markerEnd="url(#ep2arr)" />
        <text x={250} y={100} textAnchor="middle" fontSize={12} fontWeight={600} fill={C.blue}>배포</text>
        <line x1={465} y1={114} x2={546} y2={114} stroke={C.blue} strokeWidth={1.6} markerEnd="url(#ep2arr)" />
        <text x={505} y={100} textAnchor="middle" fontSize={12} fontWeight={600} fill={C.blue}>배포</text>

        {/* 롤백 (위로 되돌아가는 경로) */}
        <path d="M635,72 L635,34 L125,34 L125,68" fill="none" stroke={C.muted} strokeWidth={1.3}
          strokeDasharray="4 4" markerEnd="url(#ep2arrM)" />
        <rect x={318} y={22} width={124} height={24} rx={12} fill="#fff" stroke={C.hair} />
        <text x={380} y={38} textAnchor="middle" fontSize={12} fill={C.muted}>문제 시 롤백</text>
      </svg>
    </Frame>
  );
}

/* ───────────────────────── Ep3 · Git 브랜치 그래프 ───────────────────────── */
export function BranchGraph() {
  const dot = (x: number, y: number, r = 6) => (
    <circle cx={x} cy={y} r={r} fill={C.blue} stroke="#fff" strokeWidth={2} />
  );
  return (
    <Frame caption="가운데 main에서 복사본(feature 브랜치)을 떠서 작업하고, 점 하나하나가 커밋입니다. 검토(PR)를 통과하면 원본에 합쳐지는데 이것이 머지입니다.">
      <svg viewBox="0 0 760 210" aria-label="Git 브랜치와 커밋, 머지 흐름 그래프" {...svgProps}>
        {/* main 라인 */}
        <line x1={40} y1={150} x2={720} y2={150} stroke={C.blue} strokeWidth={3} />
        <text x={40} y={182} fontSize={13} fontWeight={600} fill={C.ink}>main</text>

        {/* feature 브랜치: 분기 → 커밋 → 머지 */}
        <path d="M250,150 C270,150 280,80 320,80 L520,80 C560,80 570,150 600,150"
          fill="none" stroke={C.blue} strokeWidth={2.4} opacity={0.85} />
        <text x={330} y={64} fontSize={13} fontWeight={600} fill={C.blue}>feature 브랜치</text>

        {/* main 커밋 */}
        {dot(110, 150)}{dot(180, 150)}{dot(660, 150)}{dot(700, 150)}
        {/* 분기점 */}
        {dot(250, 150)}
        <text x={250} y={130} textAnchor="middle" fontSize={11.5} fill={C.muted}>브랜치 생성</text>
        {/* feature 커밋 */}
        {dot(360, 80)}{dot(430, 80)}{dot(495, 80)}
        <text x={430} y={107} textAnchor="middle" fontSize={11.5} fill={C.muted}>커밋 · 커밋 · 커밋</text>
        {/* 머지점 */}
        {dot(600, 150, 8)}
        <text x={600} y={182} textAnchor="middle" fontSize={12} fontWeight={600} fill={C.blue}>머지 (PR 승인)</text>
      </svg>
    </Frame>
  );
}

/* ───────────────────────── Ep4 · 버튼 하나의 빙산 ───────────────────────── */
export function IcebergDiagram() {
  return (
    <Frame caption="화면에 보이는 '버튼 하나'는 빙산의 일각입니다. 동작 정의·API·DB·테스트·QA·배포가 수면 아래에 딸려 오기 때문에 '간단한 거'가 사흘이 됩니다.">
      <svg viewBox="0 0 680 380" aria-label="버튼 하나의 작업량을 빙산에 빗댄 그림" {...svgProps}>
        {/* 물 (수면 아래 영역) */}
        <rect x={0} y={150} width={680} height={230} fill={C.blue} opacity={0.05} />
        <line x1={0} y1={150} x2={680} y2={150} stroke={C.blueSoft} strokeWidth={1.5} strokeDasharray="6 4" />
        <text x={16} y={168} fontSize={11.5} fill={C.blueSoft} fontWeight={600}>수면</text>

        {/* 빙산 수면 위 (일각) */}
        <polygon points="205,150 250,66 296,150" fill="#fff" stroke={C.blue} strokeWidth={1.5} />
        {/* 빙산 수면 아래 (본체) */}
        <polygon points="175,150 330,150 360,250 300,352 226,360 158,268 150,192"
          fill={C.blue} opacity={0.14} stroke={C.blue} strokeOpacity={0.45} strokeWidth={1.5} />

        {/* 수면 위 라벨 */}
        <line x1={296} y1={90} x2={420} y2={90} stroke={C.hair} strokeWidth={1} />
        <text x={432} y={84} fontSize={14} fontWeight={600} fill={C.ink}>수면 위 · 보이는 것</text>
        <text x={432} y={106} fontSize={13} fill={C.muted}>버튼 하나 그리기 — 1시간</text>

        {/* 수면 아래 라벨 */}
        <text x={432} y={182} fontSize={14} fontWeight={600} fill={C.blue}>수면 아래 · 숨은 일</text>
        {["동작 정의 · API 수정 · DB 변경", "테스트 코드 · 기기·브라우저 호환성", "QA · 코드 리뷰 · 배포 일정 조율"].map((t, i) => (
          <text key={t} x={432} y={210 + i * 24} fontSize={13} fill={C.ink}>· {t}</text>
        ))}
        <text x={432} y={300} fontSize={15} fontWeight={600} fill={C.ink}>합쳐서 사흘.</text>
      </svg>
    </Frame>
  );
}

/* ───────────────────────── Ep5 · 다음 단어 확률 예측 ───────────────────────── */
export function TokenPredict() {
  const cands: [string, number][] = [["정하자", 0.41], ["골라줘", 0.24], ["추천해", 0.16], ["알려줘", 0.10]];
  const trackX = 150, trackW = 440;
  return (
    <Frame caption="LLM은 이해하는 게 아니라, 앞 문장 다음에 올 말을 확률로 고르는 기계입니다. 그래서 그럴듯한 거짓말(할루시네이션)도 자신 있게 내놓습니다.">
      <svg viewBox="0 0 680 300" aria-label="다음에 올 단어를 확률로 예측하는 언어모델 도식" {...svgProps}>
        {/* 프롬프트 */}
        <rect x={40} y={22} width={600} height={54} rx={14} fill="#fff" stroke={C.hair} />
        <text x={64} y={55} fontSize={17} fontWeight={500} fill={C.ink}>“오늘 점심 뭐 먹을지 </text>
        <rect x={330} y={38} width={72} height={24} rx={6} fill={C.fillSoft} />
        <text x={366} y={55} textAnchor="middle" fontSize={16} fontWeight={600} fill={C.blue}>____</text>
        <text x={408} y={55} fontSize={17} fontWeight={500} fill={C.ink}>”</text>

        <text x={40} y={108} fontSize={12} fontWeight={600} fill={C.muted}>다음에 올 말 후보 (확률)</text>

        {cands.map(([w, p], i) => {
          const y = 124 + i * 40;
          const top = i === 0;
          return (
            <g key={w}>
              <text x={40} y={y + 21} fontSize={15} fontWeight={top ? 600 : 400} fill={top ? C.ink : C.muted}>{w}</text>
              <rect x={trackX} y={y + 6} width={trackW} height={22} rx={11} fill={C.track} />
              <rect x={trackX} y={y + 6} width={trackW * p} height={22} rx={11} fill={top ? C.blue : C.blueSoft} />
              <text x={640} y={y + 22} textAnchor="end" fontSize={13} fontWeight={top ? 600 : 400}
                fill={top ? C.blue : C.muted}>{Math.round(p * 100)}%</text>
            </g>
          );
        })}
      </svg>
    </Frame>
  );
}

/* ───────────────────────── Ep6 · AI 활용 발전 3단계 ───────────────────────── */
export function AIEvolution() {
  return (
    <Frame caption="AI 활용은 '어떻게 물을까(프롬프트)' → '무엇을 줄까(컨텍스트)' → '어떤 환경에서 일하게 할까(하네스)' 순으로 발전해 왔습니다. 지금 경쟁의 무게중심은 환경 설계에 있습니다.">
      <svg viewBox="0 0 720 280" aria-label="AI 활용의 발전 3단계 계단 도식" {...svgProps}>
        <defs>
          <marker id="ep6arr" markerWidth="10" markerHeight="10" refX="6" refY="3" orient="auto">
            <path d="M0,0 L6,3 L0,6" fill="none" stroke={C.muted} strokeWidth="1.5" />
          </marker>
        </defs>

        {/* 계단 블록 */}
        <g>
          <rect x={30} y={190} width={200} height={70} rx={13} fill="#fff" stroke={C.hair} />
          <text x={130} y={218} textAnchor="middle" fontSize={14} fontWeight={600} fill={C.ink}>프롬프트 엔지니어링</text>
          <text x={130} y={239} textAnchor="middle" fontSize={12} fill={C.muted}>어떻게 물을까</text>
        </g>
        <g>
          <rect x={260} y={140} width={200} height={120} rx={13} fill="#fff" stroke={C.hair} />
          <text x={360} y={168} textAnchor="middle" fontSize={14} fontWeight={600} fill={C.ink}>컨텍스트 엔지니어링</text>
          <text x={360} y={189} textAnchor="middle" fontSize={12} fill={C.muted}>무엇을 줄까</text>
        </g>
        <g>
          <rect x={490} y={80} width={200} height={180} rx={13} fill={C.blue} />
          <text x={590} y={116} textAnchor="middle" fontSize={14} fontWeight={600} fill="#fff">하네스 엔지니어링</text>
          <text x={590} y={138} textAnchor="middle" fontSize={12} fill="#cfe3ff">어떤 환경에서 일하게 할까</text>
          <rect x={548} y={158} width={84} height={26} rx={13} fill="#fff" />
          <text x={590} y={175} textAnchor="middle" fontSize={12} fontWeight={600} fill={C.blue}>지금 여기</text>
        </g>

        {/* 발전 방향 화살표 */}
        <polyline points="130,178 360,128 588,68" fill="none" stroke={C.muted} strokeWidth={1.4}
          strokeDasharray="5 4" markerEnd="url(#ep6arr)" />
        <text x={120} y={165} fontSize={11.5} fill={C.muted}>발전 방향</text>
      </svg>
    </Frame>
  );
}

/* ───────────────────────── Ep3 · 머지 컨플릭트 ───────────────────────── */
export function MergeConflict() {
  return (
    <Frame caption="두 사람이 같은 파일의 같은 줄을 서로 다르게 고치면 Git이 자동으로 합치지 못하고 멈춥니다. 어느 쪽을 살릴지 사람이 직접 정해야 하는 이 상황이 머지 컨플릭트 — 개발자가 한숨 쉬는 대표적인 이유입니다.">
      <svg viewBox="0 0 720 210" aria-label="같은 줄을 다르게 수정해 발생하는 머지 컨플릭트" {...svgProps}>
        <defs>
          <marker id="mcArr" markerWidth="9" markerHeight="9" refX="6" refY="3" orient="auto">
            <path d="M0,0 L6,3 L0,6" fill="none" stroke={C.muted} strokeWidth="1.3" />
          </marker>
        </defs>

        <rect x={30} y={26} width={270} height={66} rx={14} fill="#fff" stroke={C.hair} />
        <text x={50} y={54} fontSize={15} fontWeight={600} fill={C.ink}>개발자 A</text>
        <text x={50} y={77} fontSize={13} fill={C.blue}>line 42 → 색을 ‘파랑’으로</text>

        <rect x={420} y={26} width={270} height={66} rx={14} fill="#fff" stroke={C.hair} />
        <text x={440} y={54} fontSize={15} fontWeight={600} fill={C.ink}>개발자 B</text>
        <text x={440} y={77} fontSize={13} fill={GREEN}>line 42 → 색을 ‘초록’으로</text>

        <path d="M165,94 L320,138" stroke={C.muted} strokeWidth={1.4} fill="none" markerEnd="url(#mcArr)" />
        <path d="M555,94 L410,138" stroke={C.muted} strokeWidth={1.4} fill="none" markerEnd="url(#mcArr)" />

        <rect x={280} y={140} width={170} height={54} rx={14} fill={RED_BG} stroke="#e8b3ab" />
        <polygon points="304,180 315,158 326,180" fill="none" stroke={RED} strokeWidth={1.6} strokeLinejoin="round" />
        <line x1={315} y1={165} x2={315} y2={172} stroke={RED} strokeWidth={1.6} strokeLinecap="round" />
        <circle cx={315} cy={176} r={1} fill={RED} />
        <text x={340} y={172} fontSize={13.5} fontWeight={600} fill={RED}>머지 컨플릭트</text>
      </svg>
    </Frame>
  );
}

/* ───────────────────────── Ep3 · diff 화면 ───────────────────────── */
export function DiffView() {
  const rows: [("ctx" | "del" | "add"), string, string, string][] = [
    ["ctx", "41", " ", "function 제목색() {"],
    ["del", "42", "-", "  색 = ‘빨강’"],
    ["add", "42", "+", "  색 = ‘파랑’"],
    ["ctx", "43", " ", "}"],
  ];
  const mono = { fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace" };
  return (
    <Frame caption="PR에서 보는 diff 화면입니다. 초록(＋)은 새로 추가된 코드, 빨강(－)은 삭제된 코드 — 무엇이 어떻게 바뀌었는지 줄 단위로 보여줍니다.">
      <svg viewBox="0 0 640 200" aria-label="코드 변경을 보여주는 diff 화면 — 초록은 추가, 빨강은 삭제" {...svgProps}>
        <rect x={40} y={20} width={560} height={162} rx={14} fill="#fff" stroke={C.hair} />
        <text x={64} y={46} fontSize={13} fontWeight={600} fill={C.ink} style={mono}>app.js</text>
        <text x={576} y={46} textAnchor="end" fontSize={11.5} fill={C.muted}>변경 사항</text>
        <line x1={41} y1={58} x2={599} y2={58} stroke={C.hair} />

        {rows.map(([kind, ln, sign, code], i) => {
          const y = 66 + i * 29;
          const bg = kind === "add" ? GREEN_BG : kind === "del" ? RED_BG : "none";
          const fg = kind === "add" ? GREEN : kind === "del" ? RED : C.ink;
          return (
            <g key={i}>
              {bg !== "none" && <rect x={41} y={y} width={558} height={27} fill={bg} />}
              <text x={64} y={y + 18} fontSize={12} fill={C.muted} style={mono}>{ln}</text>
              <text x={92} y={y + 18} fontSize={13} fontWeight={600} fill={fg} style={mono}>{sign}</text>
              <text x={112} y={y + 18} fontSize={13} fill={fg} style={mono}>{code}</text>
            </g>
          );
        })}
      </svg>
    </Frame>
  );
}

/* ───────────────────────── Ep2 · 이슈 칸반 보드 ───────────────────────── */
export function KanbanBoard() {
  const cols: { title: string; accent: string; cards: string[] }[] = [
    { title: "To Do", accent: C.muted, cards: ["정렬 기능 추가", "로그인 버그"] },
    { title: "In Progress", accent: C.blue, cards: ["결제 연동"] },
    { title: "Done", accent: GREEN, cards: ["회원가입", "메인 배너"] },
  ];
  return (
    <Frame caption="‘이슈’·‘티켓’은 곧 이 보드의 할 일 카드입니다. “이슈로 올려주세요”는 “이 보드에 카드로 남겨주세요”라는 뜻 — 기록으로 남겨 흐르지 않게 하자는 것입니다.">
      <svg viewBox="0 0 720 236" aria-label="이슈를 카드로 관리하는 칸반 보드 — To Do, In Progress, Done" {...svgProps}>
        {cols.map((col, ci) => {
          const x = 20 + ci * 240;
          const done = col.title === "Done";
          return (
            <g key={col.title}>
              <rect x={x} y={20} width={200} height={200} rx={14} fill={C.track} opacity={0.5} />
              <circle cx={x + 22} cy={46} r={4} fill={col.accent} />
              <text x={x + 34} y={51} fontSize={13.5} fontWeight={600} fill={col.accent}>{col.title}</text>
              <text x={x + 182} y={51} textAnchor="end" fontSize={12} fill={C.muted}>{col.cards.length}</text>
              {col.cards.map((c, i) => {
                const cy = 66 + i * 54;
                const hi = col.title === "In Progress";
                return (
                  <g key={c}>
                    <rect x={x + 14} y={cy} width={172} height={42} rx={10}
                      fill="#fff" stroke={hi ? C.blue : C.hair} strokeWidth={hi ? 1.5 : 1} />
                    {done && <path d={`M${x + 28},${cy + 21} l4,4 l7,-8`} fill="none" stroke={GREEN} strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" />}
                    <text x={x + (done ? 46 : 28)} y={cy + 26} fontSize={12.5}
                      fill={done ? C.muted : C.ink}>{c}</text>
                  </g>
                );
              })}
            </g>
          );
        })}
      </svg>
    </Frame>
  );
}

/* ───────────────────────── Ep4 · 핑퐁 횟수 비교 ───────────────────────── */
export function PingPongCompare() {
  const bubble = (x: number, y: number, hi: boolean) => (
    <rect x={x} y={y} width={30} height={26} rx={7}
      fill={hi ? C.fillSoft : "#fff"} stroke={hi ? C.blue : C.hair} />
  );
  return (
    <Frame caption="현상만 던진 요청은 “언제요?” “어디서요?”가 오가며 며칠을 잡아먹습니다. 현상·재현 방법·기대 동작을 갖추면 대개 한 번에 처리됩니다.">
      <svg viewBox="0 0 680 168" aria-label="나쁜 요청과 좋은 요청의 핑퐁 횟수 비교" {...svgProps}>
        {/* 나쁜 요청 */}
        <text x={20} y={44} fontSize={13.5} fontWeight={600} fill={C.ink}>현상만 던지면</text>
        {[0, 1, 2, 3, 4].map((i) => bubble(190 + i * 42, 26, false))}
        <text x={410} y={44} fontSize={13} fontWeight={600} fill={RED}>→ 핑퐁 5회 · 사흘</text>

        {/* 좋은 요청 */}
        <text x={20} y={120} fontSize={13.5} fontWeight={600} fill={C.ink}>3요소를 갖추면</text>
        {bubble(190, 102, true)}
        <text x={240} y={120} fontSize={13} fontWeight={600} fill={C.blue}>→ 한 번에 처리 · 당일</text>
      </svg>
    </Frame>
  );
}

/* ───────────────────────── Ep5 · 바이브 코딩 루프 ───────────────────────── */
export function VibeLoop() {
  const steps: [string, string][] = [
    ["① 요청", "말로 시킨다"],
    ["② 생성", "AI가 만든다"],
    ["③ 확인", "돌려본다"],
    ["④ 수정", "고쳐달라 한다"],
  ];
  return (
    <Frame caption="요청 → 생성 → 확인 → 수정을 만족스러울 때까지 반복합니다. 이 되먹임 고리가 바이브 코딩이고, 기획자와 개발자가 하는 실제 개발 과정의 축소판입니다.">
      <svg viewBox="0 0 720 196" aria-label="바이브 코딩의 요청·생성·확인·수정 반복 루프" {...svgProps}>
        <defs>
          <marker id="vibeArr" markerWidth="9" markerHeight="9" refX="6" refY="3" orient="auto">
            <path d="M0,0 L6,3 L0,6" fill="none" stroke={C.blue} strokeWidth="1.4" />
          </marker>
          <marker id="vibeArrM" markerWidth="9" markerHeight="9" refX="6" refY="3" orient="auto">
            <path d="M0,0 L6,3 L0,6" fill="none" stroke={C.muted} strokeWidth="1.3" />
          </marker>
        </defs>

        {steps.map(([t, d], i) => {
          const x = 20 + i * 170;
          const cx = x + 70;
          return (
            <g key={t}>
              <rect x={x} y={44} width={140} height={70} rx={15} fill="#fff" stroke={C.hair} />
              <text x={cx} y={80} textAnchor="middle" fontSize={16} fontWeight={600} fill={C.ink}>{t}</text>
              <text x={cx} y={101} textAnchor="middle" fontSize={12} fill={C.muted}>{d}</text>
              {i < 3 && <line x1={x + 140} y1={79} x2={x + 166} y2={79} stroke={C.blue} strokeWidth={1.6} markerEnd="url(#vibeArr)" />}
            </g>
          );
        })}

        {/* 반복 루프 */}
        <path d="M600,114 L600,158 L90,158 L90,118" fill="none" stroke={C.muted} strokeWidth={1.3}
          strokeDasharray="4 4" markerEnd="url(#vibeArrM)" />
        <rect x={278} y={146} width={134} height={24} rx={12} fill="#fff" stroke={C.hair} />
        <text x={345} y={162} textAnchor="middle" fontSize={12} fill={C.muted}>만족할 때까지 반복</text>
      </svg>
    </Frame>
  );
}

/* ───────────────────────── Ep6 · 챗봇 vs 에이전트 ───────────────────────── */
export function ChatbotVsAgent() {
  const node = (x: number, w: number, y: number, label: string, hi: boolean) => (
    <g>
      <rect x={x} y={y} width={w} height={44} rx={12}
        fill={hi ? C.fillSoft : "#fff"} stroke={hi ? C.blue : C.hair} strokeWidth={hi ? 1.5 : 1} />
      <text x={x + w / 2} y={y + 28} textAnchor="middle" fontSize={13.5} fontWeight={hi ? 600 : 500}
        fill={hi ? C.blue : C.ink}>{label}</text>
    </g>
  );
  return (
    <Frame caption="챗봇은 묻고 답하는 1회성입니다. 에이전트는 목표를 받아 스스로 계획·실행·관찰을 반복하며 일을 끝까지 처리합니다 — 올해 AI 판의 가장 큰 변화입니다.">
      <svg viewBox="0 0 720 210" aria-label="챗봇과 에이전트의 동작 구조 비교" {...svgProps}>
        <defs>
          <marker id="cvaArr" markerWidth="9" markerHeight="9" refX="6" refY="3" orient="auto">
            <path d="M0,0 L6,3 L0,6" fill="none" stroke={C.muted} strokeWidth="1.3" />
          </marker>
          <marker id="cvaArrB" markerWidth="9" markerHeight="9" refX="6" refY="3" orient="auto">
            <path d="M0,0 L6,3 L0,6" fill="none" stroke={C.blue} strokeWidth="1.4" />
          </marker>
        </defs>

        {/* 챗봇 */}
        <text x={20} y={54} fontSize={14} fontWeight={600} fill={C.ink}>챗봇</text>
        {node(120, 110, 30, "질문", false)}
        <line x1={230} y1={52} x2={296} y2={52} stroke={C.muted} strokeWidth={1.5} markerEnd="url(#cvaArr)" />
        {node(300, 110, 30, "답변", false)}
        <text x={440} y={56} fontSize={12.5} fill={C.muted}>묻고 답한다 · 1회</text>

        <line x1={20} y1={92} x2={700} y2={92} stroke={C.hair} strokeDasharray="4 4" />

        {/* 에이전트 */}
        <text x={20} y={150} fontSize={14} fontWeight={600} fill={C.blue}>에이전트</text>
        {node(120, 100, 126, "계획", true)}
        <line x1={220} y1={148} x2={256} y2={148} stroke={C.blue} strokeWidth={1.6} markerEnd="url(#cvaArrB)" />
        {node(260, 100, 126, "실행 (도구)", true)}
        <line x1={360} y1={148} x2={396} y2={148} stroke={C.blue} strokeWidth={1.6} markerEnd="url(#cvaArrB)" />
        {node(400, 100, 126, "관찰", true)}
        <line x1={500} y1={148} x2={556} y2={148} stroke={C.blue} strokeWidth={1.6} markerEnd="url(#cvaArrB)" />
        {node(560, 100, 126, "완료", false)}

        {/* 스스로 반복 루프 */}
        <path d="M450,126 L450,104 L170,104 L170,124" fill="none" stroke={C.muted} strokeWidth={1.3}
          strokeDasharray="4 4" markerEnd="url(#cvaArr)" />
        <text x={310} y={99} textAnchor="middle" fontSize={11.5} fill={C.muted}>스스로 반복</text>
      </svg>
    </Frame>
  );
}

/* ───────────────────────── Ep1 · 외부 연동 (별형 연결) ───────────────────────── */
export function ExternalIntegrations() {
  const cx0 = 360, cy0 = 150;
  const sats: [number, number, string, string][] = [
    [150, 66, "결제 (PG)", "토스페이먼츠 등"],
    [570, 66, "지도", "카카오맵·구글맵"],
    [150, 234, "소셜 로그인", "카카오·구글·애플"],
    [570, 234, "알림", "알림톡·SMS"],
  ];
  return (
    <Frame caption="결제·지도·로그인·알림은 우리가 직접 안 만들고, 검증된 외부 전문 서비스를 API로 연결해 씁니다. 우리 서비스가 중심이고, 어려운 기능은 바깥에서 빌려오는 구조입니다.">
      <svg viewBox="0 0 720 300" aria-label="우리 서비스를 중심으로 외부 서비스들이 API로 연결된 구조" {...svgProps}>
        {/* 연결선 */}
        {sats.map(([x, y]) => (
          <line key={`l${x}${y}`} x1={cx0} y1={cy0} x2={x} y2={y} stroke={C.blue} strokeWidth={1.5} opacity={0.55} />
        ))}
        {/* API 칩 */}
        {sats.map(([x, y]) => {
          const mx = (cx0 + x) / 2, my = (cy0 + y) / 2;
          return (
            <g key={`c${x}${y}`}>
              <rect x={mx - 18} y={my - 10} width={36} height={20} rx={10} fill="#fff" stroke={C.hair} />
              <text x={mx} y={my + 4} textAnchor="middle" fontSize={10} fontWeight={600} fill={C.blue}>API</text>
            </g>
          );
        })}
        {/* 위성 노드 */}
        {sats.map(([x, y, name, ex]) => (
          <g key={`s${x}${y}`}>
            <rect x={x - 70} y={y - 25} width={140} height={50} rx={13} fill="#fff" stroke={C.hair} />
            <text x={x} y={y - 2} textAnchor="middle" fontSize={13.5} fontWeight={600} fill={C.ink}>{name}</text>
            <text x={x} y={y + 15} textAnchor="middle" fontSize={10.5} fill={C.muted}>{ex}</text>
          </g>
        ))}
        {/* 중심 */}
        <rect x={cx0 - 80} y={cy0 - 32} width={160} height={64} rx={15} fill={C.fillSoft} stroke={C.blue} strokeWidth={1.5} />
        <text x={cx0} y={cy0 + 5} textAnchor="middle" fontSize={15} fontWeight={600} fill={C.blue}>우리 서비스</text>
      </svg>
    </Frame>
  );
}

/* ───────────────────────── Home · 커리큘럼 여정 로드맵 ───────────────────────── */
export function CurriculumRoadmap() {
  const stops = ["구조", "언어", "협업", "요청", "AI 실습", "AI 흐름"];
  const x0 = 60, gap = 128;
  return (
    <Frame caption="여섯 번의 점심, 여섯 단계. 구조를 보는 눈에서 시작해 언어·협업·요청을 지나 직접 만들고 AI 흐름을 읽는 데까지 이어집니다.">
      <svg viewBox="0 0 760 150" aria-label="1강부터 6강까지의 학습 여정 로드맵" {...svgProps}>
        <line x1={x0} y1={70} x2={x0 + gap * 5} y2={70} stroke={C.hair} strokeWidth={2} />
        {stops.map((s, i) => {
          const x = x0 + i * gap;
          return (
            <g key={s}>
              <line x1={x0} y1={70} x2={x} y2={70} stroke={C.blue} strokeWidth={2} />
              <circle cx={x} cy={70} r={17} fill="#fff" stroke={C.blue} strokeWidth={2} />
              <text x={x} y={76} textAnchor="middle" fontSize={16} fontWeight={600} fill={C.blue}>{i + 1}</text>
              <text x={x} y={40} textAnchor="middle" fontSize={11.5} fill={C.muted}>{i + 1}강</text>
              <text x={x} y={110} textAnchor="middle" fontSize={13} fontWeight={500} fill={C.ink}>{s}</text>
            </g>
          );
        })}
      </svg>
    </Frame>
  );
}
