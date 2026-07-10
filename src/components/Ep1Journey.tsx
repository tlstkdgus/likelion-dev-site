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

export default function Ep1Journey() {
  const [active, setActive] = useState<number | null>(null);
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
      setStats((prev) => { const nx = [...prev]; nx[n] = st; return nx; });
      setLog(`${i + 1}/7 · ${lg}`);
      i++;
      setTimeout(tick, 900);
    };
    tick();
  };

  return (
    <div>
      <Pill onClick={go} sm>로그인 요청 보내기</Pill>
      <div className="flex items-center justify-between gap-2 mt-7 mb-2">
        {NODES.map((n, i) => (
          <div key={n.t} className="contents">
            <div className={`flex-1 text-center px-2 py-[18px] rounded-[11px] border transition-all duration-300 ${
              active === i ? "border-primary bg-[#eaf3ff] -translate-y-1" : "border-hairline bg-white"}`}>
              <span className={`inline-block ${active === i ? "text-primary" : "text-ink-48"}`}><Icon name={n.icon} size={24} /></span>
              <div className="text-[13.5px] font-semibold mt-2 tracking-[-0.224px]">{n.t}</div>
              <div className="text-[11px] text-ink-48 mt-0.5 min-h-[14px]">{stats[i]}</div>
            </div>
            {i < 3 && <div className={`flex-none ${active !== null && active > i ? "text-primary" : "text-hairline"}`}><Icon name="arrow" size={16} /></div>}
          </div>
        ))}
      </div>
      <div className="text-[13.5px] tracking-[-0.2px] text-ink-80 bg-white border border-hairline rounded-[11px] px-[18px] py-3.5 mt-4 min-h-[52px]">
        {log}
      </div>
    </div>
  );
}
