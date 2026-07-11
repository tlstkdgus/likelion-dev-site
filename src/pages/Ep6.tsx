import EpLayout from "../components/EpLayout";
import Ep6Agent from "../components/Ep6Agent";
import Icon, { type IconName } from "../components/Icon";
import { DemoPanel, LessonSection, Note, Reveal } from "../components/ui";
import { AIEvolution, ChatbotVsAgent } from "../components/diagrams";

const TRENDS = [
  ["하네스 엔지니어링", "AI에게 좋은 온보딩 주기", "아무리 똑똑한 신입도 매뉴얼과 권한 없이는 헤맵니다. 하네스는 AI가 일하는 주변 환경 전체(도구·지침서·작업 공간·검증 장치). '에이전트가 실수하면, 다시는 같은 실수를 못 하도록 환경을 고친다'는 접근이 2026년 업계의 핵심 화두입니다. 모델이 아니라 환경을 설계해 성과를 올리는 일이죠."],
  ["컨텍스트 엔지니어링", "'좋은 질문'에서 '좋은 자료 세팅'으로", "무게중심이 '어떻게 말하느냐(워딩)'에서 '무엇을 넣어주느냐(정보)'로 옮겨갔습니다. 템플릿·지난 보고서·데이터를 함께 주면 결과가 달라집니다. 단, 검증 안 된 자료를 무작정 많이 넣으면 오히려 헷갈려 하니 '필요한 것만, 좋은 순서로'가 핵심입니다."],
  ["MCP", "AI용 표준 연결 규격 (USB-C에 비유)", "AI를 노션·슬랙·캘린더 같은 업무 도구와 연결하는 표준. 2024년 말 앤트로픽이 공개한 뒤 약 1년 만에 OpenAI·구글·마이크로소프트가 모두 채택해 사실상 업계 표준이 됐고, 2025년 말에는 특정 회사 소유를 넘어 중립 재단으로 이관됐습니다. \"그 도구 MCP 돼요?\"는 \"AI랑 연결돼요?\"라는 뜻입니다."],
  ["에이전틱 코딩", "바이브 코딩의 다음 단계", "AI가 코드를 쓰고 테스트하고 고치며, 사람은 검토합니다(Claude Code, Cursor). 'AI를 잘 쓴다'가 개인 스킬에서 조직 설계의 문제로 바뀌고 있습니다."],
] as const;

const STEPS: { icon: IconName; t: string; tie: string; d: string }[] = [
  { icon: "book", t: "맥락을 준다", tie: "컨텍스트 엔지니어링", d: "목표·배경·독자·기존 자료를 함께 건넵니다. 빈손으로 시킨 결과와 자료를 붙여 시킨 결과는 완전히 다릅니다." },
  { icon: "layers", t: "예시를 준다", tie: "few-shot", d: "원하는 결과물의 좋은 예 한둘을 보여주면 적중률이 급상승합니다. '이런 느낌'이라는 말보다 예시 파일 하나가 강력합니다." },
  { icon: "zap", t: "도구를 연결한다", tie: "MCP · 하네스", d: "노션·슬랙·파일 접근 권한을 주면 '말하기'가 '실제 실행'으로 바뀝니다. 검색하고, 읽고, 파일로 제출하는 에이전트가 됩니다." },
  { icon: "search", t: "검토하고 되먹인다", tie: "사람의 역할", d: "결과물은 언제나 초안입니다. 무엇이 왜 틀렸는지 구체적으로 피드백하면 다음 결과가 좋아집니다. 이 판단이 사람의 몫입니다." },
];

const DELEGATE = ["초안 작성 — 기획서·메일·카피의 첫 버전", "반복 정리 — 스프레드시트 가공, 회의록 요약", "탐색·조사 — 자료 수집과 비교 정리", "형식 변환 — 표를 글로, 글을 표로"];
const HUMAN = ["사실과 숫자의 최종 검증", "대외 발표·법적 책임이 걸린 문서", "회사 기밀·개인정보가 들어간 입력", "최종 판단과 의사결정"];

const TOOLS = [
  ["기획 · 문서", "Claude, 챗GPT로 기획서 초안과 회의록 요약, Notion AI로 문서 내 요약. 빈손으로 시키지 말고 기존 문서를 함께 제공하는 것이 핵심입니다."],
  ["디자인", "Figma AI로 시안, 이미지 생성 도구로 컨셉 이미지. '이런 느낌'이라는 말 대신 AI 컨셉 이미지로 소통하면 왕복이 크게 줄어듭니다."],
  ["마케팅", "카피 A/B 시안을 여러 개 뽑고 사람이 고르는 방식, 숏폼·이미지 소재 제작, SEO 개요 작성."],
  ["운영 · 공통", "스프레드시트 정리, 감정 소모가 큰 메일(거절·독촉) 초안, 설문 문항 설계."],
] as const;

const AI_TOOLS: { icon: IconName; cat: string; tools: string[]; when: string }[] = [
  { icon: "pen", cat: "글쓰기 · 기획", tools: ["Claude", "ChatGPT", "Gemini"], when: "기획서·메일·카피 초안, 아이데이션, 긴 글 요약" },
  { icon: "search", cat: "리서치 · 검색", tools: ["Perplexity", "Notion AI"], when: "출처가 붙는 자료 조사, 사내 문서 검색·요약" },
  { icon: "chart", cat: "슬라이드 · 문서", tools: ["Gamma", "Canva"], when: "초안 슬라이드 자동 생성, 문서 디자인" },
  { icon: "layers", cat: "이미지 · 디자인", tools: ["Midjourney", "Adobe Firefly", "Figma AI"], when: "컨셉 이미지, 시안, 배너 목업 소통" },
  { icon: "play", cat: "영상 · 음성", tools: ["Runway", "ElevenLabs", "HeyGen"], when: "숏폼 영상, 더빙·성우, 아바타 발표" },
  { icon: "message", cat: "회의 · 기록", tools: ["Otter", "Fireflies"], when: "회의 자동 녹취·요약, 액션아이템 추출" },
  { icon: "zap", cat: "프로토타입", tools: ["v0", "Bolt", "Claude Code"], when: "코딩 없이 동작하는 시안 — 5강의 바이브 코딩" },
];

const HOMEWORK = [
  "이번 주 반복 업무 하나를 골라, AI에게 초안을 맡겨 봅니다.",
  "'이런 느낌' 대신 좋은 예시 두 개를 붙여서 요청해 봅니다.",
  "AI가 준 결과물의 숫자·사실 하나를 직접 검증해 봅니다.",
];

export default function Ep6() {
  return (
    <EpLayout index={5} demoCount={1}
      cheat={'"그 업무, 에이전트한테 위임할 수 있게 하네스부터 잡아보면 어때요?"'}
      cheatWhy="이 문장을 자연스럽게 쓰는 순간이 이 과정의 수료 시점입니다. 6주간 고생하셨습니다.">

      <div className="max-w-[880px] mx-auto px-6 py-16 max-md:px-[18px]">

        <LessonSection no="01" title="에이전트 — 묻고 답하기에서 '일 시키기'로"
          desc="올해 AI 판의 가장 큰 변화입니다. 여러 단계의 작업을 스스로 계획하고 도구를 사용하는 AI를 에이전트라고 부릅니다.">
          <ChatbotVsAgent />
          <DemoPanel title="챗봇과 에이전트 비교"
            sub="같은 요청을 두 방식에 동시에 시켜 봅니다. 응답이 만들어지는 과정의 차이에 주목하세요.">
            <Ep6Agent />
          </DemoPanel>
        </LessonSection>

        <LessonSection no="02" title="나머지 키워드 네 가지"
          desc="에이전트를 이해했다면, 나머지는 전부 '에이전트를 잘 부리는 방법'에 대한 키워드입니다.">
          <AIEvolution />
          <Reveal>
            <div className="mt-6">
              {TRENDS.map(([t, m, d], i) => (
                <div key={t} className="flex items-start gap-5 py-6 border-b border-[#ececee] last:border-b-0">
                  <span className="text-[13px] font-semibold text-primary tabular-nums flex-none mt-1">{String(i + 2).padStart(2, "0")}</span>
                  <div>
                    <div className="flex items-baseline gap-3 flex-wrap">
                      <span className="text-[17px] font-semibold tracking-[-0.3px]">{t}</span>
                      <span className="text-[14px] text-primary">{m}</span>
                    </div>
                    <p className="text-[14px] text-ink-48 mt-1.5 leading-[1.6] max-w-[640px]">{d}</p>
                  </div>
                </div>
              ))}
            </div>
            <Note label="한 줄로 꿰기">
              AI 활용은 <b>프롬프트 엔지니어링(어떻게 물을까) → 컨텍스트 엔지니어링(무엇을 줄까) → 하네스 엔지니어링(어떤 환경에서 일하게 할까)</b> 순으로 발전해 왔습니다.
              지금 회사들이 경쟁하는 지점은 '더 좋은 모델 고르기'가 아니라 '<b>AI가 일할 환경을 잘 설계하기</b>'로 옮겨갔습니다.
            </Note>
          </Reveal>
        </LessonSection>

        <LessonSection no="03" title="AI에게 일 잘 시키는 법 — 실전 4단계"
          desc="위 키워드들은 결국 이 네 단계로 요약됩니다. 오늘 배운 개념이 실제 업무에서 어떻게 쓰이는지 연결해 보세요.">
          <Reveal>
            <div className="mt-6 grid grid-cols-2 max-md:grid-cols-1 gap-4">
              {STEPS.map((s, i) => (
                <div key={s.t} className="rounded-[14px] border border-hairline p-6">
                  <div className="flex items-center gap-3">
                    <span className="inline-flex items-center justify-center w-9 h-9 rounded-full bg-[#eaf3ff] text-primary flex-none">
                      <Icon name={s.icon} size={18} />
                    </span>
                    <div>
                      <p className="text-[12px] text-ink-48 tabular-nums">STEP {i + 1} · {s.tie}</p>
                      <p className="text-[16px] font-semibold tracking-[-0.3px]">{s.t}</p>
                    </div>
                  </div>
                  <p className="text-[14px] text-ink-80 leading-[1.6] mt-3.5">{s.d}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </LessonSection>

        <LessonSection no="04" title="맡겨도 되는 일 vs 사람이 꼭 봐야 하는 일"
          desc="5강에서 개발자의 일이 '타이핑'에서 '판단과 검토'로 옮겨간다고 했습니다. 우리 업무도 똑같습니다.">
          <Reveal>
            <div className="grid grid-cols-2 max-md:grid-cols-1 gap-4 mt-6">
              <div className="rounded-[14px] border border-hairline p-6">
                <p className="text-[14px] font-semibold text-primary mb-4 flex items-center gap-2"><Icon name="bot" size={16} /> AI에게 맡기기 좋은 일</p>
                <ul className="space-y-2.5">
                  {DELEGATE.map((t) => (
                    <li key={t} className="flex items-start gap-2.5 text-[14px] text-ink-80 leading-[1.5]">
                      <span className="text-primary flex-none mt-0.5"><Icon name="check" size={15} strokeWidth={2.4} /></span>{t}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="rounded-[14px] border border-hairline p-6">
                <p className="text-[14px] font-semibold text-[#b3402f] mb-4 flex items-center gap-2"><Icon name="alert" size={16} /> 사람이 꼭 봐야 하는 일</p>
                <ul className="space-y-2.5">
                  {HUMAN.map((t) => (
                    <li key={t} className="flex items-start gap-2.5 text-[14px] text-ink-80 leading-[1.5]">
                      <span className="text-[#b3402f] flex-none mt-0.5"><Icon name="close" size={15} /></span>{t}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Reveal>
        </LessonSection>

        <LessonSection no="05" title="직군별 실무 적용"
          desc="내일 출근해서 바로 쓸 수 있는 것들입니다.">
          <Reveal>
            <div className="grid grid-cols-2 max-md:grid-cols-1 gap-4 mt-6">
              {TOOLS.map(([t, d]) => (
                <div key={t} className="rounded-[14px] border border-hairline px-6 py-5">
                  <p className="text-[15px] font-semibold text-primary">{t}</p>
                  <p className="text-[14px] text-ink-80 mt-2 leading-[1.65]">{d}</p>
                </div>
              ))}
            </div>
            <Note warn label="주의">
              AI 결과물은 어디까지나 초안입니다 — 숫자와 사실은 반드시 검증하세요. 회사 기밀은 보안 정책 확인 후에 입력해야 합니다.
            </Note>
          </Reveal>
        </LessonSection>

        <LessonSection no="06" title="요즘 쓰기 좋은 AI 툴 모음"
          desc="작업 유형별 대표 도구입니다. 완벽한 순위표가 아니라, 어디서부터 손대면 좋을지의 출발점 — '이런 느낌' 대신 바로 하나 열어 써보세요.">
          <Reveal>
            <div className="grid grid-cols-2 max-md:grid-cols-1 gap-4 mt-6">
              {AI_TOOLS.map((x) => (
                <div key={x.cat} className="rounded-[14px] border border-hairline p-6">
                  <div className="flex items-center gap-2.5">
                    <span className="inline-flex items-center justify-center w-9 h-9 rounded-full bg-[#eaf3ff] text-primary flex-none">
                      <Icon name={x.icon} size={18} />
                    </span>
                    <p className="text-[16px] font-semibold tracking-[-0.3px]">{x.cat}</p>
                  </div>
                  <div className="flex flex-wrap gap-2 mt-3.5">
                    {x.tools.map((t) => (
                      <span key={t} className="inline-flex items-center bg-parchment rounded-full px-3 py-1 text-[13px] font-medium">{t}</span>
                    ))}
                  </div>
                  <p className="text-[13.5px] text-ink-48 mt-3 leading-[1.55]">이럴 때 — {x.when}</p>
                </div>
              ))}
            </div>
          </Reveal>
          <Note warn label="갱신 주의">
            AI 툴 판은 분기마다 바뀝니다. 이 목록은 2026년 상반기 기준이니 팀에서 주기적으로 업데이트하세요.
            그리고 회사 기밀·개인정보 입력은 반드시 각 툴의 보안 정책을 확인한 뒤에.
          </Note>
        </LessonSection>

        <LessonSection no="07" title="6주의 여정을 마치며"
          desc="구조가 보이고, 언어가 들리고, 협업이 이해되고, 요청이 달라지고, 직접 만들었고, 흐름까지 읽게 됐습니다.">
          <Reveal>
            <div className="flex flex-wrap gap-2.5 mt-6">
              {["구조가 보인다", "언어가 들린다", "협업이 이해된다", "요청을 잘한다", "직접 만들었다", "AI 흐름을 읽는다"].map((t, i) => (
                <span key={t} className="inline-flex items-center gap-2 bg-parchment rounded-full px-4 py-2 text-[14px] tracking-[-0.2px]">
                  <span className="text-primary font-semibold tabular-nums">{i + 1}주</span> {t}
                </span>
              ))}
            </div>

            <div className="mt-8 rounded-[14px] border border-hairline bg-pearl p-6">
              <p className="text-[13px] font-semibold tracking-[0.3px] mb-3.5">이번 주 실천 과제</p>
              <ul className="space-y-2.5">
                {HOMEWORK.map((t, i) => (
                  <li key={t} className="flex items-start gap-3 text-[14.5px] text-ink-80 leading-[1.55]">
                    <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-primary text-white text-[11px] font-semibold flex-none mt-0.5 tabular-nums">{i + 1}</span>{t}
                  </li>
                ))}
              </ul>
            </div>

            <p className="text-[17px] font-medium mt-8">이제 '아는 척'이 아니라, 실제로 이해하는 사람이 됐습니다.</p>
          </Reveal>
        </LessonSection>
      </div>
    </EpLayout>
  );
}
