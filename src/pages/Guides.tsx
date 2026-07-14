import type { ReactNode } from "react";
import Icon, { type IconName } from "../components/Icon";
import { LessonSection, Note, Reveal } from "../components/ui";
import { GuideNoteConnect, GuideConnectorHub, GuidePlanFlow } from "../components/diagrams";

/** 부록 · AI 툴 활용 가이드 — 강의 밖에서 각자 천천히 따라 하는 레시피.
 *  최대한 쉬운 말로, 그림으로 먼저 이해시키는 것이 목표. */

type Guide = {
  no: string;
  icon: IconName;
  title: string;
  whatIsIt: string;   // "이게 뭐예요" 한 줄
  plain: string;      // "쉽게 말하면"
  diagram: ReactNode;
  benefit: string;    // "이래서 편해요"
  steps: [string, string][];
  examples: string[];
  caution: string;
  links: [string, string][];
};

const GUIDES: Guide[] = [
  {
    no: "01",
    icon: "book",
    title: "옵시디언 메모, Claude가 대신 뒤져줘요",
    whatIsIt: "옵시디언 = 메모·노트를 정리하는 무료 앱이에요.",
    plain: "옵시디언에 쌓아둔 메모를 Claude에 '한 번' 연결해두면, 다음부터는 폴더를 열어 뒤지고 복사·붙여넣기 할 필요 없이 \"내 메모에서 찾아서 정리해줘\"라고 말만 하면 됩니다.",
    diagram: <GuideNoteConnect />,
    benefit: "지난달 회의록 5개를 하나씩 열어보지 않아도, \"지난달 회의에서 정한 것만 표로 만들어줘\" 한마디면 끝나요.",
    steps: [
      ["Claude '앱'을 컴퓨터에 깔아요", "홈페이지(claude.ai)가 아니라 컴퓨터용 앱이어야 내 파일을 읽을 수 있어요."],
      ["설정에서 옵시디언을 켜요", "설정의 '연결' 목록에서 Obsidian을 찾아 켜기만 하면 됩니다."],
      ["보여줄 메모 폴더를 골라요", "전부 말고 업무 메모 폴더 하나만 골라도 돼요."],
      ["대화창에서 말로 시켜요", "\"내 메모에서 ○○ 찾아서 정리해줘\"라고 하면 끝."],
    ],
    examples: [
      "지난달 회의록에서 정해진 것만 골라 표로 만들기",
      "여기저기 흩어진 아이디어 메모를 하나의 기획 초안으로 묶기",
      "매주 쓰는 회고 메모를 월간 리포트로 정리하기",
    ],
    caution: "연결한 폴더의 메모를 Claude가 다 볼 수 있어요. 회사 비밀이나 개인정보가 담긴 메모는 다른 폴더로 빼두고, 업무 폴더만 연결하세요.",
    links: [["옵시디언 홈페이지", "https://obsidian.md"], ["Claude 도움말", "https://support.claude.com"]],
  },
  {
    no: "02",
    icon: "zap",
    title: "노션·드라이브·슬랙을 Claude에 붙이기",
    whatIsIt: "커넥터 = Claude에 다른 앱을 연결하는 기능이에요.",
    plain: "노션·구글 드라이브·슬랙을 Claude에 연결해두면, 자료를 복사해서 붙여넣지 않아도 \"거기서 찾아서 해줘\"라고 시킬 수 있어요. 각 앱에 '카카오로 시작하기'처럼 로그인 한 번만 해주면 연결 끝입니다.",
    diagram: <GuideConnectorHub />,
    benefit: "자료를 복사해 붙여넣는 일이 사라져요. \"드라이브에서 지난 제안서 찾아서 새 고객사 버전으로 고쳐줘\"가 됩니다.",
    steps: [
      ["claude.ai 설정에서 '커넥터'를 열어요", "연결할 수 있는 앱 목록이 쭉 나와요."],
      ["쓰고 싶은 앱에 로그인해요", "연결을 누르면 그 앱 로그인 창이 떠요. '카카오로 시작하기'처럼 한 번 승인하면 끝."],
      ["대화에서 그 앱을 콕 집어 시켜요", "\"노션에서 ○○ 찾아서 요약해줘\"라고 하면 Claude가 알아서 검색하고 읽어옵니다."],
      ["다 연결할 필요 없어요", "자주 쓰는 한두 개부터 시작하세요."],
    ],
    examples: [
      "드라이브의 지난 제안서를 새 고객사 버전으로 고치기",
      "노션 온보딩 문서를 바탕으로 신규 입사자 FAQ 만들기",
      "슬랙 채널의 이번 주 대화를 주간 보고 초안으로 요약하기",
    ],
    caution: "Claude는 그 앱에서 '내가 볼 수 있는 것'을 똑같이 봅니다. 회사 계정을 연결하기 전에 회사 보안 정책을 꼭 먼저 확인하세요.",
    links: [["Claude 도움말", "https://support.claude.com"]],
  },
  {
    no: "03",
    icon: "pen",
    title: "매니패스트 — 기획서를 대신 써주는 AI",
    whatIsIt: "매니패스트(manyfast.io) = 기획서 만들기를 도와주는 AI 서비스예요.",
    plain: "만들고 싶은 걸 채팅으로 설명하면, 개발팀에 건넬 수 있는 기획 문서와 대략의 화면 스케치(와이어프레임)까지 만들어 줍니다. 기획을 처음 해봐도 AI가 물어보는 것에 답만 하면 돼요.",
    diagram: <GuidePlanFlow />,
    benefit: "\"스펙이 안 나왔다\"(2강)는 말을 듣기 전에, 개발팀에 건넬 수 있는 기획 문서를 스스로 만들어 볼 수 있어요.",
    steps: [
      ["manyfast.io에 가입해요", "무료로 시작할 수 있어요 (한 달에 30번 정도)."],
      ["만들고 싶은 걸 설명해요", "머릿속 생각을 글로 쓰거나, 기존 메모 파일을 올려도 돼요."],
      ["AI와 대화하며 다듬어요", "AI가 되물으면 답만 하면, 문서가 차곡차곡 만들어져요."],
      ["파일로 내보내 전달해요", "완성된 기획서·화면 스케치를 파일로 받아 개발팀에 주면 됩니다."],
    ],
    examples: [
      "사내 도구 아이디어를 기획서로 만들어 개발팀 미팅에 들고 가기",
      "\"이런 느낌\"이라는 말 대신 화면 스케치로 보여주기",
      "5강 바이브 코딩으로 만들기 전, 기획부터 정리해 결과물 품질 올리기",
    ],
    caution: "AI가 만든 기획서는 어디까지나 '초안'이에요. 무엇을 먼저 만들지, 사실이 맞는지는 사람이 판단해야 합니다.",
    links: [["매니패스트 홈페이지", "https://manyfast.io"]],
  },
];

function GuideSection({ g }: { g: Guide }) {
  return (
    <LessonSection no={g.no} title={g.title} desc={g.whatIsIt}>
      {/* 쉽게 말하면 — 그림보다 먼저, 크게 */}
      <Reveal>
        <div className="mt-6 rounded-lg2 border border-hairline bg-pearl px-7 py-6 max-md:px-5">
          <p className="text-[13px] font-semibold text-primary mb-2.5">쉽게 말하면</p>
          <p className="text-[16.5px] max-md:text-[15.5px] leading-[1.65] tracking-[-0.2px]">{g.plain}</p>
        </div>
      </Reveal>

      {/* 개념 그림 */}
      {g.diagram}

      {/* 이래서 편해요 */}
      <Reveal>
        <div className="mt-6 flex items-start gap-3 rounded-[14px] border border-primary bg-[#eaf3ff] px-6 py-5">
          <span className="text-primary flex-none mt-0.5"><Icon name="zap" size={18} /></span>
          <div>
            <p className="text-[13px] font-semibold text-primary mb-1">이래서 편해요</p>
            <p className="text-[15px] leading-[1.6]">{g.benefit}</p>
          </div>
        </div>
      </Reveal>

      {/* 이렇게 하면 돼요 */}
      <Reveal>
        <p className="text-[15px] font-semibold mt-8 mb-1">이렇게 하면 돼요</p>
        <div className="grid grid-cols-2 max-md:grid-cols-1 gap-4 mt-4">
          {g.steps.map(([t, d], i) => (
            <div key={t} className="flex items-start gap-4 border border-hairline rounded-[14px] px-5 py-4">
              <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-primary text-white text-[14px] font-semibold flex-none mt-0.5 tabular-nums">{i + 1}</span>
              <div>
                <p className="text-[15px] font-semibold tracking-[-0.25px] leading-[1.4]">{t}</p>
                <p className="text-[13.5px] text-ink-48 mt-1.5 leading-[1.55]">{d}</p>
              </div>
            </div>
          ))}
        </div>
      </Reveal>

      {/* 이렇게 써보세요 */}
      <Reveal>
        <div className="mt-6 border border-hairline rounded-[14px] px-6 py-5">
          <p className="text-[13px] font-semibold text-primary mb-3">이렇게 써보세요</p>
          <ul className="space-y-2.5">
            {g.examples.map((e) => (
              <li key={e} className="flex items-start gap-2.5 text-[14.5px] text-ink-80 leading-[1.55]">
                <span className="text-primary flex-none mt-0.5"><Icon name="check" size={15} strokeWidth={2.4} /></span>{e}
              </li>
            ))}
          </ul>
        </div>
      </Reveal>

      <Note warn label="주의">{g.caution}</Note>

      {/* 공식 링크 */}
      <div className="flex gap-3 mt-5 flex-wrap">
        {g.links.map(([label, url]) => (
          <a key={url} href={url} target="_blank" rel="noreferrer"
            className="inline-flex items-center gap-1.5 text-[14px] text-primary no-underline border border-primary rounded-full px-4 py-2 transition-transform active:scale-95">
            {label} <Icon name="arrow" size={13} />
          </a>
        ))}
      </div>
    </LessonSection>
  );
}

export default function Guides() {
  return (
    <main className="bg-white">
      <header className="px-6 pt-[104px] pb-10 border-b border-hairline">
        <div className="max-w-[880px] mx-auto">
          <p className="text-[13px] font-semibold text-primary tracking-[0.4px]">부록 · 천천히 따라 하세요</p>
          <h1 className="text-[40px] max-md:text-[28px] font-semibold leading-[1.15] tracking-[-0.6px] mt-4">AI 툴, 이렇게 써봐요</h1>
          <p className="text-[17px] text-ink-48 mt-4 max-w-[680px] leading-[1.65] tracking-[-0.2px]">
            강의에서 배운 걸 실제 도구에 붙이는 방법이에요. 어려운 설정은 없고,
            그림 먼저 보고 4단계만 따라 하면 됩니다. 급하지 않으니 자리에서 하나씩 해보세요.
          </p>
          <div className="flex items-center gap-5 mt-6 text-[13.5px] text-ink-48 flex-wrap">
            <span className="inline-flex items-center gap-1.5"><Icon name="wrench" size={15} /> 가이드 {GUIDES.length}개</span>
            <span className="inline-flex items-center gap-1.5"><Icon name="clock" size={15} /> 각 10분 내외</span>
            <span className="inline-flex items-center gap-1.5"><Icon name="refresh" size={15} /> 2026년 7월 기준</span>
          </div>
        </div>
      </header>

      <div className="max-w-[880px] mx-auto px-6 py-16 max-md:px-[18px]">
        {GUIDES.map((g) => <GuideSection key={g.no} g={g} />)}

        <Note label="참고">
          앱의 버튼 이름이나 화면은 가끔 바뀌어요. 순서가 조금 달라 보이면, 각 가이드 아래의 공식 홈페이지 링크를 확인하세요.
          회사 계정을 연결할 때는 보안 정책을 먼저 확인하는 것, 잊지 마세요.
        </Note>
      </div>
    </main>
  );
}
