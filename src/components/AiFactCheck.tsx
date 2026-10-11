import { useState } from "react";
import Icon from "./Icon";
import { Pill } from "./ui";

/** 부록 · AI 실전 — AI가 쓴 보고서에서 틀린 문장을 원자료와 대조해 찾아보는 실습 */

type Line = { text: string; wrong: boolean; why: string };

const LINES: Line[] = [
  { text: "3분기 고객 문의는 총 3,930건입니다.", wrong: true,
    why: "계산 오류 — 원자료를 더하면 1,240 + 1,180 + 1,410 = 3,830건입니다. AI는 계산을 「그럴듯하게」 틀립니다. 숫자는 직접 다시 계산하세요." },
  { text: "월별로는 9월이 1,410건으로 가장 많았습니다.", wrong: false,
    why: "원자료와 일치합니다." },
  { text: "문의 유형은 배송이 42%로 가장 많고, 환불이 31%로 뒤를 이었습니다.", wrong: false,
    why: "원자료와 일치합니다." },
  { text: "최근 업계 조사에 따르면 동종 업계의 평균 환불 문의 비율은 18%입니다.", wrong: true,
    why: "확인되지 않은 출처 — 원자료에 없는 통계가 「업계 조사」라는 출처와 함께 갑자기 등장했습니다. 어떤 조사인지 원문을 직접 찾기 전까지는 쓰면 안 됩니다. 기관 이름까지 그럴듯하게 지어내는 경우도 흔합니다." },
  { text: "9월 15일부터 환불 가능 기간이 14일에서 30일로 늘어났습니다.", wrong: true,
    why: "자료와 다른 말 — 원자료에는 14일에서 7일로 「줄었다」고 되어 있습니다. 자료를 줘도 거꾸로 옮기는 일이 생깁니다." },
  { text: "다음 분기에는 환불 정책 변경이 문의량에 준 영향을 지켜볼 필요가 있습니다.", wrong: false,
    why: "자료에 근거한 합리적인 제안입니다." },
];

const TOTAL_WRONG = LINES.filter((l) => l.wrong).length;

export default function AiFactCheck() {
  const [flag, setFlag] = useState<boolean[]>(LINES.map(() => false));
  const [graded, setGraded] = useState(false);

  const found = LINES.filter((l, i) => l.wrong && flag[i]).length;
  const falseAlarm = LINES.filter((l, i) => !l.wrong && flag[i]).length;

  const reset = () => { setFlag(LINES.map(() => false)); setGraded(false); };

  return (
    <div>
      {/* 원자료 */}
      <div className="rounded-[14px] border border-hairline bg-white overflow-hidden">
        <div className="px-5 py-3 bg-[#f5f5f7] border-b border-hairline text-[13px] font-semibold flex items-center gap-2">
          <Icon name="database" size={14} /> 원자료 — 3분기 고객 문의 현황
        </div>
        <div className="px-5 py-4 grid grid-cols-3 max-md:grid-cols-1 gap-4 text-[13.5px] leading-[1.6] text-ink-80">
          <div>
            <p className="text-[12px] text-ink-48 mb-1">월별 문의</p>
            <p>7월 1,240건<br />8월 1,180건<br />9월 1,410건</p>
          </div>
          <div>
            <p className="text-[12px] text-ink-48 mb-1">유형</p>
            <p>배송 42%<br />환불 31%<br />기타 27%</p>
          </div>
          <div>
            <p className="text-[12px] text-ink-48 mb-1">메모</p>
            <p>9월 15일부터 환불 가능 기간 14일 → 7일로 변경</p>
          </div>
        </div>
      </div>

      {/* AI가 쓴 보고서 */}
      <div className="mt-5 rounded-[14px] border border-hairline bg-white overflow-hidden">
        <div className="flex items-center justify-between gap-3 px-5 py-3 bg-[#f5f5f7] border-b border-hairline">
          <span className="text-[13px] font-semibold flex items-center gap-2">
            <Icon name="bot" size={14} /> AI가 쓴 요약 보고서
          </span>
          <span className="text-[12px] text-ink-48">의심되는 문장을 누르세요</span>
        </div>
        <ol className="px-3 py-3 space-y-1.5">
          {LINES.map((l, i) => {
            let cls = flag[i] ? "border-[#e08a3c] bg-[#fdf3e9]" : "border-transparent hover:bg-pearl";
            if (graded) {
              if (l.wrong && flag[i]) cls = "border-[#30b354] bg-[#e8f7ee]";
              else if (l.wrong) cls = "border-[#e05252] bg-[#fdeeee]";
              else if (flag[i]) cls = "border-[#e08a3c] bg-[#fdf3e9]";
              else cls = "border-transparent";
            }
            return (
              <li key={l.text}>
                <button type="button" disabled={graded}
                  onClick={() => setFlag((prev) => prev.map((v, k) => (k === i ? !v : v)))}
                  className={`w-full text-left rounded-[10px] border px-3 py-2.5 transition-colors cursor-pointer disabled:cursor-default ${cls}`}>
                  <span className="flex items-start gap-2.5">
                    <span className="text-[12px] text-ink-48 tabular-nums mt-0.5 flex-none">{i + 1}</span>
                    <span className="text-[14.5px] leading-[1.55] text-ink-80">{l.text}</span>
                  </span>
                  {graded && (l.wrong || flag[i]) && (
                    <span className={`block mt-1.5 ml-[22px] text-[13px] leading-[1.55] ${
                      l.wrong ? (flag[i] ? "text-[#1a7a38]" : "text-[#b03030]") : "text-[#b36b20]"}`}>
                      {l.wrong ? (flag[i] ? "잘 찾았습니다. " : "놓쳤습니다. ") : "이 문장은 맞습니다. "}{l.why}
                    </span>
                  )}
                </button>
              </li>
            );
          })}
        </ol>
      </div>

      <div className="mt-5 flex items-center gap-4 flex-wrap">
        {!graded ? (
          <Pill sm onClick={() => setGraded(true)}>채점하기</Pill>
        ) : (
          <>
            <p className="text-[15px] font-semibold tracking-[-0.3px]">
              틀린 문장 {TOTAL_WRONG}개 중 {found}개 발견{falseAlarm > 0 ? ` · 잘못 의심 ${falseAlarm}개` : ""}
            </p>
            <Pill sm ghost onClick={reset}>다시 하기</Pill>
          </>
        )}
      </div>
    </div>
  );
}
