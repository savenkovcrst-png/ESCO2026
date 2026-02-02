import React, { useMemo, useState } from "react";
import type { DecisionTree, AnswerValue } from "../decision/decisionTree";
import { getNode, answerQuestion, isResultNode, type RunState } from "../decision/engine";

type Props = { tree: DecisionTree };

export function DecisionTreeRunner({ tree }: Props) {
  const [state, setState] = useState<RunState>({ currentNodeId: tree.startNodeId, answers: {} });

  const node = useMemo(() => getNode(tree, state.currentNodeId), [tree, state.currentNodeId]);

  function onAnswer(value: AnswerValue) {
    setState((prev) => answerQuestion(tree, prev, value));
  }
  function reset() {
    setState({ currentNodeId: tree.startNodeId, answers: {} });
  }

  if (isResultNode(node)) {
    return (
      <div className="card">
        <div className="row">
          <h2 style={{ margin: 0 }}>{node.title}</h2>
          {node.severity && <span className={"pill " + node.severity}>{node.severity}</span>}
        </div>

        <h3>План действий</h3>
        <ol>
          {node.actions.map((a, i) => (
            <li key={i}>{a}</li>
          ))}
        </ol>

        {node.notes?.length ? (
          <>
            <h3>Примечания / ТБ</h3>
            <ul>
              {node.notes.map((n, i) => (
                <li key={i}>{n}</li>
              ))}
            </ul>
          </>
        ) : null}

        {node.references?.length ? (
          <>
            <h3>Ссылка на книгу</h3>
            <ul>
              {node.references.map((r, i) => (
                <li key={i}>
                  {r.chapter}
                  {r.section ? ` — ${r.section}` : ""}
                </li>
              ))}
            </ul>
          </>
        ) : null}

        <div className="row">
          <button onClick={reset}>Начать заново</button>
        </div>
      </div>
    );
  }

  const q = node;
  return (
    <div className="card">
      <h2 style={{ marginTop: 0 }}>{tree.title}</h2>
      <h3>{q.title}</h3>
      {q.help && <p className="muted">{q.help}</p>}

      {q.input === "yesno" && (
        <div className="row">
          <button onClick={() => onAnswer(true)}>Да</button>
          <button onClick={() => onAnswer(false)}>Нет</button>
        </div>
      )}

      {q.input === "select" && q.options && (
        <div className="grid">
          {q.options.map((opt) => (
            <button key={opt.value} onClick={() => onAnswer(opt.value)}>
              {opt.label}
            </button>
          ))}
        </div>
      )}

      {q.input === "number" && <NumberAnswer onSubmit={(n) => onAnswer(n)} />}

      <div className="row" style={{ marginTop: 16 }}>
        <button className="secondary" onClick={reset}>
          Сброс
        </button>
      </div>
    </div>
  );
}

function NumberAnswer({ onSubmit }: { onSubmit: (n: number) => void }) {
  const [val, setVal] = useState<string>("");

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        const n = Number(val);
        if (Number.isFinite(n)) onSubmit(n);
      }}
      className="row"
    >
      <input value={val} onChange={(e) => setVal(e.target.value)} placeholder="Введите число" />
      <button type="submit">Далее</button>
    </form>
  );
}
