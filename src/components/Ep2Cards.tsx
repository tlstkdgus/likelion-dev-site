import { useState, type ReactNode } from "react";
import Icon, { type IconName } from "./Icon";

const CARDS: { icon: IconName; t: string; b: ReactNode }[] = [
  { icon: "box", t: "라이브러리", b: <><b className="text-skylink">양념 세트.</b> 필요할 때 꺼내 쓰는 도구 모음. 주도권은 나에게 있습니다.</> },
  { icon: "layers", t: "프레임워크", b: <><b className="text-skylink">밀키트.</b> 정해진 틀을 따라갑니다. 주도권은 프레임워크에게. (리액트, 스프링이 이런 도구의 이름)</> },
  { icon: "users", t: "오픈소스", b: <><b className="text-skylink">전 세계 공개 레시피.</b> 다 같이 검증해서 오히려 품질이 좋습니다.</> },
  { icon: "home", t: "레거시", b: <><b className="text-skylink">물려받은 20년 된 주방.</b> "레거시라서요..." = "무섭고 오래 걸립니다"</> },
  { icon: "search", t: "버그 · 디버깅", b: <><b className="text-skylink">결함 · 결함 잡기.</b> 어원은 1947년 컴퓨터에 들어간 진짜 나방 한 마리.</> },
  { icon: "monitor", t: "“로컬에서는 되는데요”", b: <><b className="text-skylink">개발자 밈 1위.</b> 로컬 = 개발자 본인 컴퓨터. 집에선 완벽했던 요리가 매장에서 실패.</> },
  { icon: "server", t: "배포", b: <><b className="text-skylink">신메뉴가 매장에 나가는 길.</b> 로컬 → 스테이징(리허설) → 프로덕션. 금요일 오후엔 나가지 않습니다.</> },
  { icon: "target", t: "MVP", b: <><b className="text-skylink">핵심만 담은 첫 버전.</b> Minimum Viable Product — 야구가 아닙니다.</> },
];

function Flip({ icon, t, b }: (typeof CARDS)[number]) {
  const [on, setOn] = useState(false);
  return (
    <div className={`flip h-[150px] cursor-pointer [perspective:900px] ${on ? "on" : ""}`} onClick={() => setOn(!on)}>
      <div className="flip-inner relative w-full h-full">
        <div className="flip-face absolute inset-0 rounded-lg2 border border-hairline bg-white flex flex-col items-center justify-center text-center p-3.5">
          <span className="text-primary"><Icon name={icon} size={24} /></span>
          <div className="text-[15.5px] font-semibold tracking-[-0.3px] mt-3">{t}</div>
          <div className="text-[11px] text-ink-48 mt-1.5">카드를 클릭해 뜻 확인</div>
        </div>
        <div className="flip-face flip-back absolute inset-0 rounded-lg2 border border-hairline bg-ink text-white flex items-center justify-center text-center p-4">
          <p className="text-[13px] leading-[1.5] tracking-[-0.2px]">{b}</p>
        </div>
      </div>
    </div>
  );
}

export default function Ep2Cards() {
  return (
    <div className="grid grid-cols-4 max-md:grid-cols-2 gap-3.5 mt-8">
      {CARDS.map((c) => <Flip key={c.t} {...c} />)}
    </div>
  );
}
