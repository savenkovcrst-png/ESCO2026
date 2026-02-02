import type { DecisionTree } from "./decisionTree";

export function treeToMermaid(tree: DecisionTree): string {
  const lines: string[] = [];
  lines.push("flowchart TD");
  const safe = (s: string) => s.replace(/[\[\]\(\)<>]/g, "").replace(/\n/g, " ").trim();

  for (const node of Object.values(tree.nodes)) {
    if (node.type === "question") {
      lines.push(`  ${node.id}{${safe(node.title)}}`);
      for (const e of node.edges) {
        const label =
          e.label ??
          ("always" in e.when
            ? "далее"
            : "eq" in e.when
              ? String((e.when as any).eq)
              : "in" in e.when
                ? `in(${(e.when as any).in.join(",")})`
                : "gte" in e.when
                  ? `>=${(e.when as any).gte}`
                  : "lte" in e.when
                    ? `<=${(e.when as any).lte}`
                    : "");
        lines.push(`  ${node.id} -->|${safe(label)}| ${e.to}`);
      }
    } else {
      lines.push(`  ${node.id}[${safe(node.title)}]`);
    }
  }
  return lines.join("\n");
}
