import { useEffect, useRef, useState } from "react";
import { Pill } from "./ui";

const MENUS = ["김치찌개", "돈까스", "초밥", "샐러드", "쌀국수", "햄버거"];
const EMO = ["🍲", "🍖", "🍣", "🥗", "🍜", "🍔"];
const COLS = ["#ff6b6b", "#ffa94d", "#ffd43b", "#69db7c", "#4dabf7", "#b197fc"];
const N = MENUS.length;
const SEG = (2 * Math.PI) / N;

function draw(ctx: CanvasRenderingContext2D, a: number) {
  const R = 300, C = 320;
  ctx.clearRect(0, 0, 640, 640);
  ctx.save();
  ctx.translate(C, C);
  ctx.rotate(a);
  for (let i = 0; i < N; i++) {
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.arc(0, 0, R, i * SEG, (i + 1) * SEG);
    ctx.closePath();
    ctx.fillStyle = COLS[i];
    ctx.fill();
    ctx.save();
    ctx.rotate(i * SEG + SEG / 2);
    ctx.textAlign = "center";
    ctx.fillStyle = "#fff";
    ctx.font = "600 34px Pretendard, sans-serif";
    ctx.fillText(EMO[i], 195, 12);
    ctx.font = "600 26px Pretendard, sans-serif";
    ctx.strokeStyle = "rgba(0,0,0,.25)";
    ctx.lineWidth = 4;
    ctx.strokeText(MENUS[i], 118, 10);
    ctx.fillText(MENUS[i], 118, 10);
    ctx.restore();
  }
  ctx.beginPath();
  ctx.arc(0, 0, 54, 0, 7);
  ctx.fillStyle = "#fff";
  ctx.fill();
  ctx.font = "34px sans-serif";
  ctx.textAlign = "center";
  ctx.fillText("🍽️", 0, 12);
  ctx.restore();
}

function confetti() {
  for (let i = 0; i < 70; i++) {
    const d = document.createElement("div");
    d.className = "confetti";
    d.style.left = 10 + Math.random() * 80 + "vw";
    d.style.background = COLS[i % COLS.length];
    d.style.borderRadius = Math.random() > 0.5 ? "50%" : "2px";
    const fall = 2200 + Math.random() * 1800;
    d.animate(
      [
        { transform: "translateY(0) rotate(0deg)", opacity: 1 },
        { transform: `translateY(105vh) rotate(${Math.random() * 360 + 540}deg)`, opacity: 0.9 },
      ],
      { duration: fall, easing: "cubic-bezier(.2,.6,.4,1)" }
    );
    document.body.appendChild(d);
    setTimeout(() => d.remove(), fall);
  }
}

export default function Ep5Roulette() {
  const cvRef = useRef<HTMLCanvasElement>(null);
  const angleRef = useRef(0);
  const spinning = useRef(false);
  const [result, setResult] = useState("");
  const [sub, setSub] = useState("오늘 점심, 운명에 맡겨보세요.");

  useEffect(() => {
    const ctx = cvRef.current?.getContext("2d");
    if (ctx) draw(ctx, 0);
  }, []);

  const spin = () => {
    const ctx = cvRef.current?.getContext("2d");
    if (!ctx || spinning.current) return;
    spinning.current = true;
    setResult("");
    setSub("돌아가는 중…");
    const target = Math.random() * 2 * Math.PI + 2 * Math.PI * (5 + Math.floor(Math.random() * 3));
    const dur = 4200, t0 = performance.now(), a0 = angleRef.current;
    const ease = (t: number) => 1 - Math.pow(1 - t, 4);
    const frame = (now: number) => {
      const t = Math.min((now - t0) / dur, 1);
      angleRef.current = a0 + target * ease(t);
      draw(ctx, angleRef.current);
      if (t < 1) requestAnimationFrame(frame);
      else {
        spinning.current = false;
        const norm = ((-Math.PI / 2 - angleRef.current) % (2 * Math.PI) + 2 * Math.PI) % (2 * Math.PI);
        const win = Math.floor(norm / SEG);
        setResult(`${EMO[win]} ${MENUS[win]}!`);
        setSub("오늘 점심은 이걸로 결정됐습니다. 이의 제기는 룰렛에게.");
        confetti();
      }
    };
    requestAnimationFrame(frame);
  };

  return (
    <div>
      <div className="flex gap-10 items-center flex-wrap justify-center">
        <div className="relative w-[320px] h-[320px] flex-none">
          <div className="absolute -top-1.5 left-1/2 -translate-x-1/2 z-[5] w-0 h-0
            border-l-[13px] border-l-transparent border-r-[13px] border-r-transparent border-t-[22px] border-t-ink" />
          <canvas ref={cvRef} width={640} height={640}
            className="w-[320px] h-[320px] rounded-full shadow-[3px_5px_30px_0_rgba(0,0,0,0.22)]" />
        </div>
        <div className="flex-1 min-w-[260px]">
          <Pill onClick={spin}>돌리기</Pill>
          <div className="text-[34px] font-semibold tracking-[-0.5px] min-h-[50px] my-3.5 mb-1">{result}</div>
          <div className="text-[14px] text-ink-48 min-h-[22px]">{sub}</div>
        </div>
      </div>
      <div className="font-mono bg-[#1c1c1e] text-[#e6edf3] rounded-[11px] px-[22px] py-[18px] text-[13.5px] leading-[1.65] mt-6">
        <span className="block text-[#7ee787] text-[11px] tracking-[1px] mb-2">PROMPT — 한 줄도 코드를 쓰지 않았습니다</span>
        우리 팀 점심 메뉴를 정해주는 룰렛 웹페이지를 만들어줘. 메뉴는 김치찌개, 돈까스, 초밥, 샐러드, 쌀국수, 햄버거.
        돌리기 버튼을 누르면 룰렛이 돌아가다가 하나를 골라줘. 디자인은 알록달록하고 귀엽게.
      </div>
    </div>
  );
}
