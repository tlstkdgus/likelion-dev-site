import EpLayout from "../components/EpLayout";
import Ep1Journey from "../components/Ep1Journey";
import Icon, { type IconName } from "../components/Icon";
import { DemoPanel, DefRow, LessonSection, Note, Reveal } from "../components/ui";
import { RestaurantFlow, ExternalIntegrations } from "../components/diagrams";

const MAP: { icon: IconName; res: string; dev: string; desc: string }[] = [
  { icon: "home", res: "홀", dev: "프론트엔드", desc: "사용자가 보는 화면과 버튼. 내 폰과 브라우저에서 실행됩니다." },
  { icon: "utensils", res: "주방", dev: "백엔드", desc: "결제·저장·로그인 등 실제 '일' 처리. 회사 서버에서 실행됩니다." },
  { icon: "server", res: "건물", dev: "서버 · 클라우드", desc: "요즘은 사서 쓰지 않고 빌려 씁니다. 대표적으로 AWS." },
  { icon: "database", res: "냉장고", dev: "DB", desc: "모든 데이터의 보관소." },
  { icon: "file", res: "주문서", dev: "API", desc: "홀과 주방 사이의 약속된 소통 양식." },
];

const JOBS: { icon: IconName; t: string; d: string }[] = [
  { icon: "monitor", t: "프론트엔드", d: "홀 담당 — 화면이 깨졌다면 이분" },
  { icon: "server", t: "백엔드", d: "주방 담당 — 데이터가 이상하면 이분" },
  { icon: "layers", t: "풀스택", d: "홀과 주방 겸업" },
  { icon: "wrench", t: "데브옵스", d: "건물 관리 — 사이트 전체 다운은 이분" },
  { icon: "phone", t: "모바일", d: "앱 전용 홀 담당" },
];

const EXTERNAL: { icon: IconName; field: string; ex: string; desc: string }[] = [
  { icon: "lock", field: "결제", ex: "토스페이먼츠 · PG사", desc: "카드 결제를 직접 만들면 보안 인증만 몇 달. 전문 결제사(PG)에 맡깁니다." },
  { icon: "target", field: "지도", ex: "카카오맵 · 구글맵", desc: "위치 검색과 길찾기를 직접 만들 순 없죠. 지도 회사 것을 붙입니다." },
  { icon: "users", field: "소셜 로그인", ex: "카카오·구글·애플", desc: "'카카오로 시작하기' — 비밀번호를 우리가 직접 받지 않아도 됩니다." },
  { icon: "message", field: "알림", ex: "알림톡 · SMS · 푸시", desc: "주문 완료 문자, 카카오 알림톡도 전문 발송사를 거쳐 나갑니다." },
];

const LINK_TERMS: { icon: IconName; term: string; mean: string; desc: string }[] = [
  { icon: "box", term: "SDK", mean: "= 갖다 붙이는 조립 키트", desc: "외부 기능을 쉽게 넣도록 미리 포장한 코드 묶음. \"SDK 붙였어요\" = 그 회사 키트를 넣었어요." },
  { icon: "file", term: "오픈 API", mean: "= 외부에서 연결 가능한 창구", desc: "\"그거 API 열려 있어요?\" = 우리 프로그램과 연결할 통로가 있냐는 질문입니다." },
  { icon: "refresh", term: "webhook (콜백)", mean: "= 끝나면 자동으로 통보", desc: "결제가 완료되면 그쪽에서 우리에게 되쏘는 신호. \"처리 끝나면 전화 주세요\"의 자동화 버전." },
];

const F12 = [
  ["지금 보이는 화면", "전부 프론트엔드입니다"],
  ["F12 누르기", "개발자 도구 — 이 페이지의 설계도가 열립니다"],
  ["Network 탭", "오가는 주문서(API 요청)를 실시간으로 볼 수 있습니다"],
  ["로그인 한 번", "홀 → 주방 → 냉장고, 1초의 왕복 여정"],
] as const;

export default function Ep1() {
  return (
    <EpLayout index={0}
      cheat={'"이거 프론트 쪽 이슈일까요, 데이터 문제일까요?"'}
      cheatWhy='문제를 구조적으로 나눠 묻는 질문입니다. "안 돼요"라고만 말하는 것보다 처리 속도가 비교할 수 없이 빨라집니다.'>

      <div className="max-w-[880px] mx-auto px-6 py-16 max-md:px-[18px]">

        <LessonSection no="01" title="이 대화, 들어본 적 있으시죠"
          desc="개발자들 사이에서 매일 오가는 대화입니다. 이 강의가 끝나면 전부 들립니다.">
          <Reveal className="mt-7">
            <div><span className="inline-block bg-parchment rounded-[18px] px-5 py-3 text-[15px] tracking-[-0.25px] my-1.5">"아, 그거 프론트 이슈예요"</span></div>
            <div><span className="inline-block bg-parchment rounded-[18px] px-5 py-3 text-[15px] tracking-[-0.25px] my-1.5">"백엔드 배포 나가야 해요. DB에서 꼬였네요"</span></div>
            <div className="flex justify-end"><span className="inline-block bg-primary text-white rounded-[18px] px-5 py-3 text-[15px] tracking-[-0.25px] my-1.5">(나) 끄덕끄덕… 뭐라는 거지?</span></div>
          </Reveal>
        </LessonSection>

        <LessonSection no="02" title="소프트웨어는 식당입니다"
          desc="이 대응표 하나면 오늘 수업의 절반이 끝납니다. 다섯 가지만 기억하세요.">
          <RestaurantFlow />
          <Reveal>
            <div className="mt-6 border border-hairline rounded-lg2 px-7 max-md:px-5">
              {MAP.map((m) => (
                <DefRow key={m.dev} icon={m.icon} term={m.res} mean={`= ${m.dev}`} desc={m.desc} />
              ))}
            </div>
          </Reveal>
          <Note>
            "화면은 멀쩡한데 버튼을 눌러도 반응이 없다" — 십중팔구 백엔드(주방) 문제입니다.
            보이는 곳(프론트)과 일하는 곳(백엔드)을 나누는 것이 모든 진단의 시작입니다.
          </Note>
        </LessonSection>

        <LessonSection no="03" title="요청 한 번의 왕복 여정"
          desc="로그인 버튼을 한 번 누르면 시스템 안에서 어떤 일이 벌어질까요. 직접 확인해 보세요.">
          <DemoPanel title="로그인 요청 시뮬레이터"
            sub="버튼을 누르면 왼쪽 화면(프론트엔드)이 실제로 폼 → 확인 중 → 환영으로 바뀌고, 오른쪽에서 요청이 API → 백엔드 → DB를 왕복하는 과정을 함께 보여줍니다.">
            <Ep1Journey />
          </DemoPanel>
        </LessonSection>

        <LessonSection no="04" title="우리 주방이 다 만들지 않습니다"
          desc="결제·지도·로그인·알림 같은 어려운 기능은 회사가 직접 만들지 않고, 검증된 외부 전문 서비스를 API로 빌려 붙입니다. 반찬을 다 직접 담그지 않고 전문 업체에서 받아오는 것과 같습니다.">
          <ExternalIntegrations />
          <Reveal>
            <div className="grid grid-cols-2 max-md:grid-cols-1 gap-4 mt-6">
              {EXTERNAL.map((x) => (
                <div key={x.field} className="rounded-[14px] border border-hairline px-5 py-5">
                  <span className="text-primary"><Icon name={x.icon} size={20} /></span>
                  <p className="text-[15.5px] font-semibold mt-2.5">
                    {x.field} <span className="text-[13px] text-ink-48 font-normal">· {x.ex}</span>
                  </p>
                  <p className="text-[13.5px] text-ink-48 mt-1 leading-[1.5]">{x.desc}</p>
                </div>
              ))}
            </div>
          </Reveal>
          <Reveal>
            <div className="mt-6 border border-hairline rounded-lg2 px-7 max-md:px-5">
              {LINK_TERMS.map((t) => (
                <DefRow key={t.term} icon={t.icon} term={t.term} mean={t.mean} desc={t.desc} />
              ))}
            </div>
          </Reveal>
          <Note warn label="주의">
            카카오 로그인이 먹통이면 우리 서비스 로그인도 멈춥니다. 외부 연동은 편리하지만,
            그 회사의 장애가 곧 우리 장애가 되기도 합니다 — "연동사 이슈"라는 말이 여기서 나옵니다.
          </Note>
        </LessonSection>

        <LessonSection no="05" title="오늘 배운 것, 직접 확인하기"
          desc="개발자 도구(F12)는 아무것도 망가뜨리지 않습니다. 지금 이 페이지에서 바로 해볼 수 있습니다.">
          <Reveal>
            <div className="grid grid-cols-2 max-md:grid-cols-1 gap-4 mt-6">
              {F12.map(([t, d], i) => (
                <div key={t} className="flex items-start gap-4 border border-hairline rounded-[14px] px-5 py-4">
                  <span className="text-[15px] font-semibold text-primary tabular-nums flex-none">{i + 1}</span>
                  <div>
                    <p className="text-[15px] font-semibold tracking-[-0.25px]">{t}</p>
                    <p className="text-[13.5px] text-ink-48 mt-1 leading-[1.5]">{d}</p>
                  </div>
                </div>
              ))}
            </div>
          </Reveal>
        </LessonSection>

        <LessonSection no="06" title="그래서 누구를 찾아가야 하나요"
          desc="증상별로 찾아갈 사람이 다릅니다. 직군의 이름과 담당 영역을 연결해 두세요.">
          <Reveal>
            <div className="mt-6 border border-hairline rounded-lg2 px-7 max-md:px-5">
              {JOBS.map((j) => (
                <DefRow key={j.t} icon={j.icon} term={j.t} mean="" desc={j.d} />
              ))}
            </div>
            <Note label="요약">
              화면 깨짐 → 프론트엔드 · 데이터 이상 → 백엔드 · 사이트 전체 다운 → 서버(데브옵스).
              어디인지 모르겠으면, 증상부터 구조적으로 설명하면 됩니다.
            </Note>
          </Reveal>
        </LessonSection>
      </div>
    </EpLayout>
  );
}
