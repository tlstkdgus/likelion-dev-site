import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import { EPISODES } from "../App";
import Icon from "./Icon";
import { Reveal } from "./ui";

/** 강의 페이지 공통 레이아웃: 브레드크럼 + 헤더 + 학습 목표 + 본문 + 핵심 문장 + 다음 강의 */
export default function EpLayout({
  index, children, cheat, cheatWhy, demoCount = 1, dark = false,
}: {
  index: number; children: ReactNode; cheat: string; cheatWhy: string;
  demoCount?: number; dark?: boolean;
}) {
  const ep = EPISODES[index];
  const prev = index > 0 ? EPISODES[index - 1] : null;
  const next = index < EPISODES.length - 1 ? EPISODES[index + 1] : null;
  const sub = dark ? "text-[#b0b0b5]" : "text-ink-48";
  const accent = dark ? "text-skylink" : "text-primary";

  return (
    <main className={dark ? "bg-tile1 text-white" : "bg-white"}>
      {/* 헤더 */}
      <header className={`px-6 pt-[104px] pb-12 border-b ${dark ? "bg-tile1 border-[#3a3a3c]" : "bg-white border-hairline"}`}>
        <div className="max-w-[880px] mx-auto">
          <nav className={`text-[13px] ${sub}`}>
            <Link to="/" className={`no-underline ${accent}`}>커리큘럼</Link>
            <span className="mx-2">/</span>
            <span>{ep.no}강</span>
          </nav>
          <h1 className="text-[40px] max-md:text-[28px] font-semibold leading-[1.15] tracking-[-0.6px] mt-5">
            {ep.title}
          </h1>
          <p className={`text-[17px] mt-4 max-w-[680px] leading-[1.6] tracking-[-0.2px] ${sub}`}>{ep.desc}</p>
          <div className={`flex items-center gap-5 mt-6 text-[13.5px] flex-wrap ${sub}`}>
            <span className="inline-flex items-center gap-1.5"><Icon name="book" size={15} /> {ep.no}강 / 총 6강</span>
            <span className="inline-flex items-center gap-1.5"><Icon name="clock" size={15} /> 약 {ep.minutes}분</span>
            <span className="inline-flex items-center gap-1.5"><Icon name="play" size={14} /> 실습 {demoCount}개 포함</span>
          </div>

          {/* 학습 목표 */}
          <div className={`mt-8 rounded-[14px] border px-6 py-5 ${dark ? "border-[#3a3a3c] bg-tile2" : "border-hairline bg-pearl"}`}>
            <p className="text-[13px] font-semibold tracking-[0.3px] mb-3">이 강의를 마치면</p>
            <ul className="space-y-2">
              {ep.goals.map((g) => (
                <li key={g} className={`flex items-start gap-2.5 text-[14.5px] leading-[1.5] ${sub}`}>
                  <span className={`flex-none mt-0.5 ${accent}`}><Icon name="check" size={15} strokeWidth={2.4} /></span>{g}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </header>

      {children}

      {/* 핵심 문장 */}
      <section className={`px-6 py-16 border-t ${dark ? "bg-tile3 border-[#3a3a3c]" : "bg-parchment border-hairline"}`}>
        <div className="max-w-[880px] mx-auto">
          <Reveal>
            <p className={`text-[13px] font-semibold tracking-[0.4px] ${accent}`}>이 강의의 핵심 문장</p>
            <blockquote className="text-[28px] max-md:text-[21px] font-semibold leading-[1.35] tracking-[-0.4px] mt-4">
              {cheat}
            </blockquote>
            <p className={`text-[15px] mt-4 leading-[1.6] ${sub}`}>{cheatWhy}</p>
          </Reveal>
        </div>
      </section>

      {/* 이전/다음 강의 */}
      <nav className={`px-6 py-8 border-t ${dark ? "bg-tile1 border-[#3a3a3c]" : "bg-white border-hairline"}`}>
        <div className="max-w-[880px] mx-auto grid grid-cols-2 max-md:grid-cols-1 gap-4">
          {prev ? (
            <Link to={prev.path} className={`no-underline rounded-[14px] border px-5 py-4 ${dark ? "border-[#3a3a3c]" : "border-hairline"}`}>
              <span className={`text-[12px] ${sub}`}>이전 강의</span>
              <p className={`text-[15px] font-semibold mt-1 ${dark ? "text-white" : "text-ink"}`}>{prev.no}강 · {prev.title}</p>
            </Link>
          ) : (
            <Link to="/" className={`no-underline rounded-[14px] border px-5 py-4 ${dark ? "border-[#3a3a3c]" : "border-hairline"}`}>
              <span className={`text-[12px] ${sub}`}>처음으로</span>
              <p className={`text-[15px] font-semibold mt-1 ${dark ? "text-white" : "text-ink"}`}>코스 소개</p>
            </Link>
          )}
          {next ? (
            <Link to={next.path} className="no-underline rounded-[14px] bg-primary px-5 py-4 text-white">
              <span className="text-[12px] opacity-80">다음 강의</span>
              <p className="text-[15px] font-semibold mt-1">{next.no}강 · {next.title}</p>
            </Link>
          ) : (
            <Link to="/" className="no-underline rounded-[14px] bg-primary px-5 py-4 text-white">
              <span className="text-[12px] opacity-80">전 과정 완료</span>
              <p className="text-[15px] font-semibold mt-1">수료 — 코스 홈으로</p>
            </Link>
          )}
        </div>
      </nav>
    </main>
  );
}
