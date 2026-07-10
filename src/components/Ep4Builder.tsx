import { useState } from "react";

const PARTS = [
  { title: "1. 현상", sub: "무엇이 일어나는가 + 스크린샷", text: "결제 페이지에서 결제 버튼을 누르면 흰 화면이 표시됩니다. (스크린샷 첨부)" },
  { title: "2. 재현 방법", sub: "어떻게 하면 발생하는가 — 가장 중요", text: "쿠폰을 적용한 상태에서만 발생합니다. 쿠폰 없이는 정상 동작하며, 크롬에서 재현됩니다." },
  { title: "3. 기대 동작", sub: "원래는 어때야 하는가", text: "정상이라면 결제 완료 페이지로 이동해야 합니다." },
];
const STATES = [
  { t: "예상 핑퐁 5회 — 되묻는 데 반나절이 소모됩니다", c: "#e05252", w: 100 },
  { t: "예상 핑퐁 3회 — 아직 되물어봐야 할 것이 많습니다", c: "#e08a3c", w: 66 },
  { t: "예상 핑퐁 1회 — 거의 다 왔습니다", c: "#d4b420", w: 33 },
  { t: "핑퐁 0회 — 개발자가 바로 원인 분석에 들어갈 수 있습니다", c: "#30b354", w: 6 },
];

export default function Ep4Builder() {
  const [on, setOn] = useState([false, false, false]);
  const n = on.filter(Boolean).length;
  const s = STATES[n];
  const body = PARTS.filter((_, i) => on[i]).map((p) => p.text).join(" ");

  return (
    <div>
      <div className="grid grid-cols-3 max-md:grid-cols-1 gap-3 mt-2">
        {PARTS.map((p, i) => (
          <button key={p.title}
            onClick={() => setOn((prev) => prev.map((v, k) => (k === i ? !v : v)))}
            className={`text-left rounded-[14px] border p-[18px] transition-all cursor-pointer ${
              on[i] ? "border-primary bg-[#eaf3ff]" : "border-hairline bg-white"}`}>
            <div className={`text-[15px] font-semibold tracking-[-0.25px] ${on[i] ? "text-primary" : ""}`}>{p.title}</div>
            <div className="text-[12px] text-ink-48 mt-1">{p.sub}</div>
          </button>
        ))}
      </div>
      <div className="mt-[22px] bg-white border border-hairline rounded-[11px] px-5 py-4 text-[14px] tracking-[-0.224px] text-ink-80 leading-[1.6] min-h-[74px]">
        {n === 0
          ? <span className="text-ink-48 italic">"결제가 안 돼요. 급해요!!" — 위의 3요소를 켜서 이 요청을 업그레이드해 보세요.</span>
          : body}
      </div>
      <div className="mt-6">
        <div className="h-2.5 bg-[#f0f0f0] rounded-full overflow-hidden max-w-[480px]">
          <div className="h-full rounded-full transition-all duration-500" style={{ width: `${s.w}%`, background: s.c }} />
        </div>
        <div className="text-[13.5px] text-ink-80 mt-2.5">{s.t}</div>
      </div>
    </div>
  );
}
