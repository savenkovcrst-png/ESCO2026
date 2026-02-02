import type { DecisionTree, DecisionNode, QuestionNode, ResultNode, AnswerValue } from "./decisionTree";

export type RunState = {
  currentNodeId: string;
  answers: Record<string, AnswerValue>;
};

export function getNode(tree: DecisionTree, nodeId: string): DecisionNode {
  const node = tree.nodes[nodeId];
  if (!node) throw new Error(`Node not found: ${nodeId}`);
  return node;
}

function edgeMatches(edge: any, value: AnswerValue): boolean {
  if (edge.when?.always) return true;
  if (edge.when?.eq !== undefined) return value === edge.when.eq;
  if (edge.when?.in) return edge.when.in.includes(value);

  if (typeof value === "number") {
    if (edge.when?.gte !== undefined) return value >= edge.when.gte;
    if (edge.when?.lte !== undefined) return value <= edge.when.lte;
  }
  return false;
}

export function nextNodeId(qNode: QuestionNode, answer: AnswerValue): string {
  const found = qNode.edges.find((e) => edgeMatches(e, answer)) ?? qNode.edges.find((e) => (e.when as any)?.always);
  if (!found) throw new Error(`No edge matched answer for node ${qNode.id}`);
  return found.to;
}

export function answerQuestion(tree: DecisionTree, state: RunState, answer: AnswerValue): RunState {
  const node = getNode(tree, state.currentNodeId);
  if (node.type !== "question") throw new Error("Current node is not a question");
  const nextId = nextNodeId(node, answer);
  return {
    currentNodeId: nextId,
    answers: { ...state.answers, [node.id]: answer },
  };
}

export function isResultNode(node: DecisionNode): node is ResultNode {
  return node.type === "result";
}
