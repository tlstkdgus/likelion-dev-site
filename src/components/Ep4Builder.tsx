import { useState } from "react";
import Icon, { type IconName } from "./Icon";

const PARTS: { title: string; sub: string; icon: IconName; label: string; text: string }[] = [
  { title: "현상", sub: "무엇이 일어나는가 + 스크린샷", icon: "alert", label: "현상",
    text: "결제 페이지에서 결제 버튼을 누르면 흰 화면이 표시됩니다." },
  { title: "재현 방법", sub: "어떻게 하면 발생하는가 — 가장 중요", icon: "refresh", label: "재현 방법",
    text: "쿠폰을 적용한 상태에서만 발생합니다. 쿠폰 없이는 정상 동작하며, 크롬에서 재현됩니다." },
  { title: "기대 동작", sub: "원래는 어때야 하는가", icon: "target", label: "기대 동작",
    text: "정상이라면 결제 완료 페이지로 이동해야 합니다." },
];

// n = 채워진 요소 수(0~3)에 따른 티켓 상태와 예상 핑퐁
const STATES = [
  { badge: "반려 위험", bc: "#e05252", bg: "#fdeeee", pong: "예상 핑퐁 5회 — 되묻느라 반나절이 소모됩니다", c: "#e05252", w: 100, react: "\"어느 화면에서요? 뭘 누르셨어요? 에러 메시지는요?\"" },
  { badge: "정보 부족", bc: "#e08a3c", bg: "#fdf3e9", pong: "예상 핑퐁 3회 — 아직 되물어봐야 할 것이 많습니다", c: "#e08a3c", w: 66, react: "\"재현되는 조건을 조금만 더 알려주실 수 있을까요?\"" },
  { badge: "확인 필요", bc: "#c99a10", bg: "#fbf6e3", pong: "예상 핑퐁 1회 — 거의 다 왔습니다", c: "#d4b420", w: 33, react: "\"거의 명확해요. 기대 동작만 확인하면 바로 볼게요.\"" },
  { badge: "접수 가능", bc: "#30b354", bg: "#e8f7ee", pong: "핑퐁 0회 — 개발자가 바로 원인 분석에 들어갑니다", c: "#30b354", w: 6, react: "\"확인했습니다. 바로 재현해서 원인 보겠습니다.\"" },
];

export default function Ep4Builder() {
  const [on, setOn] = useState([false, false, false]);
  const n = on.filter(Boolean).length;
  const s = STATES[n];

  return (
    <div>
      {/* 3요소 토글 */}
      <div className="grid grid-cols-3 max-md:grid-cols-1 gap-3">
        {PARTS.map((p, i) => (
          <button key={p.title}
            onClick={() => setOn((prev) => prev.map((v, k) => (k === i ? !v : v)))}
            className={`text-left rounded-[14px] border p-[18px] transition-all cursor-pointer ${
              on[i] ? "border-primary bg-[#eaf3ff]" : "border-hairline bg-white"}`}>
            <div className="flex items-center gap-2">
              <span className={on[i] ? "text-primary" : "text-ink-48"}><Icon name={on[i] ? "check" : p.icon} size={16} strokeWidth={on[i] ? 2.4 : 1.8} /></span>
              <span className={`text-[15px] font-semibold tracking-[-0.25px] ${on[i] ? "text-primary" : ""}`}>{p.title}</span>
            </div>
            <div className="text-[12px] text-ink-48 mt-1.5">{p.sub}</div>
          </button>
        ))}
      </div>

      {/* 실제로 조립되는 이슈 티켓 */}
      <div className="mt-6 rounded-[14px] border border-hairline overflow-hidden bg-white">
        <div className="flex items-center justify-between gap-3 px-5 py-3 bg-[#f5f5f7] border-b border-hairline">
          <span className="text-[13px] font-semibold flex items-center gap-2">
            <Icon name="file" size={14} /> 이슈 #128 · 결제 버튼 무응답
          </span>
          <span className="text-[11.5px] font-semibold rounded-full px-2.5 py-1"
            style={{ color: s.bc, background: s.bg }}>{s.badge}</span>
        </div>

        <div className="px-5 py-4 space-y-3">
          {PARTS.map((p, i) => (
            <div key={p.title} className="flex items-start gap-3">
              <span className={`flex-none mt-0.5 ${on[i] ? "text-primary" : "text-[#d0d0d5]"}`}>
                <Icon name={p.icon} size={16} />
              </span>
              <div className="min-w-0 flex-1">
                <p className={`text-[12px] font-semibold ${on[i] ? "text-ink-80" : "text-[#c0c0c5]"}`}>{p.label}</p>
                {on[i]
                  ? <p className="text-[13.5px] text-ink-80 leading-[1.55] mt-0.5">{p.text}</p>
                  : <p className="text-[13px] text-[#c0c0c5] italic mt-0.5">미기재 — 개발자가 되물어야 합니다</p>}
                {i === 0 && on[0] && (
                  <span className="inline-flex items-center gap-1.5 mt-2 text-[11.5px] text-ink-48 border border-hairline rounded-md px-2 py-1">
                    <Icon name="file" size={11} /> 결제화면_오류.png
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="px-5 py-3 border-t border-hairline bg-pearl">
          <p className="text-[12px] text-ink-48 mb-1">담당 개발자 반응</p>
          <p className="text-[13.5px] text-ink-80 leading-[1.5]" style={{ color: n >= 3 ? "#1a7a38" : undefined }}>{s.react}</p>
        </div>
      </div>

      {/* 예상 핑퐁 미터 */}
      <div className="mt-5">
        <div className="flex items-center justify-between text-[12px] text-ink-48 mb-1.5 max-w-[520px]">
          <span>요청 완성도</span><span>{n} / 3 요소</span>
        </div>
        <div className="h-2.5 bg-[#f0f0f0] rounded-full overflow-hidden max-w-[520px]">
          <div className="h-full rounded-full transition-all duration-500" style={{ width: `${100 - s.w}%`, background: s.c }} />
        </div>
        <div className="text-[13.5px] mt-2.5" style={{ color: s.c }}>{s.pong}</div>
      </div>
    </div>
  );
}
