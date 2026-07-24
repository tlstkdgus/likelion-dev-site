import EpLayout from "../components/EpLayout";
import Ep5ApiBuilder from "../components/Ep5ApiBuilder";
import Ep5Roulette from "../components/Ep5Roulette";
import Icon from "../components/Icon";
import { DemoPanel, LessonSection, Note, Reveal } from "../components/ui";
import { TokenPredict, VibeLoop } from "../components/diagrams";

const API_PARTS = [
  ["target", "주소 (엔드포인트)", "무엇에 대한 요청인가 — 예: /menus"],
  ["refresh", "방식 (메서드)", "그것을 어떻게 할 것인가 — 조회·생성·수정·삭제"],
  ["file", "주고받을 내용", "무엇을 보내고 무엇을 돌려받을 것인가"],
] as const;

const METHODS = [
  ["GET", "조회", "\"메뉴판 좀 보여주세요\"", "#1a7a38", "#e8f7ee"],
  ["POST", "생성", "\"신메뉴 등록해 주세요\"", "#0066cc", "#eaf3ff"],
  ["PUT", "수정", "\"이 메뉴 이름 바꿔 주세요\"", "#c99a10", "#fbf6e3"],
  ["DELETE", "삭제", "\"이 메뉴 빼 주세요\"", "#b3402f", "#fdeeee"],
] as const;

const TERMS = [
  ["pen", "프롬프트", "AI에게 전달하는 주문서"],
  ["chart", "토큰", "글을 세는 단위이자 요금의 기준"],
  ["alert", "할루시네이션", "그럴듯한 거짓말 — 검증이 필수인 이유"],
] as const;

const STILL = [
  ["lock", "보안", "코드에 뚫린 구멍은 누가 확인하는가"],
  ["layers", "설계", "10만 명이 몰려도 버티는 구조는 누가 만드는가"],
  ["wrench", "유지보수", "6개월 뒤에도 고칠 수 있는 코드는 누가 보장하는가"],
] as const;

const YOURS = [
  ["refresh", "자동화", "매주 반복하는 엑셀 정리를 말로 시키기"],
  ["monitor", "프로토타입", "말 대신 움직이는 시안 — 소통 속도가 달라집니다"],
  ["zap", "사내 도구", "당번 정하기, 이 페이지의 점심 룰렛 같은 것들"],
] as const;

export default function Ep5() {
  return (
    <EpLayout index={4} demoCount={2}
      cheat={'"이건 바이브 코딩으로 프로토타입 먼저 만들어보고 판단하면 어때요?"'}
      cheatWhy="아이디어 논쟁을 30분 만에 끝내는 말입니다. 말로 설명하는 대신 움직이는 것을 보여주는 쪽이 언제나 빠릅니다.">

      <div className="max-w-[880px] mx-auto px-6 py-16 max-md:px-[18px]">

        <LessonSection no="01" title="LLM의 정체"
          desc="챗GPT와 Claude의 원리는 한 문장으로 요약됩니다.">
          <Reveal>
            <div className="mt-7 rounded-lg2 border border-hairline bg-pearl px-8 py-8">
              <p className="text-[22px] max-md:text-[18px] font-semibold leading-[1.45] tracking-[-0.3px]">
                인터넷의 방대한 텍스트를 학습해,<br />
                <span className="text-primary">'다음에 올 말'을 확률적으로 아주 잘 예측하는 기계.</span>
              </p>
              <p className="text-[15px] text-ink-48 mt-4">코드도 결국 텍스트이기 때문에, 코드도 씁니다.</p>
            </div>
            <TokenPredict />
            <div className="grid grid-cols-3 max-md:grid-cols-1 gap-4 mt-5">
              {TERMS.map(([ic, t, d]) => (
                <div key={t} className="rounded-[14px] border border-hairline px-5 py-5">
                  <span className="text-primary"><Icon name={ic as never} size={20} /></span>
                  <p className="text-[15.5px] font-semibold mt-2.5">{t}</p>
                  <p className="text-[13px] text-ink-48 mt-1 leading-[1.5]">{d}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </LessonSection>

        <LessonSection no="02" title="코딩 없이 만든 결과물"
          desc="아래 룰렛은 강의 중 프롬프트 한 줄로 만든 실제 동작하는 결과물입니다. 코드는 한 줄도 직접 쓰지 않았습니다.">
          <DemoPanel title="팀 점심 룰렛"
            sub="돌리기를 누르면 감속하며 멈추고, 당첨 메뉴를 알려줍니다. 하단에 이 룰렛을 만든 실제 프롬프트가 있습니다.">
            <Ep5Roulette />
          </DemoPanel>
          <Note>
            방금 여러분은 <b>요청 → 확인 → 수정 요청 → 반복</b>이라는 개발 프로세스를 목격했습니다.
            이것이 바이브 코딩이고, 기획자와 개발자가 하는 실제 개발 과정의 축소판입니다.
          </Note>
          <VibeLoop />
        </LessonSection>

        <LessonSection no="03" title="그럼 주방은 누가 만드나 — API 설계"
          desc="방금 만든 룰렛은 홀(화면)만 만든 것입니다. 메뉴를 저장하고 꺼내오려면 주방으로 보낼 '주문서 양식'을 정해야 합니다. 그 양식을 정하는 일이 바로 API를 만드는 일입니다.">
          <Reveal>
            <div className="grid grid-cols-3 max-md:grid-cols-1 gap-4 mt-6">
              {API_PARTS.map(([ic, t, d]) => (
                <div key={t} className="rounded-[14px] border border-hairline px-5 py-5">
                  <span className="text-primary"><Icon name={ic as never} size={20} /></span>
                  <p className="text-[15.5px] font-semibold mt-2.5">{t}</p>
                  <p className="text-[13px] text-ink-48 mt-1 leading-[1.5]">{d}</p>
                </div>
              ))}
            </div>
            <div className="grid grid-cols-4 max-md:grid-cols-2 gap-3 mt-4">
              {METHODS.map(([m, k, ex, c, bg]) => (
                <div key={m} className="rounded-[14px] border border-hairline px-4 py-4">
                  <span className="text-[11px] font-semibold rounded px-1.5 py-0.5" style={{ color: c, background: bg }}>{m}</span>
                  <p className="text-[14px] font-semibold mt-2">{k}</p>
                  <p className="text-[12px] text-ink-48 mt-1 leading-[1.45]">{ex}</p>
                </div>
              ))}
            </div>
          </Reveal>

          <DemoPanel title="주문서 양식 만들기"
            sub="점심 룰렛에 '메뉴 관리' 기능을 붙인다고 가정합니다. 하고 싶은 일을 고르고 담을 정보를 켜면, 완성된 API 명세가 조립됩니다.">
            <Ep5ApiBuilder />
          </DemoPanel>

          <Note label="개발자와 이렇게 이야기하세요">
            API를 만든다는 것은 결국 <b>주소·방식·주고받을 내용을 합의하는 일</b>입니다.
            그래서 <b>"이 기능 API 스펙 먼저 맞춰볼까요?"</b>라고 물으면, 화면을 그리기 전에 무엇을 주고받을지부터 정하자는 뜻이 됩니다.
            이 합의가 빠를수록 프론트와 백엔드가 동시에 작업할 수 있습니다.
          </Note>
        </LessonSection>

        <LessonSection no="04" title="그럼 개발자는 필요 없어지는가"
          desc="결론부터 — 아닙니다. 대신 개발자의 일이 '타이핑'에서 '판단과 검토'로 이동하고 있습니다.">
          <Reveal>
            <div className="grid grid-cols-3 max-md:grid-cols-1 gap-4 mt-6">
              {STILL.map(([ic, t, d]) => (
                <div key={t} className="rounded-[14px] border border-hairline px-5 py-5">
                  <span className="text-primary"><Icon name={ic as never} size={20} /></span>
                  <p className="text-[15.5px] font-semibold mt-2.5">{t}</p>
                  <p className="text-[13px] text-ink-48 mt-1 leading-[1.5]">{d}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </LessonSection>

        <LessonSection no="05" title="여러분이 가져갈 수 있는 영역"
          desc="완성도 높은 서비스는 여전히 개발자의 일이지만, '장난감 수준'까지는 이제 누구나 만들 수 있습니다.">
          <Reveal>
            <div className="grid grid-cols-3 max-md:grid-cols-1 gap-4 mt-6">
              {YOURS.map(([ic, t, d]) => (
                <div key={t} className="rounded-[14px] border border-hairline px-5 py-5">
                  <span className="text-primary"><Icon name={ic as never} size={20} /></span>
                  <p className="text-[15.5px] font-semibold mt-2.5">{t}</p>
                  <p className="text-[13px] text-ink-48 mt-1 leading-[1.5]">{d}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </LessonSection>
      </div>
    </EpLayout>
  );
}
