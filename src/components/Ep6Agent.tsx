import { useRef, useState, type ReactNode } from "react";
import Icon from "./Icon";
import { Pill } from "./ui";

const AGENT_STEPS = [
  "계획 수립 — 검색 → 읽기 → 정리 → 표 작성 순으로 진행하겠습니다",
  "1단계 · 웹에서 3사의 최신 가격 페이지를 검색하는 중",
  "2단계 · 각 사 공식 문서를 읽고 핵심을 추출하는 중",
  "3단계 · 비교표 작성 완료 — 파일로 제출합니다",
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
  const running = useRef(false);

  const go = () => {
    if (running.current) return;
    running.current = true;
    setPhase(-1);
    setTimeout(() => setPhase(0), 300);
    setTimeout(() => setPhase(1), 1200);
    AGENT_STEPS.forEach((_, k) => setTimeout(() => setPhase(2 + k), 1200 + (k + 1) * 1100));
    setTimeout(() => { running.current = false; }, 1200 + (AGENT_STEPS.length + 1) * 1100);
  };

  return (
    <div>
      <Pill onClick={go} sm>같은 요청, 동시에 시켜보기</Pill>
      <div className="grid grid-cols-2 max-md:grid-cols-1 gap-5 mt-[22px]">
        <div className="bg-white border border-hairline rounded-lg2 p-[22px] min-h-[280px]">
          <h5 className="text-[15px] font-semibold mb-3.5 flex items-center gap-2">
            <span className="text-ink-48"><Icon name="message" size={16} /></span> 챗봇
            <span className="font-normal text-ink-48 text-[12px]">묻고 답하기</span>
          </h5>
          <Msg show={phase >= 0}>"경쟁사 3곳 조사해 비교표로 만들어줘"</Msg>
          <Msg show={phase >= 1}>제가 아는 범위에서 말씀드리면 A사는 구독형이고, B사는… (학습 시점 기준의 1회 답변으로 종료)</Msg>
        </div>
        <div className="bg-white border border-hairline rounded-lg2 p-[22px] min-h-[280px]">
          <h5 className="text-[15px] font-semibold mb-3.5 flex items-center gap-2">
            <span className="text-primary"><Icon name="bot" size={17} /></span> 에이전트
            <span className="font-normal text-ink-48 text-[12px]">스스로 계획하고 도구를 사용</span>
          </h5>
          <Msg show={phase >= 0}>"경쟁사 3곳 조사해 비교표로 만들어줘"</Msg>
          {AGENT_STEPS.map((s, k) => (
            <Msg key={s} step show={phase >= 2 + k}>
              {phase === 2 + k && k < AGENT_STEPS.length - 1 && <span className="spin-emoji mr-1.5 inline-block align-[-2px] text-primary"><Icon name="refresh" size={13} /></span>}
              {s}
            </Msg>
          ))}
        </div>
      </div>
    </div>
  );
}
