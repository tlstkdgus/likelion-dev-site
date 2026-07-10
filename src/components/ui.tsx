import { useEffect, useRef, type ReactNode } from "react";
import Icon, { type IconName } from "./Icon";

/** 스크롤 진입 시 부드럽게 나타나는 래퍼 */
export function Reveal({ children, className = "" }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (es) => es.forEach((e) => { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } }),
      { threshold: 0.1 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return <div ref={ref} className={`reveal ${className}`}>{children}</div>;
}

export function Pill({
  children, onClick, ghost = false, sm = false, disabled = false, href, dark = false,
}: {
  children: ReactNode; onClick?: () => void; ghost?: boolean; sm?: boolean;
  disabled?: boolean; href?: string; dark?: boolean;
}) {
  const cls = [
    "inline-flex items-center gap-2 rounded-full font-normal tracking-[-0.374px] transition-transform active:scale-95 cursor-pointer",
    sm ? "text-[14px] px-4 py-2" : "text-[16px] px-[22px] py-[11px]",
    ghost
      ? dark ? "bg-transparent text-skylink border border-skylink" : "bg-transparent text-primary border border-primary"
      : "bg-primary text-white border-none",
    disabled ? "opacity-35 cursor-default" : "",
  ].join(" ");
  if (href) return <a className={cls} href={href}>{children}</a>;
  return <button className={cls} onClick={onClick} disabled={disabled}>{children}</button>;
}

export function Tile({ id, tone, children }: { id?: string; tone: "white" | "parchment" | "dark" | "dark3"; children: ReactNode }) {
  const bg = { white: "bg-white", parchment: "bg-parchment", dark: "bg-tile1 text-white", dark3: "bg-tile3 text-white" }[tone];
  return <section id={id} className={`${bg} px-6 py-[80px] max-md:py-12 max-md:px-[18px]`}>{children}</section>;
}

/** 번호 붙은 본문 섹션 헤더 — 강의 자료 문법 */
export function LessonSection({ no, title, desc, dark = false, children }: {
  no: string; title: string; desc?: string; dark?: boolean; children?: ReactNode;
}) {
  return (
    <div className="mt-20 first:mt-0">
      <div className={`flex items-baseline gap-4 pb-4 border-b ${dark ? "border-[#3a3a3c]" : "border-hairline"}`}>
        <span className={`text-[13px] font-semibold tabular-nums tracking-[0.5px] ${dark ? "text-skylink" : "text-primary"}`}>{no}</span>
        <h3 className="text-[26px] max-md:text-[21px] font-semibold tracking-[-0.4px]">{title}</h3>
      </div>
      {desc && <p className={`text-[15px] mt-4 max-w-[720px] leading-[1.6] ${dark ? "text-[#b0b0b5]" : "text-ink-48"}`}>{desc}</p>}
      {children}
    </div>
  );
}

/** 실습 패널 */
export function DemoPanel({ title, sub, children, dark = false }: {
  title: string; sub: string; children: ReactNode; dark?: boolean;
}) {
  return (
    <Reveal>
      <div className={`mt-8 rounded-lg2 border overflow-hidden ${dark ? "border-[#3a3a3c]" : "border-hairline"}`}>
        <div className={`flex items-center gap-3 px-7 py-4 border-b ${dark ? "bg-tile2 border-[#3a3a3c]" : "bg-white border-hairline"}`}>
          <span className={`inline-flex items-center gap-1.5 text-[12px] font-semibold rounded-full px-3 py-1 ${
            dark ? "bg-[#1c2836] text-skylink" : "bg-[#eaf3ff] text-primary"}`}>
            <Icon name="play" size={11} strokeWidth={2.4} /> 실습
          </span>
          <h4 className="text-[17px] font-semibold tracking-[-0.3px]">{title}</h4>
        </div>
        <div className={`px-7 py-7 max-md:px-4 ${dark ? "bg-tile3" : "bg-pearl"}`}>
          <p className={`text-[14px] tracking-[-0.224px] mb-6 ${dark ? "text-[#b0b0b5]" : "text-ink-48"}`}>{sub}</p>
          {children}
        </div>
      </div>
    </Reveal>
  );
}

/** 아이콘 + 제목 + 설명 리스트 행 (카드 대신 사용) */
export function DefRow({ icon, term, mean, desc, dark = false }: {
  icon: IconName; term: string; mean: string; desc?: string; dark?: boolean;
}) {
  return (
    <div className={`flex items-start gap-5 py-5 border-b last:border-b-0 ${dark ? "border-[#333336]" : "border-[#ececee]"}`}>
      <span className={`flex-none mt-0.5 ${dark ? "text-skylink" : "text-primary"}`}><Icon name={icon} size={22} /></span>
      <div className="min-w-0">
        <div className="flex items-baseline gap-3 flex-wrap">
          <span className="text-[16px] font-semibold tracking-[-0.3px]">{term}</span>
          <span className={`text-[15px] font-medium ${dark ? "text-skylink" : "text-primary"}`}>{mean}</span>
        </div>
        {desc && <p className={`text-[14px] mt-1 leading-[1.55] ${dark ? "text-[#b0b0b5]" : "text-ink-48"}`}>{desc}</p>}
      </div>
    </div>
  );
}

/** 인용/포인트 박스 */
export function Note({ label = "핵심", children, dark = false, warn = false }: {
  label?: string; children: ReactNode; dark?: boolean; warn?: boolean;
}) {
  return (
    <div className={`mt-8 rounded-[14px] border px-6 py-5 text-[15.5px] leading-[1.65] ${
      warn ? "border-[#e8b3ab] bg-[#fdf6f5]"
      : dark ? "border-[#3a3a3c] bg-tile2" : "border-hairline bg-white"}`}>
      <span className={`font-semibold mr-2 ${warn ? "text-[#b3402f]" : dark ? "text-skylink" : "text-primary"}`}>{label}</span>
      {children}
    </div>
  );
}
