import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import Icon from "../components/Icon";
import { Reveal } from "../components/ui";

/** 전 회차 용어를 한 곳에 — 수업이 끝난 뒤에도 찾아보러 오는 페이지 */
type Term = { term: string; mean: string; desc: string; ep: number };

const TERMS: Term[] = [
  // 1강 · 구조
  { ep: 1, term: "프론트엔드", mean: "홀", desc: "사용자가 보는 화면과 버튼. 내 폰과 브라우저에서 실행됩니다." },
  { ep: 1, term: "백엔드", mean: "주방", desc: "결제·저장·로그인 등 실제 '일' 처리. 회사 서버에서 실행됩니다." },
  { ep: 1, term: "서버 · 클라우드", mean: "건물", desc: "요즘은 사서 쓰지 않고 빌려 씁니다. 대표적으로 AWS." },
  { ep: 1, term: "DB (데이터베이스)", mean: "냉장고", desc: "모든 데이터의 보관소." },
  { ep: 1, term: "API", mean: "주문서", desc: "홀과 주방 사이의 약속된 소통 양식." },
  { ep: 1, term: "풀스택", mean: "홀·주방 겸업", desc: "프론트엔드와 백엔드를 모두 다루는 개발자." },
  { ep: 1, term: "데브옵스", mean: "건물 관리", desc: "서버·배포 인프라 담당. 사이트 전체 다운은 이분을 찾아가세요." },
  { ep: 1, term: "개발자 도구 (F12)", mean: "페이지의 설계도", desc: "브라우저에 내장된 도구. Network 탭에서 오가는 API 요청을 볼 수 있습니다." },
  { ep: 1, term: "SDK", mean: "갖다 붙이는 조립 키트", desc: "외부 기능을 쉽게 넣도록 미리 포장한 코드 묶음. \"SDK 붙였어요\" = 그 회사 키트를 넣었어요." },
  { ep: 1, term: "오픈 API", mean: "외부에서 연결 가능한 창구", desc: "\"그거 API 열려 있어요?\" = 우리 프로그램과 연결할 통로가 있냐는 질문." },
  { ep: 1, term: "webhook (콜백)", mean: "끝나면 자동으로 통보", desc: "결제 완료 등 이벤트가 끝나면 그쪽에서 우리에게 되쏘는 신호." },
  { ep: 1, term: "PG (결제대행)", mean: "결제 전문 납품 업체", desc: "카드 결제를 대신 처리해 주는 회사. 토스페이먼츠 등. 직접 만들면 보안 인증만 몇 달." },
  // 2강 · 용어/프로세스
  { ep: 2, term: "라이브러리", mean: "양념 세트", desc: "필요할 때 꺼내 쓰는 도구 모음. 주도권은 나에게 있습니다." },
  { ep: 2, term: "프레임워크", mean: "밀키트", desc: "정해진 틀을 따라갑니다. 주도권은 프레임워크에게. 리액트·스프링이 이런 도구의 이름." },
  { ep: 2, term: "오픈소스", mean: "전 세계 공개 레시피", desc: "다 같이 검증해서 오히려 품질이 좋습니다." },
  { ep: 2, term: "레거시", mean: "물려받은 20년 된 주방", desc: "\"레거시라서요...\" = \"무섭고 오래 걸립니다\"" },
  { ep: 2, term: "버그 · 디버깅", mean: "결함 · 결함 잡기", desc: "어원은 1947년 컴퓨터에 들어간 진짜 나방 한 마리." },
  { ep: 2, term: "로컬", mean: "개발자 본인 컴퓨터", desc: "\"로컬에서는 되는데요\" — 집에선 완벽했던 요리가 매장에서 실패하는 개발자 밈 1위." },
  { ep: 2, term: "스테이징", mean: "리허설 매장", desc: "운영에 나가기 전 최종 점검하는 환경." },
  { ep: 2, term: "운영 (프로덕션)", mean: "진짜 매장", desc: "고객이 실제로 쓰는 환경. 여기 문제가 곧 장애입니다." },
  { ep: 2, term: "배포", mean: "신메뉴가 매장에 나가는 길", desc: "로컬 → 스테이징 → 프로덕션. 금요일 오후엔 나가지 않습니다." },
  { ep: 2, term: "롤백", mean: "이전 버전으로 되돌리기", desc: "배포 후 문제가 생기면 가장 빠른 응급 조치." },
  { ep: 2, term: "핫픽스", mean: "응급 수술", desc: "정식 절차를 기다릴 수 없을 때의 긴급 배포." },
  { ep: 2, term: "이슈 · 티켓", mean: "할 일 카드", desc: "\"이슈로 올려주세요\" = 기록으로 남겨주세요." },
  { ep: 2, term: "스펙", mean: "기능 정의서", desc: "\"스펙이 안 나왔다\" = 무엇을 만들지 확정되지 않음." },
  { ep: 2, term: "MVP", mean: "핵심만 담은 첫 버전", desc: "Minimum Viable Product — 야구가 아닙니다." },
  { ep: 2, term: "스프린트", mean: "1~2주 업무 주기", desc: "이 주기 단위로 계획하고 회고합니다." },
  { ep: 2, term: "마일스톤", mean: "중간 목표", desc: "\"다음 마일스톤까지\" = 다음 중간 목표 시점까지." },
  // 3강 · 협업/Git
  { ep: 3, term: "Git", mean: "파일의 모든 역사를 기록하는 시스템", desc: "되돌리고, 추적하고, 동시에 작업합니다. 전 세계 개발의 표준." },
  { ep: 3, term: "GitHub", mean: "Git으로 협업하는 웹 서비스", desc: "Git과 GitHub의 관계는 메신저 기술과 카카오톡의 관계와 같습니다." },
  { ep: 3, term: "저장소 (repo)", mean: "프로젝트 폴더", desc: "코드와 역사가 통째로 들어 있는 집." },
  { ep: 3, term: "브랜치", mean: "원본은 두고 복사본에서 작업", desc: "\"브랜치 딴다\"라고 말합니다. 원본 main은 안전합니다." },
  { ep: 3, term: "커밋", mean: "저장 + 메모", desc: "성의 없는 메시지('수정2')는 개발 세계의 '진짜최종.pptx'." },
  { ep: 3, term: "PR (풀 리퀘스트)", mean: "\"검토하고 합쳐주세요\"", desc: "\"PR 올렸어요\" = 작업이 끝났으니 검토해 주세요." },
  { ep: 3, term: "머지", mean: "검토 통과, 원본에 반영", desc: "\"머지됐어요\"가 진짜 완료 신호입니다." },
  { ep: 3, term: "머지 컨플릭트", mean: "같은 줄을 다르게 고쳐 충돌", desc: "Git이 멈추고 사람을 부릅니다. 개발자가 한숨 쉬는 대표적인 이유." },
  { ep: 3, term: "diff", mean: "변경 사항 비교 화면", desc: "초록(＋)은 추가된 코드, 빨강(－)은 삭제된 코드." },
  // 4강 · 커뮤니케이션
  { ep: 4, term: "재현 경로", mean: "문제를 다시 일으키는 방법", desc: "재현되지 않는 버그는 목격자 없는 사건과 같습니다. 요청의 3요소 중 가장 중요." },
  { ep: 4, term: "QA", mean: "품질 검수", desc: "배포 전 마지막 관문. '개발 이틀'에 QA·리뷰·배포 대기는 빠져 있기 쉽습니다." },
  { ep: 4, term: "코드 리뷰", mean: "동료의 줄 단위 검토", desc: "PR에서 벌어지는 품질 검증 과정. 일정에 포함해서 생각해야 합니다." },
  // 5강 · AI 기초
  { ep: 5, term: "LLM", mean: "'다음에 올 말'을 예측하는 기계", desc: "인터넷의 방대한 텍스트를 학습한 언어모델. 코드도 텍스트라서 코드도 씁니다." },
  { ep: 5, term: "프롬프트", mean: "AI에게 전달하는 주문서", desc: "요청이 구체적일수록 결과가 좋아집니다." },
  { ep: 5, term: "토큰", mean: "글을 세는 단위이자 요금의 기준", desc: "AI 사용료는 대부분 토큰 수로 계산됩니다." },
  { ep: 5, term: "할루시네이션", mean: "그럴듯한 거짓말", desc: "확률로 말을 고르는 기계라서 자신 있게 틀립니다. 검증이 필수인 이유." },
  { ep: 5, term: "바이브 코딩", mean: "말로 시켜서 만드는 개발", desc: "요청 → 생성 → 확인 → 수정 반복. 코드를 직접 쓰지 않고 결과물을 만듭니다." },
  // 6강 · AI 트렌드
  { ep: 6, term: "에이전트", mean: "묻고 답하기가 아니라 '일 시키기'", desc: "여러 단계의 작업을 스스로 계획하고 도구를 사용하는 AI." },
  { ep: 6, term: "하네스 엔지니어링", mean: "AI에게 좋은 온보딩 주기", desc: "AI가 일하는 주변 환경 전체(도구·지침서·작업 공간·검증 장치)를 설계하는 일." },
  { ep: 6, term: "컨텍스트 엔지니어링", mean: "'좋은 질문'에서 '좋은 자료 세팅'으로", desc: "무엇을 넣어주느냐가 결과를 바꿉니다. 필요한 것만, 좋은 순서로." },
  { ep: 6, term: "MCP", mean: "AI용 표준 연결 규격 (USB-C)", desc: "\"그 도구 MCP 돼요?\" = \"AI랑 연결돼요?\" 사실상 업계 표준." },
  { ep: 6, term: "에이전틱 코딩", mean: "바이브 코딩의 다음 단계", desc: "AI가 코드를 쓰고 테스트하고 고치며, 사람은 검토합니다. Claude Code, Cursor." },
  { ep: 6, term: "few-shot", mean: "좋은 예시를 붙여 요청하기", desc: "'이런 느낌'이라는 말보다 예시 파일 하나가 강력합니다." },
];

const EP_LABEL: Record<number, string> = {
  1: "1강 · 구조", 2: "2강 · 용어", 3: "3강 · Git", 4: "4강 · 협업", 5: "5강 · AI 기초", 6: "6강 · AI 트렌드",
};

export default function Glossary() {
  const [q, setQ] = useState("");
  const [ep, setEp] = useState(0); // 0 = 전체

  const filtered = useMemo(() => {
    const needle = q.trim().toLowerCase();
    return TERMS.filter((t) =>
      (ep === 0 || t.ep === ep) &&
      (!needle || [t.term, t.mean, t.desc].some((s) => s.toLowerCase().includes(needle)))
    );
  }, [q, ep]);

  const groups = useMemo(() => {
    const m = new Map<number, Term[]>();
    filtered.forEach((t) => m.set(t.ep, [...(m.get(t.ep) ?? []), t]));
    return [...m.entries()].sort((a, b) => a[0] - b[0]);
  }, [filtered]);

  return (
    <main className="bg-white">
      <header className="px-6 pt-[104px] pb-10 border-b border-hairline">
        <div className="max-w-[880px] mx-auto">
          <p className="text-[13px] font-semibold text-primary tracking-[0.4px]">부록 · 언제든 찾아보세요</p>
          <h1 className="text-[40px] max-md:text-[28px] font-semibold leading-[1.15] tracking-[-0.6px] mt-4">용어 사전</h1>
          <p className="text-[17px] text-ink-48 mt-4 max-w-[680px] leading-[1.6] tracking-[-0.2px]">
            6강에서 배운 용어 {TERMS.length}개를 한 곳에 모았습니다.
            회의에서 모르는 말이 나오면 여기서 검색하세요.
          </p>

          {/* 검색 + 필터 */}
          <div className="mt-8 flex items-center gap-3 max-md:flex-col max-md:items-stretch">
            <div className="flex items-center gap-2.5 flex-1 border border-hairline rounded-full px-5 py-3 bg-pearl focus-within:border-primary transition-colors">
              <span className="text-ink-48 flex-none"><Icon name="search" size={17} /></span>
              <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="용어, 뜻, 설명으로 검색"
                className="w-full bg-transparent outline-none text-[15px] tracking-[-0.2px] placeholder:text-ink-48" />
            </div>
          </div>
          <div className="flex gap-2 mt-4 flex-wrap">
            {[0, 1, 2, 3, 4, 5, 6].map((n) => (
              <button key={n} onClick={() => setEp(n)}
                className={`rounded-full px-3.5 py-1.5 text-[13px] font-medium tracking-[-0.15px] border transition-colors cursor-pointer ${
                  ep === n ? "bg-primary text-white border-primary" : "bg-white text-ink-80 border-hairline hover:border-primary"}`}>
                {n === 0 ? "전체" : EP_LABEL[n]}
              </button>
            ))}
          </div>
        </div>
      </header>

      <div className="max-w-[880px] mx-auto px-6 py-12 max-md:px-[18px]">
        {groups.length === 0 && (
          <p className="text-[15px] text-ink-48 py-16 text-center">
            "{q}"에 해당하는 용어가 없습니다. 다른 말로 검색해 보세요.
          </p>
        )}
        {groups.map(([epNo, terms]) => (
          <section key={epNo} className="mb-12 last:mb-0">
            <div className="flex items-baseline justify-between pb-3 border-b border-hairline">
              <h2 className="text-[20px] font-semibold tracking-[-0.3px]">{EP_LABEL[epNo]}</h2>
              <Link to={`/lesson/${epNo}`} className="text-[13px] text-primary no-underline inline-flex items-center gap-1">
                강의 보기 <Icon name="arrow" size={13} />
              </Link>
            </div>
            <Reveal>
              {terms.map((t) => (
                <div key={t.term} className="flex items-start gap-5 max-md:gap-3 py-[18px] border-b border-[#ececee] last:border-b-0">
                  <div className="min-w-0">
                    <div className="flex items-baseline gap-3 flex-wrap">
                      <span className="text-[16px] font-semibold tracking-[-0.3px]">{t.term}</span>
                      <span className="text-[14.5px] font-medium text-primary">= {t.mean}</span>
                    </div>
                    <p className="text-[14px] text-ink-48 mt-1 leading-[1.55]">{t.desc}</p>
                  </div>
                </div>
              ))}
            </Reveal>
          </section>
        ))}
      </div>
    </main>
  );
}
