import { useRef, useState, type ReactNode } from "react";
import Icon from "./Icon";
import { Pill } from "./ui";

const AGENT_STEPS = [
  "계획 수립 — 검색 → 읽기 → 정리 → 표 작성 순으로 진행하겠습니다",
  "1단계 · 웹에서 3사의 최신 가격 페이지를 검색하는 중",
  "2단계 · 각 사 공식 문서를 읽고 핵심을 추출하는 중",
  "3단계 · 수집한 정보로 비교표를 작성하는 중",
];

// 에이전트가 만들어내는 결과물 (예시 데이터)
const COLS = ["구분", "A사", "B사", "C사"];
const TABLE: string[][] = [
  ["요금제", "월 29,000원 구독형", "사용량 기반 종량제", "무료 + 팀 플랜"],
  ["무료 체험", "14일", "없음", "30일"],
  ["핵심 강점", "협업 · 권한 관리", "낮은 시작 비용", "확장성 · API"],
  ["고객 지원", "이메일", "24시간 채팅", "전담 매니저"],
];

function Msg({ show, step = false, children }: { show: boolean; step?: boolean; children: ReactNode }) {
  return (
    <div className={`text-[14px] tracking-[-0.224px] leading-[1.55] rounded-[11px] px-4 py-3 mt-2.5 transition-all duration-500 ${
      step ? "bg-[#eaf3ff]" : "bg-parchment"} ${show ? "opacity-100 translate-y-0" : "opacity-0 translate-y-1.5"}`}>
      {children}
    </div>
  );
}

export default function Ep6Agent() {
  const [phase, setPhase] = useState(-1);
  const [rows, setRows] = useState(0); // 표에서 채워진 행 수
  const running = useRef(false);
  const timers = useRef<number[]>([]);

  const go = () => {
    if (running.current) return;
    running.current = true;
    timers.current.forEach(clearTimeout);
    timers.current = [];
    setPhase(-1);
    setRows(0);
    const at = (ms: number, fn: () => void) => timers.current.push(setTimeout(fn, ms) as unknown as number);

    at(300, () => setPhase(0));
    at(1200, () => setPhase(1));
    AGENT_STEPS.forEach((_, k) => at(1200 + (k + 1) * 1100, () => setPhase(2 + k)));
    // 마지막 단계 이후 표가 한 행씩 채워짐 — "결과물이 실제로 만들어지는" 모습
    const tableStart = 1200 + (AGENT_STEPS.length + 1) * 1100;
    TABLE.forEach((_, r) => at(tableStart + r * 450, () => setRows(r + 1)));
    at(tableStart + TABLE.length * 450 + 200, () => { running.current = false; });
  };

  const lastStep = 2 + AGENT_STEPS.length - 1;
  const done = rows >= TABLE.length;

  return (
    <div>
      <Pill onClick={go} sm>같은 요청, 동시에 시켜보기</Pill>
      <div className="grid grid-cols-2 max-md:grid-cols-1 gap-5 mt-[22px] items-start">
        {/* 챗봇 */}
        <div className="bg-white border border-hairline rounded-lg2 p-[22px] min-h-[300px]">
          <h5 className="text-[15px] font-semibold mb-3.5 flex items-center gap-2">
            <span className="text-ink-48"><Icon name="message" size={16} /></span> 챗봇
            <span className="font-normal text-ink-48 text-[12px]">묻고 답하기</span>
          </h5>
          <Msg show={phase >= 0}>"경쟁사 3곳 조사해 비교표로 만들어줘"</Msg>
          <Msg show={phase >= 1}>제가 아는 범위에서 말씀드리면 A사는 구독형이고, B사는… (학습 시점 기준의 1회 답변으로 종료)</Msg>
          {phase >= 1 && (
            <p className="text-[12px] text-ink-48 mt-3.5 leading-[1.5]">
              최신 가격을 직접 확인하지 못하고, 표 파일을 만들어 주지도 못합니다.
            </p>
          )}
        </div>

        {/* 에이전트 */}
        <div className="bg-white border border-hairline rounded-lg2 p-[22px] min-h-[300px]">
          <h5 className="text-[15px] font-semibold mb-3.5 flex items-center gap-2">
            <span className="text-primary"><Icon name="bot" size={17} /></span> 에이전트
            <span className="font-normal text-ink-48 text-[12px]">스스로 계획하고 도구를 사용</span>
          </h5>
          <Msg show={phase >= 0}>"경쟁사 3곳 조사해 비교표로 만들어줘"</Msg>
          {AGENT_STEPS.map((s, k) => {
            const isLast = k === AGENT_STEPS.length - 1;
            const spinning = phase === 2 + k && !(isLast && done);
            const text = isLast && done ? "3단계 · 비교표 작성 완료" : s;
            return (
              <Msg key={s} step show={phase >= 2 + k}>
                {spinning && <span className="spin-emoji mr-1.5 inline-block align-[-2px] text-primary"><Icon name="refresh" size={13} /></span>}
                {isLast && done && <span className="mr-1.5 inline-block align-[-2px] text-[#1a7a38]"><Icon name="check" size={13} strokeWidth={2.6} /></span>}
                {text}
              </Msg>
            );
          })}

          {/* 실제 결과물: 비교표가 한 행씩 채워짐 */}
          {phase >= lastStep && (
            <div className="mt-3.5 border border-hairline rounded-[11px] overflow-hidden">
              <div className="flex items-center justify-between px-3.5 py-2 bg-[#eaf3ff] border-b border-hairline">
                <span className="text-[12px] font-semibold text-primary flex items-center gap-1.5">
                  <Icon name="file" size={13} /> 경쟁사_비교표
                </span>
                <span className="text-[11px] text-primary inline-flex items-center gap-1">
                  {done ? <><Icon name="check" size={12} strokeWidth={2.6} /> 제출 완료</>
                        : <><span className="spin-emoji inline-block"><Icon name="refresh" size={11} /></span> 작성 중</>}
                </span>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-[12.5px] border-collapse">
                  <thead>
                    <tr className="bg-parchment">
                      {COLS.map((c, i) => (
                        <th key={c} className={`text-left font-semibold px-3 py-2 whitespace-nowrap ${i === 0 ? "text-ink-48" : ""} ${i > 0 ? "border-l border-hairline" : ""}`}>{c}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {TABLE.map((row, r) => (
                      <tr key={row[0]} className={`border-t border-hairline transition-all duration-300 ${
                        r < rows ? "opacity-100" : "opacity-0"}`}>
                        {row.map((cell, i) => (
                          <td key={i} className={`px-3 py-2 align-top ${i === 0 ? "font-medium text-ink-48 whitespace-nowrap" : "text-ink-80"} ${i > 0 ? "border-l border-hairline" : ""}`}>
                            {r < rows ? cell : ""}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>
      <p className="text-[12px] text-ink-48 mt-4 leading-[1.5]">
        표의 수치는 시연용 예시입니다. 요점은 <b className="text-ink-80">에이전트는 스스로 도구(웹 검색·문서 읽기)를 써서 결과물까지 만들어 낸다</b>는 점입니다.
      </p>
    </div>
  );
}
