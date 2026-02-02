import React from "react";

export function MermaidView({ code }: { code: string }) {
  // Без внешних библиотек: показываем готовый mermaid-код (для вставки в Mermaid Live / docs).
  return (
    <div className="card">
      <h3 style={{ marginTop: 0 }}>Mermaid схема</h3>
      <p className="muted">
        Скопируйте текст ниже в Mermaid Live Editor или в документацию (например, MkDocs/Docsify).
      </p>
      <textarea readOnly value={code} style={{ width: "100%", minHeight: 280 }} />
    </div>
  );
}
