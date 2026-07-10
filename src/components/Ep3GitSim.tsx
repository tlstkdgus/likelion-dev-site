import { useState } from "react";
import { Pill } from "./ui";

type LogLine = { cls: "ok" | "info" | "warn"; text: string };
const COLOR = { ok: "#7ee787", info: "#79c0ff", warn: "#ffa657" };

export default function Ep3GitSim() {
  const [step, setStep] = useState(0); // 0 초기, 1 브랜치, 2 커밋1, 3 커밋2, 4 PR, 5 머지
  const [log, setLog] = useState<LogLine[]>([
    { cls: "info", text: "$ 원본(main)은 소중하니까, 복사본에서 작업합니다. ① 버튼부터 눌러보세요." },
  ]);

  const acts: { label: string; enabledAt: number[]; run: () => void }[] = [
    { label: "① 브랜치 따기", enabledAt: [0], run: () => { setStep(1); setLog([
      { cls: "ok", text: "$ git checkout -b feature/급여-정렬" },
      { cls: "info", text: "복사본(브랜치) 생성. 원본 main은 안전합니다. 이제 마음껏 실험하세요." }]); } },
    { label: "② 커밋하기", enabledAt: [1, 2], run: () => {
      if (step === 1) { setStep(2); setLog([
        { cls: "ok", text: "$ git commit -m \"정렬 버튼 추가 — 클릭 시 급여 기준 내림차순\"" },
        { cls: "info", text: "저장 + 메모 완료. 성의 있는 메시지가 미래의 나를 구합니다. ('수정2'는 개발계의 진짜최종.pptx)" }]); }
      else { setStep(3); setLog([
        { cls: "ok", text: "$ git commit -m \"모바일 화면 대응\"" },
        { cls: "info", text: "커밋 2개 적립. 역사가 차곡차곡 기록됩니다." }]); } } },
    { label: "③ PR 올리기", enabledAt: [3], run: () => { setStep(4); setLog([
      { cls: "ok", text: "$ PR #128 열림 — \"검토하고 합쳐주세요\"" },
      { cls: "warn", text: "동료들이 줄 단위로 리뷰 중… \"이 변수명 더 명확하게 어때요?\" (가끔 정중하게 싸움)" }]); } },
    { label: "④ 머지하기", enabledAt: [4], run: () => { setStep(5); setLog([
      { cls: "ok", text: "$ git merge — 리뷰 통과! main에 합쳐졌습니다 ✓" },
      { cls: "info", text: "이제야 진짜 '완료'. 다음 배포 때 실제 서비스로 나갑니다." }]); } },
  ];

  const reset = () => { setStep(0); setLog([{ cls: "info", text: "$ 리셋 완료. ① 버튼부터 다시 체험해보세요." }]); };
  const op = (visibleFrom: number) => ({ opacity: step >= visibleFrom ? 1 : 0, transition: "opacity .5s" });

  return (
    <div>
      <div className="rounded-lg2 border border-[#3a3a3c] bg-[#1c1c1e] p-2.5 mt-5">
        <svg viewBox="0 0 900 240" width="100%" height="240">
          <line x1="40" y1="70" x2="860" y2="70" stroke="#8e8e93" strokeWidth="4" strokeLinecap="round" />
          <text x="40" y="45" fill="#aeaeb2" fontSize="15" fontWeight="600" fontFamily="ui-monospace,monospace">main</text>
          <circle cx="80" cy="70" r="9" fill="#d1d1d6" />
          <circle cx="160" cy="70" r="9" fill="#d1d1d6" />
          <g style={op(1)}>
            <line x1="240" y1="70" x2="330" y2="160" stroke="#0a84ff" strokeWidth="4" strokeLinecap="round" />
            <line x1="330" y1="160" x2="360" y2="160" stroke="#0a84ff" strokeWidth="4" strokeLinecap="round" />
            <circle cx="240" cy="70" r="9" fill="#d1d1d6" />
            <text x="330" y="200" fill="#0a84ff" fontSize="14" fontWeight="600" fontFamily="ui-monospace,monospace">feature/급여-정렬</text>
          </g>
          <g style={op(2)}><circle cx="400" cy="160" r="10" fill="#0a84ff" /><text x="378" y="133" fill="#7db8ff" fontSize="12">커밋 1</text></g>
          <g style={op(3)}><circle cx="490" cy="160" r="10" fill="#0a84ff" /><text x="468" y="133" fill="#7db8ff" fontSize="12">커밋 2</text></g>
          <g style={op(4)}>
            <rect x="545" y="140" rx="14" ry="14" width="112" height="40" fill="none" stroke="#bf5af2" strokeWidth="2.5" />
            <text x="601" y="166" fill="#bf5af2" fontSize="15" fontWeight="600" textAnchor="middle">PR #128</text>
          </g>
          <g style={op(5)}>
            <line x1="680" y1="160" x2="790" y2="70" stroke="#30d158" strokeWidth="4" strokeLinecap="round" />
            <circle cx="790" cy="70" r="11" fill="#30d158" />
            <text x="742" y="40" fill="#30d158" fontSize="14" fontWeight="600">머지 완료 ✓</text>
          </g>
        </svg>
      </div>
      <div className="flex gap-2.5 flex-wrap mt-[18px]">
        {acts.map((a) => (
          <Pill key={a.label} sm disabled={!a.enabledAt.includes(step)} onClick={a.run}>{a.label}</Pill>
        ))}
        <Pill sm ghost dark onClick={reset}>리셋</Pill>
      </div>
      <div className="font-mono text-[12.5px] bg-[#1c1c1e] text-[#e6edf3] rounded-[11px] px-[18px] py-3.5 mt-[18px] min-h-[60px] leading-[1.7]">
        {log.map((l, i) => <div key={i} style={{ color: COLOR[l.cls] }}>{l.text}</div>)}
      </div>
    </div>
  );
}
