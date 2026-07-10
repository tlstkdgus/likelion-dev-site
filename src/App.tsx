import { useEffect } from "react";
import { HashRouter, Link, Route, Routes, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import Ep1 from "./pages/Ep1";
import Ep2 from "./pages/Ep2";
import Ep3 from "./pages/Ep3";
import Ep4 from "./pages/Ep4";
import Ep5 from "./pages/Ep5";
import Ep6 from "./pages/Ep6";

export const EPISODES = [
  { path: "/lesson/1", no: 1, short: "소프트웨어 구조", title: "소프트웨어는 어떻게 만들어지는가", minutes: 35,
    desc: "프론트엔드·백엔드·서버·DB·API를 식당 비유 하나로 꿰어, 개발 조직의 대화가 들리기 시작하는 첫 시간",
    goals: ["프론트엔드/백엔드/서버/DB/API의 역할을 비유 없이도 설명할 수 있다", "장애 증상만 듣고 어느 영역 문제인지 1차 추정할 수 있다", "문제를 구조적으로 나눠 질문할 수 있다"] },
  { path: "/lesson/2", no: 2, short: "개발 용어", title: "개발자 단골 용어 사전", minutes: 40,
    desc: "레거시, 롤백, 핫픽스, 스테이징 — 회의에서 오가는 말의 90%를 해석하고, 퀴즈로 검증하는 시간",
    goals: ["프레임워크/라이브러리/오픈소스/레거시를 구분한다", "배포 파이프라인(로컬→스테이징→운영)을 이해한다", "일정 회의 용어(이슈·스펙·MVP·스프린트)를 정확히 쓴다"] },
  { path: "/lesson/3", no: 3, short: "Git과 GitHub", title: "코드는 어디에 사는가", minutes: 35,
    desc: "개발자들이 하루 종일 그 사이트를 보는 이유 — 버전 관리와 협업의 표준 프로세스를 시뮬레이터로 체험",
    goals: ["Git과 GitHub의 차이를 설명할 수 있다", "브랜치→커밋→PR→머지 흐름을 이해한다", "'머지됐어요'가 진짜 완료 신호임을 안다"] },
  { path: "/lesson/4", no: 4, short: "협업 커뮤니케이션", title: "개발자와 대화하는 법", minutes: 40,
    desc: "요청이 빨리 처리되게 만드는 실전 기술 — 좋은 요청의 3요소와 일정의 숨은 구조",
    goals: ["현상·재현 방법·기대 동작으로 요청을 구조화한다", "'개발 이틀'과 '배포까지 이틀'을 구분해 묻는다", "범위 협상과 비동기 소통을 활용한다"] },
  { path: "/lesson/5", no: 5, short: "AI와 바이브 코딩", title: "AI 시대의 개발", minutes: 35,
    desc: "LLM의 동작 원리부터, 코딩 없이 동작하는 결과물을 만드는 과정까지 — 직접 만든 룰렛으로 확인",
    goals: ["LLM·프롬프트·토큰·할루시네이션을 이해한다", "바이브 코딩으로 프로토타입을 만들 수 있다", "AI 시대에도 개발자가 필요한 이유를 설명한다"] },
  { path: "/lesson/6", no: 6, short: "AI 트렌드", title: "요즘 AI 판에서는 무슨 일이", minutes: 40,
    desc: "에이전트, 하네스, 컨텍스트 엔지니어링, MCP — 트렌드 키워드 5개와 직군별 실무 도구 (최종회)",
    goals: ["챗봇과 에이전트의 차이를 시연으로 이해한다", "하네스/컨텍스트/MCP 개념을 업무 언어로 옮긴다", "내 직군에 맞는 AI 도구를 바로 적용한다"] },
] as const;

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => window.scrollTo(0, 0), [pathname]);
  return null;
}

function GNav() {
  const { pathname } = useLocation();
  return (
    <nav className="fixed top-0 inset-x-0 h-12 z-[100] bg-black/85 backdrop-blur-xl backdrop-saturate-150 border-b border-white/10">
      <div className="max-w-[1120px] mx-auto h-full px-6 flex items-center justify-between gap-6">
        <Link to="/" className="text-[14px] font-semibold text-white no-underline whitespace-nowrap tracking-[-0.2px]">
          개발 아는 척 완전정복
        </Link>
        <div className="flex items-center gap-5 max-md:gap-3.5 max-md:overflow-x-auto">
          {EPISODES.map((e) => (
            <Link key={e.path} to={e.path}
              className={`text-[12.5px] tracking-[-0.12px] no-underline whitespace-nowrap transition-opacity ${
                pathname === e.path ? "text-white font-semibold" : "text-[#d5d5da] opacity-80 hover:opacity-100"}`}>
              {e.no}강<span className="max-md:hidden"> · {e.short}</span>
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}

function Footer() {
  return (
    <footer className="bg-parchment border-t border-hairline px-6 py-12">
      <div className="max-w-[1120px] mx-auto grid grid-cols-3 max-md:grid-cols-1 gap-8">
        <div>
          <p className="text-[14px] font-semibold">개발 아는 척 완전정복</p>
          <p className="text-[13px] text-ink-48 mt-2 leading-[1.7]">비개발 직군을 위한 점심시간 사내 교육<br />총 6강 · 회당 30–40분 · 입문</p>
        </div>
        <div>
          <p className="text-[13px] font-semibold text-ink-80">커리큘럼</p>
          <div className="mt-2 space-y-1">
            {EPISODES.slice(0, 3).map((e) => (
              <p key={e.path} className="text-[13px] text-ink-48">{e.no}강 {e.title}</p>
            ))}
            {EPISODES.slice(3).map((e) => (
              <p key={e.path} className="text-[13px] text-ink-48">{e.no}강 {e.title}</p>
            ))}
          </div>
        </div>
        <div>
          <p className="text-[13px] font-semibold text-ink-80">안내</p>
          <p className="text-[13px] text-ink-48 mt-2 leading-[1.7]">수강 문의: 교육운영팀<br />실습 자료는 각 강의 페이지에 포함되어 있습니다.</p>
        </div>
      </div>
      <p className="max-w-[1120px] mx-auto text-[11.5px] text-ink-48 mt-10 pt-5 border-t border-hairline">
        Copyright 2026. LIKELION all rights reserved.
      </p>
    </footer>
  );
}

export default function App() {
  return (
    <HashRouter>
      <ScrollToTop />
      <GNav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/lesson/1" element={<Ep1 />} />
        <Route path="/lesson/2" element={<Ep2 />} />
        <Route path="/lesson/3" element={<Ep3 />} />
        <Route path="/lesson/4" element={<Ep4 />} />
        <Route path="/lesson/5" element={<Ep5 />} />
        <Route path="/lesson/6" element={<Ep6 />} />
        <Route path="*" element={<Home />} />
      </Routes>
      <Footer />
    </HashRouter>
  );
}
