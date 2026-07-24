import { useState } from "react";
import Icon, { type IconName } from "./Icon";
import { Pill } from "./ui";

type Stage = { t: string; sub: string; icon: IconName; who: string; data: string; risk: string; desc: string };

const STAGES: Stage[] = [
  {
    t: "로컬", sub: "개발자 본인 컴퓨터", icon: "monitor",
    who: "개발자 본인만", data: "가짜 샘플 데이터", risk: "사고가 나도 아무 영향 없음",
    desc: "코드를 쓰고 즉시 확인하는 작업대입니다. \"로컬에서는 되는데요\"라는 말이 나오는 이유가 여기 있습니다 — 이 환경은 실제 서비스와 설정도, 데이터 양도 다릅니다.",
  },
  {
    t: "스테이징", sub: "리허설 무대", icon: "layers",
    who: "기획 · 운영 · QA — 여러분이 확인하는 단계", data: "실제와 비슷하게 맞춘 복제 데이터", risk: "고객에게 노출되지 않음 — 여기서 잡으면 안전",
    desc: "실제 운영 환경과 최대한 똑같이 맞춰 둔 리허설 매장입니다. 고객은 접속할 수 없습니다. \"스테이징에서 확인해 주세요\"는 곧 여러분이 직접 눌러볼 차례라는 뜻입니다.",
  },
  {
    t: "운영 (프로덕션)", sub: "진짜 매장", icon: "users",
    who: "실제 고객 전원", data: "진짜 고객 데이터", risk: "문제가 생기면 즉시 장애 — 롤백 또는 핫픽스",
    desc: "고객이 실제로 사용하는 곳입니다. 여기서 문제가 나면 바로 영향을 받기 때문에, 앞의 두 단계를 거치는 것입니다.",
  },
];

const START = "코드가 로컬에 있습니다. '다음 단계로 배포' 버튼을 눌러 흐름을 따라가 보세요.";

export default function Ep2Pipeline() {
  const [at, setAt] = useState(0);
  const [log, setLog] = useState<{ t: string; tone: "info" | "ok" | "warn" }>({ t: START, tone: "info" });
  const s = STAGES[at];

  const deploy = () => {
    if (at >= 2) return;
    const next = at + 1;
    setAt(next);
    setLog(next === 1
      ? { t: "배포 완료 — 스테이징에 반영됐습니다. 이제 기획·운영이 실제로 눌러보며 확인할 차례입니다.", tone: "ok" }
      : { t: "배포 완료 — 운영에 반영됐습니다. 지금 이 순간부터 고객이 사용합니다.", tone: "ok" });
  };

  const bug = () => {
    if (at === 0) return;
    if (at === 1) {
      setAt(0);
      setLog({ t: "스테이징에서 버그 발견 — 고객은 아무도 보지 못했습니다. 로컬로 돌아가 수정합니다. 스테이징이 존재하는 이유가 바로 이것입니다.", tone: "warn" });
    } else {
      setAt(0);
      setLog({ t: "운영에서 버그 발견 — 장애 상황입니다. 즉시 롤백(이전 버전으로 되돌리기)한 뒤, 로컬에서 고쳐 처음부터 다시 올립니다.", tone: "warn" });
    }
  };

  const reset = () => { setAt(0); setLog({ t: START, tone: "info" }); };
  const tone = { info: "text-ink-80", ok: "text-[#1a7a38]", warn: "text-[#b3402f]" }[log.tone];

  return (
    <div>
      {/* 단계 흐름 */}
      <div className="flex items-center gap-2 max-md:flex-col max-md:items-stretch">
        {STAGES.map((st, i) => (
          <div key={st.t} className="contents">
            <div className={`flex-1 rounded-[14px] border px-4 py-4 text-center transition-all duration-300 ${
              i === at ? "border-primary bg-[#eaf3ff] -translate-y-1" : "border-hairline bg-white"}`}>
              <span className={`inline-block ${i === at ? "text-primary" : "text-ink-48"}`}><Icon name={st.icon} size={22} /></span>
              <p className="text-[14px] font-semibold mt-1.5 tracking-[-0.25px]">{st.t}</p>
              <p className="text-[11px] text-ink-48 mt-0.5">{st.sub}</p>
              {i === at && (
                <span className="inline-flex items-center gap-1 mt-2 text-[10.5px] font-semibold text-white bg-primary rounded-full px-2 py-0.5">
                  <Icon name="file" size={10} /> 지금 코드 위치
                </span>
              )}
            </div>
            {i < 2 && <div className={`flex-none max-md:rotate-90 ${at > i ? "text-primary" : "text-hairline"}`}><Icon name="arrow" size={18} /></div>}
          </div>
        ))}
      </div>

      {/* 현재 단계 상세 */}
      <div className="mt-5 rounded-[14px] border border-hairline bg-white overflow-hidden">
        <div className="px-5 py-3 bg-[#f5f5f7] border-b border-hairline">
          <p className="text-[14px] font-semibold">지금 단계 · {s.t}</p>
        </div>
        <div className="px-5 py-4">
          <p className="text-[13.5px] text-ink-80 leading-[1.6]">{s.desc}</p>
          <div className="grid grid-cols-3 max-md:grid-cols-1 gap-3 mt-4">
            {([["누가 보는가", s.who, "users"], ["데이터", s.data, "database"], ["사고 시 영향", s.risk, "alert"]] as [string, string, IconName][]).map(([k, v, ic]) => (
              <div key={k} className="rounded-[11px] border border-hairline px-3.5 py-3">
                <p className="text-[11.5px] font-semibold text-ink-48 flex items-center gap-1.5"><Icon name={ic} size={12} /> {k}</p>
                <p className="text-[12.5px] text-ink-80 mt-1 leading-[1.45]">{v}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 조작 + 로그 */}
      <div className="flex gap-2.5 flex-wrap mt-5">
        <Pill sm onClick={deploy} disabled={at >= 2}>다음 단계로 배포</Pill>
        <Pill sm ghost onClick={bug} disabled={at === 0}>여기서 버그 발견</Pill>
        <Pill sm ghost onClick={reset}>리셋</Pill>
      </div>
      <div className={`text-[13.5px] leading-[1.6] bg-white border border-hairline rounded-[11px] px-[18px] py-3.5 mt-4 min-h-[52px] ${tone}`}>
        {log.t}
      </div>
    </div>
  );
}
