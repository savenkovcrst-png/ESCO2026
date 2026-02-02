// src/ui/DecisionTreeRunner.tsx
import React, { useMemo, useState } from "react";
import type { DecisionTree, DecisionNode } from "../decision/decisionTree";
import { getNode } from "../decision/engine";
import { ACTION_LIBRARY } from "../library/actionLibrary";

type Props = {
  tree: DecisionTree;
};

export function DecisionTreeRunner({ tree }: Props) {
  const [currentId, setCurrentId] = useState<string>(tree.startNodeId);
  const [history, setHistory] = useState<string[]>([]);

  const node: DecisionNode = useMemo(() => getNode(tree, currentId), [tree, currentId]);

  const packs = useMemo(() => {
    return (node.actionRefs ?? [])
      .map((id) => ACTION_LIBRARY[id])
      .filter(Boolean);
  }, [node]);

  function go(nextId: string) {
    setHistory((h) => [...h, currentId]);
    setCurrentId(nextId);
  }

  function back() {
    setHistory((h) => {
      if (h.length === 0) return h;
      const prev = h[h.length - 1];
      setCurrentId(prev);
      return h.slice(0, -1);
    });
  }

  function reset() {
    setHistory([]);
    setCurrentId(tree.startNodeId);
  }

  return (
    <div className="card">
      <div style={{ display: "flex", gap: 10, justifyContent: "space-between", alignItems: "center" }}>
        <div>
          <div className="muted" style={{ fontSize: 12 }}>
            {tree.title}
          </div>
          <h2 style={{ margin: "6px 0 0 0" }}>{node.title}</h2>
          {node.description ? <div className="muted" style={{ marginTop: 6 }}>{node.description}</div> : null}
        </div>

        <div style={{ display: "flex", gap: 8 }}>
          <button className="secondary" onClick={back} disabled={history.length === 0}>
            Назад
          </button>
          <button className="secondary" onClick={reset}>
            Сброс
          </button>
        </div>
      </div>

      {/* Конкретные действия из библиотеки */}
      {packs.length > 0 && (
        <div className="card" style={{ marginTop: 12 }}>
          <h3 style={{ marginTop: 0 }}>Конкретные действия</h3>

          {packs.map((p) => (
            <div key={p.id} style={{ marginBottom: 16 }}>
              <div style={{ fontWeight: 700 }}>{p.title}</div>
              <div className="muted" style={{ marginBottom: 8 }}>{p.whenToUse}</div>

              <ol style={{ marginTop: 6 }}>
                {p.steps.map((s, idx) => (
                  <li key={idx} style={{ marginBottom: 6 }}>
                    {s.text}
                    {s.check ? <div className="muted">✔ Контроль: {s.check}</div> : null}
                  </li>
                ))}
              </ol>

              {p.tools?.length ? (
                <>
                  <div style={{ fontWeight: 600 }}>Инструменты</div>
                  <ul>{p.tools.map((t) => <li key={t}>{t}</li>)}</ul>
                </>
              ) : null}

              {p.safety?.length ? (
                <>
                  <div style={{ fontWeight: 600 }}>Техника безопасности</div>
                  <ul>{p.safety.map((t) => <li key={t}>{t}</li>)}</ul>
                </>
              ) : null}

              {p.notes?.length ? (
                <>
                  <div style={{ fontWeight: 600 }}>Примечания</div>
                  <ul>{p.notes.map((n) => <li key={n}>{n}</li>)}</ul>
                </>
              ) : null}

              {p.source ? <div className="muted">Источник: {p.source}</div> : null}
            </div>
          ))}
        </div>
      )}

      {/* Управление логикой узла */}
      <div style={{ marginTop: 12 }}>
        {node.type === "question" ? (
          <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
            {node.options.map((o) => (
              <button key={o.label} onClick={() => go(o.next)}>
                {o.label}
              </button>
            ))}
          </div>
        ) : node.type === "action" ? (
          <div style={{ display: "flex", gap: 10 }}>
            {node.next ? (
              <button onClick={() => go(node.next)}>Далее</button>
            ) : (
              <div className="muted">Нет следующего шага (проверьте дерево)</div>
            )}
          </div>
        ) : (
          <div className="muted">Результат. При необходимости нажмите “Назад” или “Сброс”.</div>
        )}
      </div>
    </div>
  );
}
