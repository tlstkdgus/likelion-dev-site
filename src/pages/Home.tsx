import { Link } from "react-router-dom";
import { EPISODES } from "../App";
import Icon from "../components/Icon";
import { Pill, Reveal } from "../components/ui";

const OUTCOMES = [
  "개발자 회의에서 오가는 용어의 90%를 이해한다",
  "장애 증상만 듣고 어느 영역 문제인지 추정한다",
  "핑퐁 없이 한 번에 처리되는 요청을 쓴다",
  "Git·PR·머지 등 협업 프로세스를 이해한다",
  "AI 도구로 동작하는 프로토타입을 직접 만든다",
  "에이전트·MCP 등 최신 AI 흐름을 따라간다",
];

const FIT = [
  "개발팀과 협업하는 기획 · 운영 · 마케팅 · 디자인 직군",
  "\"간단한 거 맞죠?\"라고 물었다가 서로 곤란해진 적이 있는 분",
  "AI 도구를 업무에 어떻게 붙일지 감을 잡고 싶은 분",
];
const UNFIT = [
  "코딩 문법(변수, 함수 작성법)을 배우려는 분 — 이 과정은 코드를 가르치지 않습니다",
  "현직 개발자 — 이미 다 아는 내용입니다",
];

const FAQ = [
  ["개발을 정말 하나도 몰라도 되나요?", "네. 이 과정은 코드를 한 줄도 쓰지 않습니다. 모든 개념을 식당 운영에 비유해 설명하고, 실습도 클릭만으로 진행됩니다."],
  ["실습은 어떻게 진행되나요?", "각 강의 페이지에 브라우저에서 바로 동작하는 실습이 내장되어 있습니다. 별도 설치나 계정이 필요 없습니다."],
  ["순서대로 들어야 하나요?", "1~4강은 개념이 이어지므로 순서를 권장합니다. 5·6강(AI)은 독립적이라 먼저 들어도 무방합니다."],
  ["수료 기준이 있나요?", "6강까지 수강 후 2강의 용어 퀴즈 4문제 이상 정답이면 수료로 인정합니다. 만점자에게는 커피 쿠폰을 드립니다."],
];

export default function Home() {
  return (
    <main>
      {/* 히어로 */}
      <header className="bg-white border-b border-hairline px-6 pt-[120px] pb-16">
        <div className="max-w-[1120px] mx-auto grid grid-cols-[1fr_360px] max-lg:grid-cols-1 gap-14 items-start">
          <div>
            <p className="text-[13px] font-semibold text-primary tracking-[0.4px]">사내 교육 프로그램 · 비개발 직군 대상</p>
            <h1 className="text-[54px] max-md:text-[34px] font-semibold leading-[1.1] tracking-[-1px] mt-4">
              개발 아는 척<br />완전정복
            </h1>
            <p className="text-[19px] max-md:text-[17px] leading-[1.55] tracking-[-0.2px] text-ink-80 mt-6 max-w-[560px]">
              개발 지식이 전혀 없어도 괜찮습니다. 점심시간 여섯 번이면
              개발자들의 대화가 들리고, 요청이 달라지고, AI로 직접 만들기 시작합니다.
            </p>
            <div className="flex items-center gap-6 mt-7 text-[14px] text-ink-48 flex-wrap">
              <span className="inline-flex items-center gap-1.5"><Icon name="book" size={16} /> 총 6강</span>
              <span className="inline-flex items-center gap-1.5"><Icon name="clock" size={16} /> 회당 30–40분</span>
              <span className="inline-flex items-center gap-1.5"><Icon name="chart" size={16} /> 난이도 입문</span>
              <span className="inline-flex items-center gap-1.5"><Icon name="play" size={15} /> 실습 6개 내장</span>
            </div>
            <div className="mt-9 flex gap-3.5 flex-wrap">
              <Pill href="#/lesson/1">1강 시작하기 <Icon name="arrow" size={15} /></Pill>
              <Pill href="#curriculum" ghost>커리큘럼 보기</Pill>
            </div>
          </div>

          {/* 코스 요약 카드 */}
          <aside className="border border-hairline rounded-lg2 p-7 max-lg:max-w-[420px]">
            <p className="text-[14px] font-semibold">이 과정에 포함된 것</p>
            <ul className="mt-4 space-y-3">
              {[
                ["play", "브라우저에서 바로 하는 라이브 실습 6개"],
                ["message", "회의에서 바로 쓰는 용어 해설 30여 개"],
                ["award", "용어 검증 퀴즈와 수료 기준"],
                ["file", "강의별 핵심 문장 카드 6장"],
              ].map(([ic, t]) => (
                <li key={t} className="flex items-start gap-3 text-[14px] text-ink-80 leading-[1.5]">
                  <span className="text-primary flex-none mt-0.5"><Icon name={ic as never} size={16} /></span>{t}
                </li>
              ))}
            </ul>
            <div className="border-t border-hairline mt-6 pt-5">
              <p className="text-[13px] text-ink-48 leading-[1.6]">준비물 없음 · 설치 없음 · 코드 없음<br />궁금한 점은 교육운영팀으로 문의해 주세요.</p>
            </div>
          </aside>
        </div>
      </header>

      {/* 학습 성과 */}
      <section className="bg-parchment px-6 py-16">
        <div className="max-w-[1120px] mx-auto">
          <h2 className="text-[30px] max-md:text-[24px] font-semibold tracking-[-0.5px]">이 과정을 마치면</h2>
          <Reveal>
            <div className="grid grid-cols-2 max-md:grid-cols-1 gap-x-12 gap-y-4 mt-8">
              {OUTCOMES.map((t) => (
                <div key={t} className="flex items-start gap-3 text-[15.5px] text-ink-80 leading-[1.5]">
                  <span className="text-primary flex-none mt-0.5"><Icon name="check" size={17} strokeWidth={2.4} /></span>{t}
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* 커리큘럼 */}
      <section id="curriculum" className="bg-white px-6 py-16">
        <div className="max-w-[1120px] mx-auto">
          <h2 className="text-[30px] max-md:text-[24px] font-semibold tracking-[-0.5px]">커리큘럼</h2>
          <p className="text-[15px] text-ink-48 mt-2">총 6강 · 각 강의에 라이브 실습이 포함되어 있습니다.</p>
          <Reveal>
            <div className="mt-8 border border-hairline rounded-lg2 overflow-hidden">
              {EPISODES.map((e, i) => (
                <Link key={e.path} to={e.path}
                  className={`group grid grid-cols-[64px_1fr_auto] max-md:grid-cols-[48px_1fr] items-center gap-5 px-7 max-md:px-4 py-6 no-underline text-ink hover:bg-pearl transition-colors ${
                    i > 0 ? "border-t border-hairline" : ""}`}>
                  <span className="text-[22px] font-semibold text-[#c7c7cc] tabular-nums tracking-[-0.5px] group-hover:text-primary transition-colors">
                    {String(e.no).padStart(2, "0")}
                  </span>
                  <span>
                    <span className="block text-[18px] max-md:text-[16px] font-semibold tracking-[-0.3px]">{e.title}</span>
                    <span className="block text-[13.5px] text-ink-48 mt-1 leading-[1.5]">{e.desc}</span>
                  </span>
                  <span className="max-md:hidden flex items-center gap-5 text-[13px] text-ink-48">
                    <span className="inline-flex items-center gap-1.5"><Icon name="clock" size={14} /> {e.minutes}분</span>
                    <span className="inline-flex items-center gap-1.5 text-primary"><Icon name="play" size={13} /> 실습</span>
                    <Icon name="arrow" size={16} className="text-[#c7c7cc] group-hover:text-primary transition-colors" />
                  </span>
                </Link>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* 추천 대상 */}
      <section className="bg-parchment px-6 py-16">
        <div className="max-w-[1120px] mx-auto">
          <h2 className="text-[30px] max-md:text-[24px] font-semibold tracking-[-0.5px]">이런 분들을 위해 만들었습니다</h2>
          <Reveal>
            <div className="grid grid-cols-2 max-md:grid-cols-1 gap-6 mt-8">
              <div className="bg-white border border-hairline rounded-lg2 p-7">
                <p className="text-[14px] font-semibold text-primary mb-4">추천해요</p>
                <ul className="space-y-3">
                  {FIT.map((t) => (
                    <li key={t} className="flex items-start gap-3 text-[14.5px] text-ink-80 leading-[1.55]">
                      <span className="text-primary flex-none mt-0.5"><Icon name="check" size={16} strokeWidth={2.4} /></span>{t}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-white border border-hairline rounded-lg2 p-7">
                <p className="text-[14px] font-semibold text-ink-48 mb-4">이 과정과는 맞지 않아요</p>
                <ul className="space-y-3">
                  {UNFIT.map((t) => (
                    <li key={t} className="flex items-start gap-3 text-[14.5px] text-ink-48 leading-[1.55]">
                      <span className="flex-none mt-0.5"><Icon name="close" size={16} /></span>{t}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-white px-6 py-16">
        <div className="max-w-[880px] mx-auto">
          <h2 className="text-[30px] max-md:text-[24px] font-semibold tracking-[-0.5px]">자주 묻는 질문</h2>
          <Reveal>
            <div className="mt-6 border-t border-hairline">
              {FAQ.map(([q, a]) => (
                <details key={q} className="group border-b border-hairline">
                  <summary className="flex items-center justify-between gap-4 py-5 cursor-pointer list-none text-[16px] font-medium tracking-[-0.2px]">
                    {q}
                    <span className="text-ink-48 transition-transform group-open:rotate-180"><Icon name="chevron" size={18} /></span>
                  </summary>
                  <p className="text-[14.5px] text-ink-48 leading-[1.65] pb-6 max-w-[720px]">{a}</p>
                </details>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* 마지막 CTA */}
      <section className="bg-tile3 text-white px-6 py-20">
        <div className="max-w-[880px] mx-auto text-center">
          <h2 className="text-[34px] max-md:text-[26px] font-semibold tracking-[-0.5px]">
            다음 회의부터 대화가 들리기 시작합니다
          </h2>
          <p className="text-[16px] text-[#b0b0b5] mt-4">첫 강의는 35분이면 충분합니다.</p>
          <div className="mt-8">
            <Pill href="#/lesson/1">1강 · 소프트웨어는 어떻게 만들어지는가 <Icon name="arrow" size={15} /></Pill>
          </div>
        </div>
      </section>
    </main>
  );
}
