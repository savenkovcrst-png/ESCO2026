import React, { useMemo, useState } from "react";
import { TREES } from "./trees";
import { DecisionTreeRunner } from "./ui/DecisionTreeRunner";
import { MermaidView } from "./ui/MermaidView";
import { treeToMermaid } from "./decision/toMermaid";

export default function App() {
  const [treeId, setTreeId] = useState<string>(TREES[0]?.id ?? "");
  const [showMermaid, setShowMermaid] = useState<boolean>(false);

  const tree = useMemo(() => TREES.find((t) => t.id === treeId) ?? TREES[0], [treeId]);

  const mermaid = useMemo(() => (tree ? treeToMermaid(tree) : ""), [tree]);

  return (
    <div className="container">
      <div className="header">
        <div>
          <h1 style={{ margin: 0 }}>Помощник мастера</h1>
          <p className="muted" style={{ marginBottom: 0 }}>
            Деревья решений по главам: классификация аварий, ликвидация, профилактика, ловильный инструмент, поглощения.
          </p>
        </div>

        <div className="row">
          <select
            value={treeId}
            onChange={(e) => setTreeId(e.target.value)}
            style={{ padding: 10, borderRadius: 12, border: "1px solid #cbd5e1" }}
          >
            {TREES.map((t) => (
              <option key={t.id} value={t.id}>
                {t.title}
              </option>
            ))}
          </select>

          <button className="secondary" onClick={() => setShowMermaid((s) => !s)}>
            {showMermaid ? "Скрыть Mermaid" : "Показать Mermaid"}
          </button>
        </div>
      </div>

      <div style={{ height: 14 }} />

      {tree ? <DecisionTreeRunner tree={tree} /> : null}

      <div style={{ height: 14 }} />

      {showMermaid && <MermaidView code={mermaid} />}

      <div style={{ height: 18 }} />
      <div className="muted">
        <b>Как расширять:</b> добавляйте узлы/ветки в файлы <code>src/trees/*.ts</code> (вплоть до детальных подслучаев 2.1–2.6, 4.2–4.18, 5.4–5.12).
      </div>
    </div>
  );
}
