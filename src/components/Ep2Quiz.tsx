import { useState } from "react";
import { Pill } from "./ui";

type Q = { q: string; o: string[]; a: number };
const QS: Q[] = [
  { q: "Q1. “레거시라서 시간 걸려요”의 속뜻은?", o: ["오래된 코드라 무섭고 오래 걸립니다", "유산 상속 문제가 있습니다", "레고 조립 중입니다", "전설의 개발자가 만들었습니다"], a: 0 },
  { q: "Q2. “롤백하시죠”의 뜻은?", o: ["롤케이크를 먹자", "이전 버전으로 되돌리자", "의자를 뒤로 젖히자", "코드를 반복 실행하자"], a: 1 },
  { q: "Q3. 밀키트에 해당하는 것은?", o: ["라이브러리", "프레임워크", "오픈소스", "DB"], a: 1 },
  { q: "Q4. “로컬”은 어디를 말할까요?", o: ["회사 근처 지역", "개발자 본인 컴퓨터", "지방 서버", "지역 맛집"], a: 1 },
  { q: "Q5. 금요일 오후에 하면 안 되는 것은?", o: ["퇴근", "배포", "회의", "커피"], a: 1 },
  { q: "Q6. (보너스) “스테이징에서 터져요. 어제 머지된 PR 때문 같은데 롤백할까요?”의 통역은?", o: ["리허설 매장에서 문제 발견, 어제 합친 코드가 원인 같으니 되돌릴까요?", "무대가 무너졌으니 홍보팀에 연락하자", "스테이크가 타서 환불해야 한다", "PR(홍보)팀이 사고를 쳤다"], a: 0 },
];
const PRAISE = ["정답!  커피 쿠폰에 한 걸음 더", "정답! 아는 척 레벨 업", "정답! 개발자들이 놀라기 시작합니다"];

export default function Ep2Quiz() {
  const [idx, setIdx] = useState(0);
  const [score, setScore] = useState(0);
  const [picked, setPicked] = useState<number | null>(null);
  const [fb, setFb] = useState<{ t: string; good: boolean } | null>(null);

  const pick = (i: number) => {
    if (picked !== null) return;
    setPicked(i);
    const ok = i === QS[idx].a;
    if (ok) setScore((s) => s + 1);
    setFb(ok ? { t: PRAISE[idx % PRAISE.length], good: true } : { t: "아깝습니다! 정답을 확인하세요", good: false });
    setTimeout(() => { setIdx((v) => v + 1); setPicked(null); setFb(null); }, 1400);
  };
  const reset = () => { setIdx(0); setScore(0); setPicked(null); setFb(null); };

  if (idx >= QS.length) {
    return (
      <div>
        <div className="text-[19px] font-semibold tracking-[-0.374px] mb-4">
          {score === QS.length
            ? `만점! ${score}/${QS.length} — 커피 쿠폰의 주인공입니다 🎉`
            : `완료! ${score}/${QS.length}점 — ${score >= 4 ? "아는 척 자격 충분합니다" : "카드를 복습하고 오면 만점 각입니다"}`}
        </div>
        <Pill sm onClick={reset}>다시 풀기</Pill>
      </div>
    );
  }
  const cur = QS[idx];
  return (
    <div>
      <div className="flex justify-between items-center mb-4 text-[13px] text-ink-48">
        <span>문제 {idx + 1} / {QS.length}</span><span>점수 {score}</span>
      </div>
      <div className="text-[19px] font-semibold tracking-[-0.374px] mb-[18px] min-h-14">{cur.q}</div>
      <div className="grid grid-cols-2 max-md:grid-cols-1 gap-3">
        {cur.o.map((t, i) => {
          let extra = "bg-white border-hairline hover:border-primary";
          if (picked !== null) {
            if (i === cur.a) extra = "bg-[#e8f7ee] border-[#30b354] text-[#1a7a38]";
            else if (i === picked) extra = "bg-[#fdeeee] border-[#e05252] text-[#b03030]";
            else extra = "bg-white border-hairline";
          }
          return (
            <button key={t} onClick={() => pick(i)} disabled={picked !== null}
              className={`text-left text-[15px] tracking-[-0.25px] border rounded-full px-5 py-[13px] transition-all cursor-pointer disabled:cursor-default ${extra}`}>
              {t}
            </button>
          );
        })}
      </div>
      <div className={`mt-4 text-[14px] min-h-[22px] tracking-[-0.224px] ${fb ? (fb.good ? "text-[#1a7a38]" : "text-[#b03030]") : ""}`}>
        {fb?.t}
      </div>
    </div>
  );
}
