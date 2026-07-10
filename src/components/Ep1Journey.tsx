import { useRef, useState } from "react";
import Icon, { type IconName } from "./Icon";
import { Pill } from "./ui";

const NODES: { icon: IconName; t: string }[] = [
  { icon: "monitor", t: "프론트엔드" },
  { icon: "file", t: "API" },
  { icon: "server", t: "백엔드" },
  { icon: "database", t: "DB" },
];

const STEPS: [number, string, string][] = [
  [0, "버튼 클릭", "프론트엔드: 입력값을 주문서 양식에 맞춰 정리합니다."],
  [1, "주문서 전달", "API: \"로그인 요청 1건\" — 정해진 양식으로 주방에 전달합니다."],
  [2, "본인 확인", "백엔드: 이 사용자가 진짜 회원인지 대조 작업을 시작합니다."],
  [3, "데이터 조회", "DB: 보관 중인 회원 정보를 꺼내 백엔드에 돌려줍니다."],
  [2, "확인 완료", "백엔드: 본인 확인 완료 — 통행증(토큰)을 발급합니다."],
  [1, "응답 반환", "API: 처리 결과를 다시 홀(프론트엔드)로 전달합니다."],
  [0, "로그인 성공", "프론트엔드: 환영 화면으로 전환. 총 소요 약 0.4초 — 이 왕복이 방금 눈앞에서 일어났습니다."],
];

// 화면(프론트엔드)이 실제로 어떻게 바뀌는지 — 요청 단계와 동기화
type Screen = "form" | "loading" | "done";
function screenOf(stepIdx: number): Screen {
  if (stepIdx < 0 || stepIdx === 0) return "form";
  if (stepIdx >= STEPS.length - 1) return "done";
  return "loading";
}

/** 목업 브라우저 안에서 실제로 동작하는 로그인 화면 */
function AppScreen({ screen, pressed }: { screen: Screen; pressed: boolean }) {
  return (
    <div className="rounded-[14px] border border-hairline overflow-hidden bg-white select-none">
      {/* 브라우저 크롬 */}
      <div className="flex items-center gap-2 px-3.5 py-2.5 bg-[#f5f5f7] border-b border-hairline">
        <span className="flex gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]" />
          <span className="w-2.5 h-2.5 rounded-full bg-[#febc2e]" />
          <span className="w-2.5 h-2.5 rounded-full bg-[#28c840]" />
        </span>
        <span className="ml-1.5 flex-1 flex items-center gap-1.5 bg-white border border-hairline rounded-md px-2.5 py-1 text-[11px] text-ink-48">
          <Icon name="lock" size={11} /> likelion.app/login
        </span>
      </div>

      {/* 화면 본문 */}
      <div className="px-6 py-7 min-h-[196px] flex flex-col justify-center">
        {screen === "form" && (
          <div>
            <p className="text-[15px] font-semibold text-center mb-4">로그인</p>
            <label className="block text-[11px] text-ink-48 mb-1">이메일</label>
            <div className="text-[13px] border border-hairline rounded-lg px-3 py-2 mb-3 text-ink-80">hong@likelion.net</div>
            <label className="block text-[11px] text-ink-48 mb-1">비밀번호</label>
            <div className="text-[13px] border border-hairline rounded-lg px-3 py-2 mb-4 tracking-[2px] text-ink-80">••••••••</div>
            <div className={`text-center text-[14px] font-medium text-white rounded-lg py-2.5 transition-transform ${pressed ? "bg-primary scale-95" : "bg-primary"}`}>
              로그인
            </div>
          </div>
        )}
        {screen === "loading" && (
          <div className="text-center">
            <span className="inline-block text-primary spin-emoji"><Icon name="refresh" size={30} /></span>
            <p className="text-[13.5px] text-ink-48 mt-3">본인 확인 중…</p>
          </div>
        )}
        {screen === "done" && (
          <div className="text-center">
            <span className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-[#e8f7ee] text-[#1a7a38] mx-auto">
              <Icon name="check" size={26} strokeWidth={2.6} />
            </span>
            <p className="text-[16px] font-semibold mt-3">환영합니다, 홍길동님</p>
            <p className="text-[12.5px] text-ink-48 mt-1">로그인 성공 · 대시보드로 이동합니다</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default function Ep1Journey() {
  const [active, setActive] = useState<number | null>(null);
  const [stepIdx, setStepIdx] = useState(-1);
  const [stats, setStats] = useState<string[]>(["", "", "", ""]);
  const [log, setLog] = useState("대기 중 — 아래 버튼을 눌러 요청의 이동 경로를 확인해 보세요.");
  const running = useRef(false);

  const go = () => {
    if (running.current) return;
    running.current = true;
    setStats(["", "", "", ""]);
    let i = 0;
    const tick = () => {
      if (i >= STEPS.length) { running.current = false; return; }
      const [n, st, lg] = STEPS[i];
      setActive(n);
      setStepIdx(i);
      setStats((prev) => { const nx = [...prev]; nx[n] = st; return nx; });
      setLog(`${i + 1}/${STEPS.length} · ${lg}`);
      i++;
      setTimeout(tick, 900);
    };
    tick();
  };

  return (
    <div>
      <div className="grid grid-cols-[300px_1fr] max-md:grid-cols-1 gap-7 items-start">
        {/* 실제 동작하는 화면 */}
        <AppScreen screen={screenOf(stepIdx)} pressed={stepIdx === 0} />

        {/* 요청이 지나는 경로 */}
        <div>
          <p className="text-[12px] font-semibold text-ink-48 tracking-[0.3px] mb-3">요청이 지나는 경로</p>
          <div className="flex items-center justify-between gap-2">
            {NODES.map((n, i) => (
              <div key={n.t} className="contents">
                <div className={`flex-1 text-center px-2 py-[18px] rounded-[11px] border transition-all duration-300 ${
                  active === i ? "border-primary bg-[#eaf3ff] -translate-y-1" : "border-hairline bg-white"}`}>
                  <span className={`inline-block ${active === i ? "text-primary" : "text-ink-48"}`}><Icon name={n.icon} size={24} /></span>
                  <div className="text-[13px] font-semibold mt-2 tracking-[-0.224px]">{n.t}</div>
                  <div className="text-[10.5px] text-ink-48 mt-0.5 min-h-[13px]">{stats[i]}</div>
                </div>
                {i < 3 && <div className={`flex-none ${active !== null && active > i ? "text-primary" : "text-hairline"}`}><Icon name="arrow" size={16} /></div>}
              </div>
            ))}
          </div>
          <div className="text-[13.5px] tracking-[-0.2px] text-ink-80 bg-white border border-hairline rounded-[11px] px-[18px] py-3.5 mt-4 min-h-[64px]">
            {log}
          </div>
        </div>
      </div>
      <div className="mt-6">
        <Pill onClick={go} sm>로그인 요청 보내기</Pill>
      </div>
    </div>
  );
}
