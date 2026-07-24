import { useState } from "react";
import Icon, { type IconName } from "./Icon";

type Mode = "lib" | "fw";

const DATA: Record<Mode, {
  caller: { t: string; icon: IconName; note: string };
  callee: { t: string; icon: IconName; note: string };
  line: string;
  rows: [string, string][];
}> = {
  lib: {
    caller: { t: "내 코드", icon: "code", note: "내가 흐름을 정합니다" },
    callee: { t: "라이브러리", icon: "box", note: "필요할 때 꺼내 쓰는 도구 모음" },
    line: "내 코드가 필요할 때 라이브러리를 부릅니다.",
    rows: [
      ["부엌 비유", "양념·도구 세트. 요리 순서는 내가 정하고, 필요할 때 꺼내 씁니다."],
      ["주도권", "나에게 있음 — 언제 쓸지, 쓸지 말지 내가 결정"],
      ["실제 예", "날짜 계산 도구, 그래프 그리는 도구처럼 '기능 하나'를 담당"],
      ["교체 비용", "가벼움 — 양념 하나 바꾸는 수준. 일정에 큰 영향 없음"],
    ],
  },
  fw: {
    caller: { t: "프레임워크", icon: "layers", note: "정해진 틀과 순서를 제공합니다" },
    callee: { t: "내 코드", icon: "code", note: "틀 안의 정해진 자리에 채워 넣음" },
    line: "프레임워크가 정해진 시점에 내 코드를 불러 씁니다.",
    rows: [
      ["부엌 비유", "밀키트. 조리 순서와 틀이 이미 정해져 있고, 나는 그 안에서 재료를 채웁니다."],
      ["주도권", "프레임워크에 있음 — 내 코드는 정해진 규칙을 따라야 함"],
      ["실제 예", "리액트, 스프링처럼 '앱 전체의 뼈대'를 담당"],
      ["교체 비용", "무거움 — 주방을 통째로 바꾸는 대공사. 일정이 크게 늘어남"],
    ],
  },
};

function Node({ t, icon, note, lead }: { t: string; icon: IconName; note: string; lead?: boolean }) {
  return (
    <div className={`flex-1 rounded-[14px] border px-5 py-5 text-center transition-all ${
      lead ? "border-primary bg-[#eaf3ff]" : "border-hairline bg-white"}`}>
      <span className={`inline-block ${lead ? "text-primary" : "text-ink-48"}`}><Icon name={icon} size={26} /></span>
      <p className="text-[15.5px] font-semibold mt-2 tracking-[-0.3px]">{t}</p>
      <p className="text-[12px] text-ink-48 mt-1 leading-[1.45]">{note}</p>
      {lead && <span className="inline-block mt-2.5 text-[11px] font-semibold text-primary bg-white border border-primary rounded-full px-2.5 py-0.5">주도권</span>}
    </div>
  );
}

export default function Ep2LibFw() {
  const [mode, setMode] = useState<Mode>("lib");
  const d = DATA[mode];

  return (
    <div>
      {/* 전환 버튼 */}
      <div className="flex gap-2.5">
        {([["lib", "라이브러리"], ["fw", "프레임워크"]] as [Mode, string][]).map(([m, label]) => (
          <button key={m} onClick={() => setMode(m)}
            className={`text-[14px] rounded-full px-4 py-2 border transition-all cursor-pointer ${
              mode === m ? "bg-primary text-white border-primary" : "bg-white text-ink-80 border-hairline hover:border-primary"}`}>
            {label}
          </button>
        ))}
      </div>

      {/* 누가 누구를 부르는가 */}
      <div className="mt-6 rounded-[14px] border border-hairline bg-white p-6 max-md:p-4">
        <p className="text-[12px] font-semibold text-ink-48 tracking-[0.3px] mb-4">누가 누구를 부르는가</p>
        <div className="flex items-center gap-3 max-md:flex-col">
          <Node {...d.caller} lead />
          <div className="flex-none text-center px-1 max-md:rotate-90">
            <span className="text-primary"><Icon name="arrow" size={26} /></span>
            <p className="text-[11px] text-ink-48 mt-1 max-md:hidden">호출</p>
          </div>
          <Node {...d.callee} />
        </div>
        <p className="text-[14px] text-ink-80 mt-4 leading-[1.55] text-center">{d.line}</p>
      </div>

      {/* 상세 비교 */}
      <div className="mt-4 rounded-[14px] border border-hairline overflow-hidden">
        {d.rows.map(([k, v], i) => (
          <div key={k} className={`grid grid-cols-[110px_1fr] max-md:grid-cols-1 gap-4 px-5 py-3.5 ${
            i > 0 ? "border-t border-hairline" : ""}`}>
            <span className="text-[13px] font-semibold text-primary">{k}</span>
            <span className="text-[13.5px] text-ink-80 leading-[1.55]">{v}</span>
          </div>
        ))}
      </div>

      <p className="text-[13px] text-ink-48 mt-4 leading-[1.6]">
        한 문장 요약 — <b className="text-ink-80">라이브러리는 내가 부르고, 프레임워크는 나를 부릅니다.</b>
      </p>
    </div>
  );
}
