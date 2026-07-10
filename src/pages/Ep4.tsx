import EpLayout from "../components/EpLayout";
import Ep4Builder from "../components/Ep4Builder";
import { DemoPanel, LessonSection, Note, Reveal } from "../components/ui";

const MISUNDER = [
  ["\"버튼 하나만 추가하면 되죠?\"", "(\"기둥 하나만 옮기면 되죠?\")"],
  ["\"간단한 거예요\"", "(간단한지는 제가 판단해야…)"],
  ["\"오늘 안에 되죠?\"", "(무엇을 만드는지도 아직…)"],
  ["\"안 돼요, 확인 좀요\"", "(무엇이, 어디서, 어떻게…?)"],
] as const;

export default function Ep4() {
  return (
    <EpLayout index={3}
      cheat={'"재현 경로랑 스크린샷 정리해서 이슈로 올려둘게요."'}
      cheatWhy="개발자가 가장 반가워하는 말입니다. 요청의 3요소, 기록, 비동기 소통 — 이 강의 전체가 이 한 문장에 들어 있습니다.">

      <div className="max-w-[880px] mx-auto px-6 py-16 max-md:px-[18px]">

        <LessonSection no="01" title="서로가 서로에게 하는 오해"
          desc="누가 잘못해서가 아닙니다. 서로 보고 있는 것이 다를 뿐입니다. 이 강의에서 그 간극을 메웁니다.">
          <Reveal>
            <div className="grid grid-cols-2 max-md:grid-cols-1 gap-x-4 gap-y-1 mt-7">
              <p className="text-[13px] font-semibold text-ink-48 pb-2">우리가 하는 말</p>
              <p className="text-[13px] font-semibold text-primary pb-2 max-md:hidden">개발자가 듣는 말</p>
              {MISUNDER.map(([a, b]) => (
                <div key={a} className="contents">
                  <div className="bg-parchment rounded-[14px] px-5 py-3.5 text-[14.5px] mb-3">{a}</div>
                  <div className="bg-[#eaf3ff] rounded-[14px] px-5 py-3.5 text-[14.5px] text-[#1a5a9e] mb-3">{b}</div>
                </div>
              ))}
            </div>
          </Reveal>
        </LessonSection>

        <LessonSection no="02" title="버튼 하나의 빙산"
          desc="'버튼 하나'가 사흘 걸리는 이유는, 보이는 것이 작업의 일부이기 때문입니다.">
          <Reveal>
            <div className="mt-6 rounded-lg2 overflow-hidden border border-hairline">
              <div className="bg-white px-7 py-5 text-[15.5px]"><b>수면 위</b> — 버튼 하나 그리기 · <b className="text-primary">1시간</b></div>
              <div className="bg-[#0b2536] text-[#cfe8ff] px-7 py-6">
                <p className="text-[14px] font-semibold">수면 아래</p>
                <ul className="mt-3 space-y-1.5">
                  {["동작 정의 — 눌리면 정확히 무엇이 되어야 하는가", "API 수정과 DB 변경", "테스트 코드 작성, 기기·브라우저 호환성 확인", "QA · 코드 리뷰 · 배포 일정 조율"].map((t) => (
                    <li key={t} className="text-[14.5px] tracking-[-0.2px] flex gap-2.5"><span className="text-[#5599cc] flex-none">—</span>{t}</li>
                  ))}
                </ul>
                <p className="mt-4 font-semibold text-[15px]">합쳐서 사흘.</p>
              </div>
            </div>
            <Note>
              반대의 경우도 있습니다. 어려워 보이는 요청이 10분짜리일 때도 많습니다.
              결론 — 어렵다/쉽다를 스스로 판단하지 말고, 그냥 물어보세요.
            </Note>
          </Reveal>
        </LessonSection>

        <LessonSection no="03" title="좋은 요청의 3요소"
          desc="현상, 재현 방법, 기대 동작. 세 가지가 갖춰진 요청은 핑퐁 없이 한 번에 처리됩니다.">
          <DemoPanel title="요청 품질 시뮬레이터"
            sub="3요소를 하나씩 켜면서 같은 요청이 어떻게 달라지는지, 예상 핑퐁 횟수가 어떻게 줄어드는지 확인해 보세요.">
            <Ep4Builder />
          </DemoPanel>
          <Note label="왜 재현 방법이 가장 중요한가">
            개발자는 자기 화면에서 문제를 재현해야 고칠 수 있습니다. 재현되지 않는 버그는 목격자 없는 사건과 같습니다.
          </Note>
        </LessonSection>

        <LessonSection no="04" title="일정의 숨은 구조"
          desc="'이틀이면 돼요'라는 말에는 보통 리뷰, QA, 배포 대기가 빠져 있습니다.">
          <Reveal>
            <div className="mt-6 flex rounded-[14px] overflow-hidden border border-hairline text-[13px] font-medium max-md:flex-col">
              <div className="bg-primary text-white px-5 py-4 flex-[3]">개발 · 2일</div>
              <div className="bg-[#4d8fd6] text-white px-5 py-4 flex-[1]">리뷰 · 0.5일</div>
              <div className="bg-[#8fb8e8] text-[#12365c] px-5 py-4 flex-[2]">QA · 1일</div>
              <div className="bg-parchment text-ink-48 px-5 py-4 flex-[2]">배포 대기 · +α</div>
            </div>
            <Note label="마법의 질문">
              "그게 배포까지 이틀인가요, 개발만 이틀인가요?" — 일정 사고의 80%를 이 질문 하나가 예방합니다.
            </Note>
          </Reveal>
        </LessonSection>

        <LessonSection no="05" title="조르지 말고 협상하기"
          desc="일정을 앞당기는 방법은 재촉이 아니라 범위 조정입니다.">
          <Reveal>
            <div className="grid grid-cols-2 max-md:grid-cols-1 gap-4 mt-6">
              <div className="rounded-[14px] border border-hairline px-6 py-5">
                <p className="text-[13px] font-semibold text-primary">범위 카드</p>
                <p className="text-[15px] mt-2 leading-[1.6]">"더 빨리 안 돼요?" 대신 <b>"정렬 기능만 빼면 언제 가능해요?"</b> — 기능을 빼는 협상은 언제나 환영받습니다.</p>
              </div>
              <div className="rounded-[14px] border border-hairline px-6 py-5">
                <p className="text-[13px] font-semibold text-primary">끼어들기 비용</p>
                <p className="text-[15px] mt-2 leading-[1.6]">5분짜리 질문이 개발자의 집중 복귀에 20분 이상을 요구합니다. 급하지 않다면 <b>"슬랙에 남겨둘 테니 시간 될 때 봐주세요."</b></p>
              </div>
            </div>
          </Reveal>
        </LessonSection>
      </div>
    </EpLayout>
  );
}
