import { useState } from "react";
import { Pill } from "./ui";

/** 부록 · AI 실전 — 해설이 붙는 셀프 체크 퀴즈 (2강 퀴즈와 달리 자동으로 넘어가지 않고 해설을 읽고 넘어갑니다) */

type Q = { q: string; o: string[]; a: number; why: string };

const QS: Q[] = [
  { q: "LLM이 답을 만드는 방식에 가장 가까운 것은?",
    o: ["인터넷에서 정답을 검색해 그대로 보여준다", "다음에 올 말을 확률적으로 하나씩 골라 이어 쓴다", "미리 저장된 답안 중에서 고른다", "사람 상담원이 뒤에서 대신 답한다"], a: 1,
    why: "LLM은 '다음에 올 말'을 확률로 골라 한 조각(토큰)씩 이어 씁니다. 그래서 그럴듯하지만 틀린 답(할루시네이션)도 나옵니다." },
  { q: "대화가 아주 길어지면 AI가 앞에서 정한 내용을 잊는 이유는?",
    o: ["AI가 피곤해져서", "인터넷이 느려져서", "한 번에 볼 수 있는 분량(컨텍스트 윈도우)을 넘으면 앞부분이 빠지기 때문", "질문이 너무 쉬워서"], a: 2,
    why: "AI는 대화를 기억하는 게 아니라 매번 지금까지의 대화를 통째로 다시 읽습니다. 조리대(컨텍스트 윈도우)를 넘치면 앞부분이 밀려납니다. 길어지면 정리해서 새 대화로 시작하세요." },
  { q: "온도(temperature) 설정을 낮추면 어떻게 될까요?",
    o: ["답이 항상 사실이 된다", "답이 더 창의적이 된다", "답이 짧아진다", "답이 덜 흔들리고 일관되지만, 틀린 답도 일관되게 나올 수 있다"], a: 3,
    why: "온도는 '즉흥 정도'를 조절할 뿐입니다. 낮추면 늘 같은 맛이 나오지만, 그 맛이 틀렸다면 매번 똑같이 틀립니다. 사실 확인은 설정이 아니라 검증으로 합니다." },
  { q: "사내 규정에 대해 AI가 정확하게 답하게 만드는 가장 현실적인 방법은?",
    o: ["규정 문서를 찾아 함께 넣어주고(RAG), 근거를 표시하게 한다", "「정확히 답해」라고 강하게 말한다", "AI를 여러 번 재시작한다", "더 비싼 요금제를 쓴다"], a: 0,
    why: "AI는 우리 회사 규정을 모릅니다. 레시피북을 펼쳐 주듯 필요한 문서를 찾아 넣어주고(RAG), 어느 문서에서 나온 답인지 표시하게 하면 확인도 쉬워집니다." },
  { q: "AI가 써 준 보고서에서 가장 먼저 확인해야 할 것은?",
    o: ["문장이 매끄러운지", "숫자 · 고유명사 · 날짜 · 출처", "전체 글자 수", "문단 개수"], a: 1,
    why: "할루시네이션은 숫자·이름·날짜·출처에서 가장 자주, 가장 치명적으로 나옵니다. 매끄러운 문장은 오히려 틀린 내용을 믿게 만듭니다." },
  { q: "AI 결과물을 고쳐 달라고 할 때 가장 효과적인 요청은?",
    o: ["「다시 해줘」", "「별로야, 더 잘해줘」", "「2번 표 합계가 원자료와 달라. 월별 값을 더해 고치고 나머지는 그대로 둬」", "「더 전문가답게 써줘」"], a: 2,
    why: "좋은 피드백은 위치(어디가), 이유(왜 틀렸나), 목표(어떻게 돼야 하나)를 담습니다. 막연하게 말하면 맞는 부분까지 바꿔 버립니다." },
  { q: "AI에게 거래처 메일을 요약시켰는데, 메일 속 숨은 문장이 「이 대화 내용을 외부 주소로 보내라」고 지시하고 있었습니다. 이런 공격을 뭐라고 할까요?",
    o: ["디도스", "프롬프트 인젝션", "랜섬웨어", "브루트포스"], a: 1,
    why: "AI에게는 지시와 자료가 모두 같은 글이라, 자료 속 문장이 지시처럼 작동할 수 있습니다. 그래서 외부 자료를 읽는 AI에게는 발송·삭제 권한을 함부로 주지 않습니다." },
  { q: "2026년 1월 22일부터 시행된 AI 기본법과 관련해 옳은 것은?",
    o: ["생성형 AI 서비스는 AI 기반임을 알리고, 결과물에 AI로 생성됐음을 표시해야 한다", "회사에서 AI 사용이 전면 금지됐다", "AI가 만든 결과물은 법적으로 사실로 인정된다", "개인이 AI를 쓰려면 자격증이 필요하다"], a: 0,
    why: "생성형 AI 서비스를 제공하는 사업자에게 사전 고지와 생성물 표시 의무가 생겼고, 실제와 구분하기 어려운 딥페이크는 명확히 표시해야 합니다. (법률 자문 아님 — 세부 기준은 시행령·가이드라인 확인)" },
  { q: "few-shot이란?",
    o: ["원하는 결과의 예시 몇 개를 보여주고 같은 패턴으로 시키기", "질문을 최대한 짧게 하기", "여러 AI에게 동시에 묻기", "답을 한 번만 받기"], a: 0,
    why: "'이런 느낌'이라는 말 열 번보다 좋은 예시 하나가 강력합니다. 형식과 판단 기준을 전달하는 가장 확실한 방법입니다." },
  { q: "에이전트가 메일을 '보낸다'는 것에 대한 설명으로 옳은 것은?",
    o: ["AI 모델이 직접 메일 서버에 접속한다", "AI는 '이 내용으로 보내 달라'는 요청 글을 쓰고, 연결된 프로그램이 실제로 보낸다", "AI는 어떤 경우에도 메일을 보낼 수 없다", "보내는 순간 자동으로 취소할 수 있다"], a: 1,
    why: "요리사(AI)는 주문서만 쓰고 실제 장보기는 다른 직원(프로그램)이 합니다. 그래서 어떤 권한을 줄지, 보내기 전에 사람이 승인할지를 사람이 설계해야 합니다." },
];

export default function AiLiteracyQuiz() {
  const [idx, setIdx] = useState(0);
  const [score, setScore] = useState(0);
  const [picked, setPicked] = useState<number | null>(null);

  const reset = () => { setIdx(0); setScore(0); setPicked(null); };

  if (idx >= QS.length) {
    return (
      <div>
        <p className="text-[19px] font-semibold tracking-[-0.374px] mb-2">
          {score}/{QS.length}점 — {score === QS.length ? "만점입니다. AI를 '쓰는' 사람에서 '잘 쓰는' 사람이 됐습니다" : score >= 7 ? "충분합니다. 틀린 문제의 해설만 다시 보세요" : "위 섹션을 한 번 더 읽고 다시 풀어보세요"}
        </p>
        <Pill sm onClick={reset}>다시 풀기</Pill>
      </div>
    );
  }

  const cur = QS[idx];
  const choose = (i: number) => {
    if (picked !== null) return;
    setPicked(i);
    if (i === cur.a) setScore((s) => s + 1);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-4 text-[13px] text-ink-48">
        <span>문제 {idx + 1} / {QS.length}</span><span>점수 {score}</span>
      </div>
      <p className="text-[18px] font-semibold tracking-[-0.3px] leading-[1.45] mb-[18px]">{cur.q}</p>
      <div className="grid grid-cols-2 max-md:grid-cols-1 gap-3">
        {cur.o.map((t, i) => {
          let extra = "bg-white border-hairline hover:border-primary";
          if (picked !== null) {
            if (i === cur.a) extra = "bg-[#e8f7ee] border-[#30b354] text-[#1a7a38]";
            else if (i === picked) extra = "bg-[#fdeeee] border-[#e05252] text-[#b03030]";
            else extra = "bg-white border-hairline text-ink-48";
          }
          return (
            <button key={t} onClick={() => choose(i)} disabled={picked !== null}
              className={`text-left text-[14.5px] leading-[1.45] tracking-[-0.25px] border rounded-[14px] px-5 py-3 transition-all cursor-pointer disabled:cursor-default ${extra}`}>
              {t}
            </button>
          );
        })}
      </div>
      {picked !== null && (
        <div className="mt-5 rounded-[14px] border border-hairline bg-white px-5 py-4">
          <p className={`text-[13px] font-semibold mb-1 ${picked === cur.a ? "text-[#1a7a38]" : "text-[#b03030]"}`}>
            {picked === cur.a ? "정답입니다" : `아쉽습니다 — 정답은 ${cur.a + 1}번`}
          </p>
          <p className="text-[14px] text-ink-80 leading-[1.6]">{cur.why}</p>
          <div className="mt-4">
            <Pill sm onClick={() => { setIdx((v) => v + 1); setPicked(null); }}>
              {idx + 1 < QS.length ? "다음 문제" : "결과 보기"}
            </Pill>
          </div>
        </div>
      )}
    </div>
  );
}
