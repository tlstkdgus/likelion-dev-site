import EpLayout from "../components/EpLayout";
import Ep2Cards from "../components/Ep2Cards";
import Ep2Quiz from "../components/Ep2Quiz";
import { DemoPanel, DefRow, LessonSection, Note, Reveal } from "../components/ui";
import { DeployPipeline, KanbanBoard } from "../components/diagrams";

const DEPLOY = [
  ["로컬", "개발자 본인 컴퓨터에서 개발"],
  ["스테이징", "리허설 매장에서 최종 점검"],
  ["운영 (프로덕션)", "진짜 매장 — 고객 앞으로"],
] as const;

const SCHEDULE = [
  { term: "이슈 · 티켓", mean: "할 일 카드", desc: "\"이슈로 올려주세요\" = 기록으로 남겨주세요" },
  { term: "스펙", mean: "기능 정의서", desc: "\"스펙이 안 나왔다\" = 무엇을 만들지 확정되지 않음" },
  { term: "MVP", mean: "핵심만 담은 첫 버전", desc: "Minimum Viable Product" },
  { term: "스프린트", mean: "1~2주 업무 주기", desc: "이 주기 단위로 계획하고 회고합니다" },
  { term: "마일스톤", mean: "중간 목표", desc: "\"다음 마일스톤까지\" = 다음 중간 목표 시점까지" },
] as const;

export default function Ep2() {
  return (
    <EpLayout index={1}
      cheat={'"이거 핫픽스로 나가야 하나요, 다음 릴리즈에 포함해도 되나요?"'}
      cheatWhy="긴급도를 스스로 판단해 옵션을 제시하는 질문입니다. 이 한 문장이면 개발팀이 여러분을 다시 보게 됩니다.">

      <div className="max-w-[880px] mx-auto px-6 py-16 max-md:px-[18px]">

        <LessonSection no="01" title="이 대화, 몇 %나 이해되세요"
          desc="실제 개발팀 슬랙에서 오간 대화입니다. 강의가 끝나면 다시 돌아와 읽어 보세요.">
          <Reveal className="mt-7">
            {["\"그 이슈 로컬에서는 재현이 안 되는데요\"",
              "\"스테이징에서 터져요. 어제 머지된 PR 때문인 것 같은데 롤백할까요?\"",
              "\"핫픽스로 갈게요. QA 한 번만 돌려주세요\""].map((t) => (
              <div key={t}><span className="inline-block bg-parchment rounded-[18px] px-5 py-3 text-[15px] tracking-[-0.25px] my-1.5">{t}</span></div>
            ))}
            <Note>사실 이것은 "문제가 생겨서 급하게 고치기로 했다"는 아주 평범한 대화입니다.</Note>
          </Reveal>
        </LessonSection>

        <LessonSection no="02" title="용어 카드 여덟 장"
          desc="회의에서 가장 자주 나오는 용어들입니다. 카드를 클릭해 뜻을 확인해 보세요.">
          <Reveal><Ep2Cards /></Reveal>
        </LessonSection>

        <LessonSection no="03" title="배포 — 신메뉴가 매장에 나가는 길"
          desc="코드가 실제 서비스에 반영되는 과정에는 정해진 단계가 있습니다.">
          <DeployPipeline />
          <Reveal>
            <div className="grid grid-cols-3 max-md:grid-cols-1 gap-4 mt-6">
              {DEPLOY.map(([t, d], i) => (
                <div key={t} className={`rounded-[14px] border px-5 py-5 ${i === 2 ? "border-primary bg-[#eaf3ff]" : "border-hairline"}`}>
                  <p className="text-[12px] font-semibold text-ink-48 tabular-nums">STEP {i + 1}</p>
                  <p className={`text-[16px] font-semibold mt-1.5 ${i === 2 ? "text-primary" : ""}`}>{t}</p>
                  <p className="text-[13px] text-ink-48 mt-1 leading-[1.5]">{d}</p>
                </div>
              ))}
            </div>
            <div className="grid grid-cols-2 max-md:grid-cols-1 gap-4 mt-4">
              <div className="rounded-[14px] border border-hairline px-5 py-4">
                <p className="text-[15px] font-semibold text-primary">롤백</p>
                <p className="text-[13.5px] text-ink-48 mt-1">문제가 생기면 이전 버전으로 되돌리는 것</p>
              </div>
              <div className="rounded-[14px] border border-hairline px-5 py-4">
                <p className="text-[15px] font-semibold text-primary">핫픽스</p>
                <p className="text-[13.5px] text-ink-48 mt-1">정식 절차를 기다릴 수 없을 때의 응급 수술</p>
              </div>
            </div>
            <Note label="불문율">
              "금요일 오후에는 배포하지 않는다." 주말에 사고가 나면 고칠 사람이 없기 때문입니다.
            </Note>
          </Reveal>
        </LessonSection>

        <LessonSection no="04" title="일정 회의에서 나오는 말"
          desc="일정과 범위를 이야기할 때 반복적으로 등장하는 다섯 가지입니다.">
          <KanbanBoard />
          <Reveal>
            <div className="mt-6 border border-hairline rounded-lg2 px-7 max-md:px-5">
              {SCHEDULE.map((s) => (
                <DefRow key={s.term} icon="file" term={s.term} mean={`= ${s.mean}`} desc={s.desc} />
              ))}
            </div>
          </Reveal>
        </LessonSection>

        <LessonSection no="05" title="확인 퀴즈"
          desc="여섯 문제 중 네 문제 이상 맞히면 수료 기준을 충족합니다.">
          <DemoPanel title="용어 퀴즈"
            sub="보기를 클릭하면 즉시 채점됩니다. 다시 풀기는 횟수 제한이 없습니다.">
            <Ep2Quiz />
          </DemoPanel>
        </LessonSection>
      </div>
    </EpLayout>
  );
}
