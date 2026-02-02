// src/decision/engine.ts
import type { DecisionNode, DecisionTree } from "./decisionTree";

export function getNode(tree: DecisionTree, nodeId: string): DecisionNode {
  const n = tree.nodes[nodeId];
  if (!n) {
    throw new Error(`Node not found: ${nodeId}`);
  }
  return n;
}

export function getStartNode(tree: DecisionTree): DecisionNode {
  return getNode(tree, tree.startNodeId);
}
