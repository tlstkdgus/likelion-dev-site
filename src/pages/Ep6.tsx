import EpLayout from "../components/EpLayout";
import Ep6Agent from "../components/Ep6Agent";
import { DemoPanel, LessonSection, Note, Reveal } from "../components/ui";

const TRENDS = [
  ["하네스 엔지니어링", "AI에게 좋은 온보딩 주기", "아무리 똑똑한 신입도 매뉴얼과 권한 없이는 헤맵니다. 하네스는 AI가 일하는 주변 환경 전체(도구·지침서·작업 공간). 모델이 아니라 환경을 설계해 성과를 올리는 일입니다."],
  ["컨텍스트 엔지니어링", "'좋은 질문'에서 '좋은 자료 세팅'으로", "어떤 자료를, 얼마나, 어떤 순서로 줄지 설계하는 기술. 템플릿과 지난 보고서, 데이터를 함께 주면 결과물의 수준이 달라집니다."],
  ["MCP", "AI용 표준 연결 규격", "AI를 노션·슬랙·캘린더 같은 업무 도구와 연결하는 표준. \"그 도구 MCP 돼요?\"는 \"AI랑 연결돼요?\"라는 뜻입니다."],
  ["에이전틱 코딩", "바이브 코딩의 다음 단계", "AI가 코드를 쓰고 테스트하고 고치며, 사람은 검토합니다(Claude Code, Cursor). 'AI를 잘 쓴다'가 개인 스킬에서 조직 설계의 문제로 바뀌고 있습니다."],
] as const;

const TOOLS = [
  ["기획 · 문서", "Claude, 챗GPT로 기획서 초안과 회의록 요약, Notion AI로 문서 내 요약. 빈손으로 시키지 말고 기존 문서를 함께 제공하는 것이 핵심입니다."],
  ["디자인", "Figma AI로 시안, 이미지 생성 도구로 컨셉 이미지. '이런 느낌'이라는 말 대신 AI 컨셉 이미지로 소통하면 왕복이 크게 줄어듭니다."],
  ["마케팅", "카피 A/B 시안을 여러 개 뽑고 사람이 고르는 방식, 숏폼·이미지 소재 제작, SEO 개요 작성."],
  ["운영 · 공통", "스프레드시트 정리, 감정 소모가 큰 메일(거절·독촉) 초안, 설문 문항 설계."],
] as const;

export default function Ep6() {
  return (
    <EpLayout index={5}
      cheat={'"그 업무, 에이전트한테 위임할 수 있게 하네스부터 잡아보면 어때요?"'}
      cheatWhy="이 문장을 자연스럽게 쓰는 순간이 이 과정의 수료 시점입니다. 6주간 고생하셨습니다.">

      <div className="max-w-[880px] mx-auto px-6 py-16 max-md:px-[18px]">

        <LessonSection no="01" title="에이전트 — 묻고 답하기에서 '일 시키기'로"
          desc="올해 AI 판의 가장 큰 변화입니다. 여러 단계의 작업을 스스로 계획하고 도구를 사용하는 AI를 에이전트라고 부릅니다.">
          <DemoPanel title="챗봇과 에이전트 비교"
            sub="같은 요청을 두 방식에 동시에 시켜 봅니다. 응답이 만들어지는 과정의 차이에 주목하세요.">
            <Ep6Agent />
          </DemoPanel>
        </LessonSection>

        <LessonSection no="02" title="나머지 키워드 네 가지"
          desc="에이전트를 이해했다면, 나머지는 전부 '에이전트를 잘 부리는 방법'에 대한 키워드입니다.">
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
          </Reveal>
        </LessonSection>

        <LessonSection no="03" title="직군별 실무 적용"
          desc="트렌드는 여기까지. 내일 출근해서 바로 쓸 수 있는 것들입니다.">
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

        <LessonSection no="04" title="6주의 여정을 마치며"
          desc="구조가 보이고, 언어가 들리고, 협업이 이해되고, 요청이 달라지고, 직접 만들었고, 흐름까지 읽게 됐습니다.">
          <Reveal>
            <div className="flex flex-wrap gap-2.5 mt-6">
              {["구조가 보인다", "언어가 들린다", "협업이 이해된다", "요청을 잘한다", "직접 만들었다", "AI 흐름을 읽는다"].map((t, i) => (
                <span key={t} className="inline-flex items-center gap-2 bg-parchment rounded-full px-4 py-2 text-[14px] tracking-[-0.2px]">
                  <span className="text-primary font-semibold tabular-nums">{i + 1}주</span> {t}
                </span>
              ))}
            </div>
            <p className="text-[17px] font-medium mt-7">이제 '아는 척'이 아니라, 실제로 이해하는 사람이 됐습니다.</p>
          </Reveal>
        </LessonSection>
      </div>
    </EpLayout>
  );
}
