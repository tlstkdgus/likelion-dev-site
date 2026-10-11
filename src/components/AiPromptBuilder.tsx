import { useState } from "react";
import Icon, { type IconName } from "./Icon";

/** 부록 · AI 실전 — 프롬프트 6요소를 켜고 끄며 요청이 어떻게 달라지는지 보는 실습 (4강 요청 빌더의 AI 버전) */

type Part = { title: string; sub: string; icon: IconName; text: string; miss: string };

const PARTS: Part[] = [
  { title: "역할", sub: "어떤 관점으로", icon: "users",
    text: "너는 우리 팀 회의 내용을 임원 보고용으로 정리하는 기획 담당자야.",
    miss: "어떤 관점으로 정리할지 몰라, 무난하지만 밋밋한 요약이 나와요" },
  { title: "맥락", sub: "누가, 왜 읽나", icon: "book",
    text: "다음 주 임원 보고에 쓸 거야. 임원은 회의에 없었고, 결정이 필요한 안건만 궁금해해.",
    miss: "누가 왜 읽는지 몰라 너무 자세하거나 핵심을 놓쳐요" },
  { title: "과제", sub: "무엇을 할지 정확히", icon: "target",
    text: "아래 회의록에서 결정된 사항, 아직 안 정해진 안건, 담당자별 할 일을 뽑아 줘.",
    miss: "「요약」이 뭘 뜻하는지 몰라 회의 순서대로 나열해요" },
  { title: "제약", sub: "분량 · 금지 · 기준", icon: "lock",
    text: "A4 1쪽 이내, 존댓말. 회의록에 없는 내용은 지어내지 말고 [확인 필요]라고 표시해.",
    miss: "분량이 들쭉날쭉하고, 회의록에 없는 내용을 그럴듯하게 채울 수 있어요" },
  { title: "형식", sub: "결과물의 모양", icon: "layers",
    text: "① 한 줄 결론 ② 결정 사항 표(안건·결정·근거) ③ 할 일 표(담당·기한) 순서로.",
    miss: "매번 다른 모양으로 나와 비교하고 보고하기 어려워요" },
  { title: "예시", sub: "원하는 결과 샘플", icon: "file",
    text: "첨부한 지난주 보고서와 같은 말투, 같은 칸 구성을 따라 줘.",
    miss: "팀에서 쓰는 말투·칸 구성과 달라 손으로 다시 고쳐야 해요" },
];

const TIERS = [
  { min: 0, badge: "다시 시켜야 함", c: "#e05252", bg: "#fdeeee",
    result: "회의 순서대로 늘어놓은 10줄. 결정과 잡담이 섞여 있고, 누가 무엇을 할지 빠져 있습니다." },
  { min: 2, badge: "손이 많이 감", c: "#e08a3c", bg: "#fdf3e9",
    result: "모양은 그럴듯하지만 무엇을 강조할지 몰라 덜 중요한 안건이 섞이고, 분량이 들쭉날쭉합니다." },
  { min: 4, badge: "조금만 손보면 됨", c: "#c99a10", bg: "#fbf6e3",
    result: "임원 보고에 거의 쓸 수 있는 수준입니다. 아래의 빠진 요소만 보완하면 됩니다." },
  { min: 6, badge: "바로 쓸 수 있음", c: "#30b354", bg: "#e8f7ee",
    result: "바로 보고할 수 있는 1쪽. 회의록에 없는 내용은 [확인 필요]로 표시돼 있어 검증도 쉽습니다." },
];

export default function AiPromptBuilder() {
  const [on, setOn] = useState<boolean[]>(PARTS.map(() => false));
  const n = on.filter(Boolean).length;
  const tier = [...TIERS].reverse().find((t) => n >= t.min) ?? TIERS[0];
  const missing = PARTS.filter((_, i) => !on[i]);

  return (
    <div>
      {/* 6요소 토글 */}
      <div className="grid grid-cols-3 max-md:grid-cols-2 gap-3">
        {PARTS.map((p, i) => (
          <button key={p.title}
            onClick={() => setOn((prev) => prev.map((v, k) => (k === i ? !v : v)))}
            aria-pressed={on[i]}
            className={`text-left rounded-[14px] border p-4 transition-all cursor-pointer ${
              on[i] ? "border-primary bg-[#eaf3ff]" : "border-hairline bg-white"}`}>
            <div className="flex items-center gap-2">
              <span className={on[i] ? "text-primary" : "text-ink-48"}>
                <Icon name={on[i] ? "check" : p.icon} size={16} strokeWidth={on[i] ? 2.4 : 1.8} />
              </span>
              <span className={`text-[15px] font-semibold tracking-[-0.25px] ${on[i] ? "text-primary" : ""}`}>{p.title}</span>
            </div>
            <div className="text-[12px] text-ink-48 mt-1.5">{p.sub}</div>
          </button>
        ))}
      </div>

      {/* 조립되는 프롬프트 */}
      <div className="mt-6 rounded-[14px] border border-hairline overflow-hidden bg-white">
        <div className="flex items-center justify-between gap-3 px-5 py-3 bg-[#f5f5f7] border-b border-hairline">
          <span className="text-[13px] font-semibold flex items-center gap-2">
            <Icon name="pen" size={14} /> 내가 보내는 요청
          </span>
          <span className="text-[12px] text-ink-48">{n} / {PARTS.length} 요소</span>
        </div>
        <div className="px-5 py-4 text-[14px] leading-[1.7] text-ink-80">
          {n === 0 ? (
            <p>회의록 요약해 줘.</p>
          ) : (
            PARTS.map((p, i) => on[i] && (
              <p key={p.title} className="mt-1 first:mt-0">
                <span className="text-[11px] font-semibold text-primary mr-2 align-middle">{p.title}</span>{p.text}
              </p>
            ))
          )}
          <p className="mt-3 text-[13px] text-ink-48">&lt;회의록&gt; (여기에 회의록 원문) &lt;/회의록&gt;</p>
        </div>

        {/* AI 결과 예상 */}
        <div className="px-5 py-4 border-t border-hairline bg-pearl">
          <div className="flex items-center gap-2.5 mb-1.5">
            <p className="text-[12px] text-ink-48">AI 결과 예상</p>
            <span className="text-[11.5px] font-semibold rounded-full px-2.5 py-0.5" style={{ color: tier.c, background: tier.bg }}>
              {tier.badge}
            </span>
          </div>
          <p className="text-[14px] leading-[1.6] text-ink-80">{tier.result}</p>
        </div>
      </div>

      {/* 빠진 요소 → 생기는 일 */}
      {missing.length > 0 ? (
        <div className="mt-5">
          <p className="text-[13px] font-semibold text-ink-80 mb-2.5">빠진 요소 때문에 생기는 일</p>
          <ul className="space-y-2">
            {missing.map((p) => (
              <li key={p.title} className="flex items-start gap-2.5 text-[13.5px] text-ink-48 leading-[1.5]">
                <span className="text-[#e08a3c] flex-none mt-0.5"><Icon name="alert" size={14} /></span>
                <span><b className="text-ink-80 font-semibold">{p.title}</b> 없음 — {p.miss}</span>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <p className="mt-5 text-[14px] text-[#1a7a38] flex items-center gap-2">
          <Icon name="check" size={15} strokeWidth={2.4} /> 여섯 요소가 모두 들어갔습니다. 이제 결과를 검증할 차례입니다.
        </p>
      )}
    </div>
  );
}
