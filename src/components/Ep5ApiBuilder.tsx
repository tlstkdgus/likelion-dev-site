import { useState } from "react";
import Icon from "./Icon";

type Key = "list" | "create" | "update" | "delete";

const ACTIONS: {
  key: Key; label: string; method: string; path: string; color: string; bg: string;
  analogy: string; body: boolean; ok: string; okDesc: string; fail: string; failDesc: string;
}[] = [
  {
    key: "list", label: "메뉴 목록 보기", method: "GET", path: "/menus", color: "#1a7a38", bg: "#e8f7ee",
    analogy: "\"메뉴판 좀 보여주세요\" — 주방에 있는 것을 그대로 받아옵니다.",
    body: false,
    ok: "200 OK", okDesc: "메뉴 목록을 배열로 돌려줍니다.",
    fail: "500 서버 오류", failDesc: "주방(서버)이 멈춘 경우입니다.",
  },
  {
    key: "create", label: "메뉴 추가하기", method: "POST", path: "/menus", color: "#0066cc", bg: "#eaf3ff",
    analogy: "\"신메뉴 하나 등록해 주세요\" — 새로 만들어 달라고 보냅니다.",
    body: true,
    ok: "201 생성됨", okDesc: "새로 만들어진 메뉴를 번호(id)와 함께 돌려줍니다.",
    fail: "400 잘못된 요청", failDesc: "필수 항목인 이름이 비어 있는 경우입니다.",
  },
  {
    key: "update", label: "메뉴 이름 수정", method: "PUT", path: "/menus/{id}", color: "#c99a10", bg: "#fbf6e3",
    analogy: "\"3번 메뉴 이름 바꿔 주세요\" — 어느 것인지 번호로 지목합니다.",
    body: true,
    ok: "200 OK", okDesc: "수정된 결과를 돌려줍니다.",
    fail: "404 없음", failDesc: "그런 번호의 메뉴가 없는 경우입니다.",
  },
  {
    key: "delete", label: "메뉴 삭제하기", method: "DELETE", path: "/menus/{id}", color: "#b3402f", bg: "#fdeeee",
    analogy: "\"3번 메뉴 빼 주세요\" — 지목해서 없앱니다.",
    body: false,
    ok: "204 처리됨", okDesc: "돌려줄 내용이 없어 본문이 비어 있습니다.",
    fail: "404 없음", failDesc: "이미 없거나 잘못된 번호입니다.",
  },
];

const FIELDS: { k: string; label: string; sample: string; fixed?: boolean }[] = [
  { k: "name", label: "메뉴 이름", sample: '"마라탕"', fixed: true },
  { k: "category", label: "분류", sample: '"중식"' },
  { k: "spicy", label: "맵기 단계", sample: "3" },
  { k: "image", label: "사진 주소", sample: '"https://.../mala.jpg"' },
];

export default function Ep5ApiBuilder() {
  const [key, setKey] = useState<Key>("create");
  const [on, setOn] = useState<string[]>(["name"]);
  const a = ACTIONS.find((x) => x.key === key)!;

  const toggle = (k: string) => setOn((p) => (p.includes(k) ? p.filter((x) => x !== k) : [...p, k]));
  const chosen = FIELDS.filter((f) => on.includes(f.k) || f.fixed);

  const bodyLines = chosen.map((f, i) => `  "${f.k}": ${f.sample}${i < chosen.length - 1 ? "," : ""}`);
  const okLines =
    key === "list"
      ? ['[', '  { "id": 1, "name": "김치찌개" },', '  { "id": 2, "name": "돈까스" }', ']']
      : key === "delete"
      ? ["(본문 없음)"]
      : ["{", '  "id": 7,', ...bodyLines.map((l) => l), "}"];

  return (
    <div>
      {/* 1. 무엇을 하고 싶은가 */}
      <p className="text-[12px] font-semibold text-ink-48 tracking-[0.3px]">1 · 무엇을 하고 싶나요</p>
      <div className="grid grid-cols-4 max-md:grid-cols-2 gap-2.5 mt-2.5">
        {ACTIONS.map((x) => (
          <button key={x.key} onClick={() => setKey(x.key)}
            className={`text-left rounded-[12px] border px-3.5 py-3 transition-all cursor-pointer ${
              key === x.key ? "border-primary bg-[#eaf3ff]" : "border-hairline bg-white hover:border-primary"}`}>
            <span className="text-[10.5px] font-semibold rounded px-1.5 py-0.5" style={{ color: x.color, background: x.bg }}>
              {x.method}
            </span>
            <p className="text-[13px] font-semibold mt-1.5 tracking-[-0.2px]">{x.label}</p>
          </button>
        ))}
      </div>

      {/* 2. 주문서에 담을 정보 */}
      {a.body && (
        <>
          <p className="text-[12px] font-semibold text-ink-48 tracking-[0.3px] mt-6">2 · 주문서에 담을 정보를 고르세요</p>
          <div className="flex flex-wrap gap-2 mt-2.5">
            {FIELDS.map((f) => {
              const active = f.fixed || on.includes(f.k);
              return (
                <button key={f.k} disabled={f.fixed} onClick={() => toggle(f.k)}
                  className={`inline-flex items-center gap-1.5 text-[13px] rounded-full border px-3.5 py-1.5 transition-all ${
                    f.fixed ? "cursor-default" : "cursor-pointer"} ${
                    active ? "border-primary bg-[#eaf3ff] text-primary" : "border-hairline bg-white text-ink-48"}`}>
                  {active && <Icon name="check" size={12} strokeWidth={2.6} />}
                  {f.label}{f.fixed && <span className="text-[10.5px] opacity-70">필수</span>}
                </button>
              );
            })}
          </div>
        </>
      )}

      {/* 3. 완성된 주문서 양식 */}
      <p className="text-[12px] font-semibold text-ink-48 tracking-[0.3px] mt-6">{a.body ? "3" : "2"} · 완성된 주문서 양식 (API 명세)</p>
      <div className="mt-2.5 rounded-[14px] border border-hairline overflow-hidden bg-white">
        <div className="flex items-center gap-2.5 px-5 py-3.5 border-b border-hairline bg-[#f5f5f7] flex-wrap">
          <span className="text-[12px] font-semibold rounded px-2 py-1" style={{ color: a.color, background: a.bg }}>{a.method}</span>
          <span className="font-mono text-[14px] font-semibold">{a.path}</span>
        </div>
        <div className="px-5 py-4">
          <p className="text-[13.5px] text-ink-80 leading-[1.55]">{a.analogy}</p>

          <div className="mt-4">
            <p className="text-[12px] font-semibold text-ink-48 mb-1.5">보내는 것 (요청)</p>
            <pre className="font-mono text-[12.5px] leading-[1.6] bg-[#1c1c1e] text-[#e6edf3] rounded-[10px] px-4 py-3 overflow-x-auto">
{a.body ? ["{", ...bodyLines, "}"].join("\n") : a.path.includes("{id}") ? "주소의 {id} 자리에 번호만 넣습니다. 본문 없음." : "보낼 내용 없음."}
            </pre>
          </div>

          <div className="mt-3.5">
            <p className="text-[12px] font-semibold text-ink-48 mb-1.5">
              받는 것 (응답) · <span style={{ color: "#1a7a38" }}>{a.ok}</span>
            </p>
            <pre className="font-mono text-[12.5px] leading-[1.6] bg-[#1c1c1e] text-[#7ee787] rounded-[10px] px-4 py-3 overflow-x-auto">
{okLines.join("\n")}
            </pre>
            <p className="text-[12.5px] text-ink-48 mt-1.5">{a.okDesc}</p>
          </div>

          <div className="mt-3.5 rounded-[10px] border border-[#e8b3ab] bg-[#fdf6f5] px-4 py-3">
            <p className="text-[12.5px] font-semibold text-[#b3402f]">실패하면 · {a.fail}</p>
            <p className="text-[12.5px] text-ink-80 mt-1 leading-[1.5]">{a.failDesc}</p>
          </div>
        </div>
      </div>

      <p className="text-[13px] text-ink-48 mt-4 leading-[1.6]">
        방금 한 일이 <b className="text-ink-80">API 설계</b>입니다. 코드는 한 줄도 쓰지 않았지만,
        주소·방식·주고받을 내용을 정했습니다. 개발자는 이 양식대로 주방을 만들 뿐입니다.
      </p>
    </div>
  );
}
