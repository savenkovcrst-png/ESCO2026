// src/decision/toMermaid.ts
import type { DecisionTree, DecisionNode } from "./decisionTree";

function esc(s: string) {
  return s.replace(/"/g, '\\"');
}

export function treeToMermaid(tree: DecisionTree): string {
  const lines: string[] = [];
  lines.push("flowchart TD");
  lines.push(`  START(["${esc(tree.title)}"]) --> ${tree.startNodeId}`);

  const ids = Object.keys(tree.nodes);

  for (const id of ids) {
    const node = tree.nodes[id] as DecisionNode;
    const label = esc(node.title);

    if (node.type === "question") {
      lines.push(`  ${id}{{"${label}"}}`);
      for (const opt of node.options) {
        lines.push(`  ${id} -->|"${esc(opt.label)}"| ${opt.next}`);
      }
    } else if (node.type === "action") {
      lines.push(`  ${id}["${label}"]`);
      if (node.next) lines.push(`  ${id} --> ${node.next}`);
    } else {
      lines.push(`  ${id}(["${label}"])`);
    }
  }

  return lines.join("\n");
}
