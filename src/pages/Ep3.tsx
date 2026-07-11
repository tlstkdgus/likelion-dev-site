import EpLayout from "../components/EpLayout";
import Ep3GitSim from "../components/Ep3GitSim";
import Icon from "../components/Icon";
import { DemoPanel, LessonSection, Note, Reveal } from "../components/ui";
import { BranchGraph, MergeConflict, DiffView } from "../components/diagrams";

const FILES = ["보고서_최종.pptx", "보고서_최종_수정.pptx", "보고서_진짜최종.pptx", "보고서_진짜최종_이걸로(2).pptx"];
const VALUES = [
  ["clock", "타임머신", "언제든 과거 버전으로 복귀할 수 있습니다"],
  ["search", "감사 기록", "누가 언제 무엇을 왜 바꿨는지 전부 남습니다"],
  ["users", "동시 편집", "여럿이 같이 작업해도 꼬이지 않습니다"],
] as const;
const CONCEPTS = [
  ["저장소 (repo)", "프로젝트 폴더", "코드와 역사가 통째로 들어 있는 집"],
  ["브랜치", "원본은 두고 복사본에서 작업", "\"브랜치 딴다\"라고 말합니다"],
  ["커밋", "저장 + 메모", "성의 없는 메시지('수정2')는 개발 세계의 '진짜최종.pptx'"],
  ["PR과 머지", "\"검토하고 합쳐주세요\"", "줄 단위 리뷰를 거쳐 원본에 반영"],
] as const;
const TOUR = [
  ["저장소 첫 화면", "프로젝트 폴더의 모습"],
  ["커밋 히스토리", "이 프로젝트의 역사책"],
  ["PR 탭", "줄 단위 코드 토론이 벌어지는 곳"],
  ["diff 화면", "초록 = 추가된 코드, 빨강 = 삭제된 코드"],
] as const;

export default function Ep3() {
  return (
    <EpLayout index={2}
      cheat={'"그 기능 브랜치 따서 작업 중이신 거죠? 머지되면 알려주세요."'}
      cheatWhy="개발이 '완전히 끝나는' 시점을 정확히 짚는 말입니다. 머지가 진짜 완료 신호라는 것을 아는 사람은 의외로 드뭅니다.">

      <div className="max-w-[880px] mx-auto px-6 py-16 max-md:px-[18px]">

        <LessonSection no="01" title="이 파일명이 익숙하다면"
          desc="버전 관리를 파일명으로 하던 시대의 흔적입니다. 개발자들은 이 문제를 20년 전에 해결했습니다.">
          <Reveal>
            <div className="grid grid-cols-2 max-md:grid-cols-1 gap-10 mt-7 items-center">
              <div>
                {FILES.map((f, i) => (
                  <div key={f} className={`flex items-center gap-3 px-5 py-3.5 rounded-[11px] border mt-2.5 ${
                    i === 3 ? "border-primary bg-[#eaf3ff]" : "border-hairline bg-white"}`}>
                    <span className={i === 3 ? "text-primary" : "text-ink-48"}><Icon name="file" size={16} /></span>
                    <span className={`text-[13.5px] font-mono ${i === 3 ? "text-ink font-semibold" : "text-ink-48"}`}>{f}</span>
                  </div>
                ))}
              </div>
              <div>
                <p className="text-[24px] font-semibold leading-[1.35] tracking-[-0.4px]">그 해답이 Git —<br />파일의 모든 역사를 기록하는 시스템</p>
                <p className="text-[15px] text-ink-48 mt-4 leading-[1.6]">되돌리고, 추적하고, 동시에 작업합니다. 전 세계 개발의 표준입니다.</p>
              </div>
            </div>
          </Reveal>
          <Reveal>
            <div className="grid grid-cols-3 max-md:grid-cols-1 gap-4 mt-10">
              {VALUES.map(([ic, t, d]) => (
                <div key={t} className="bg-white border border-hairline rounded-[14px] p-5">
                  <span className="text-primary"><Icon name={ic as never} size={22} /></span>
                  <p className="text-[16px] font-semibold mt-3">{t}</p>
                  <p className="text-[13px] text-ink-48 mt-1 leading-[1.5]">{d}</p>
                </div>
              ))}
            </div>
            <Note>
              <b className="text-primary">Git</b>은 기술 자체, <b className="text-primary">GitHub</b>는 그 기술로 협업하는 웹 서비스입니다.
              메신저 기술과 카카오톡의 관계와 같습니다.
            </Note>
          </Reveal>
        </LessonSection>

        <LessonSection no="02" title="핵심 개념 네 가지"
          desc="Git의 수백 가지 명령어 중 비개발자가 알아야 할 것은 이 넷뿐입니다.">
          <BranchGraph />
          <Reveal>
            {CONCEPTS.map(([t, m, d], i) => (
              <div key={t} className="flex items-start gap-5 py-5 border-b border-[#ececee] last:border-b-0">
                <span className="text-[13px] font-semibold text-primary tabular-nums flex-none mt-1">{String(i + 1).padStart(2, "0")}</span>
                <div>
                  <div className="flex items-baseline gap-3 flex-wrap">
                    <span className="text-[16px] font-semibold">{t}</span>
                    <span className="text-[14.5px] text-primary">{m}</span>
                  </div>
                  <p className="text-[13.5px] text-ink-48 mt-1">{d}</p>
                </div>
              </div>
            ))}
          </Reveal>
        </LessonSection>

        <LessonSection no="03" title="협업 흐름 체험"
          desc="개발자의 하루를 40초로 압축했습니다. 버튼을 순서대로 눌러 보세요.">
          <DemoPanel title="Git 협업 흐름 시뮬레이터"
            sub="브랜치 생성 → 커밋 → PR → 머지. 각 단계에서 실제로 어떤 일이 일어나는지 로그로 보여줍니다.">
            <Ep3GitSim />
          </DemoPanel>
          <Note label="참고">
            같은 부분을 두 사람이 다르게 고치면 Git이 멈추고 사람을 부릅니다.
            이것이 <b className="text-primary">머지 컨플릭트</b> — 개발자가 한숨 쉬는 대표적인 이유입니다.
          </Note>
          <MergeConflict />
        </LessonSection>

        <LessonSection no="04" title="GitHub 둘러보기"
          desc="회사 저장소가 아니어도 됩니다. 유명 오픈소스 프로젝트를 구경하는 것만으로 충분합니다.">
          <Reveal>
            <div className="grid grid-cols-2 max-md:grid-cols-1 gap-4 mt-6">
              {TOUR.map(([t, d], i) => (
                <div key={t} className="flex items-start gap-4 bg-white border border-hairline rounded-[14px] px-5 py-4">
                  <span className="text-[15px] font-semibold text-primary tabular-nums flex-none">{i + 1}</span>
                  <div>
                    <p className="text-[15px] font-semibold tracking-[-0.25px]">{t}</p>
                    <p className="text-[13px] text-ink-48 mt-1 leading-[1.5]">{d}</p>
                  </div>
                </div>
              ))}
            </div>
            <Note label="통역">
              "PR 올렸어요" = 작업이 끝났으니 검토해 주세요 · "머지됐어요" = 검토 통과, 반영 완료.
            </Note>
          </Reveal>
          <DiffView />
        </LessonSection>
      </div>
    </EpLayout>
  );
}
