export type AnswerValue = string | number | boolean;

export type DecisionNode = QuestionNode | ResultNode;

export type QuestionNode = {
  id: string;
  type: "question";
  title: string;
  help?: string;
  input: "select" | "yesno" | "number";
  options?: { value: string; label: string }[];
  edges: Edge[];
};

export type Edge = {
  when:
    | { eq: AnswerValue }
    | { in: AnswerValue[] }
    | { gte: number }
    | { lte: number }
    | { always: true };
  to: string;
  label?: string;
};

export type ResultNode = {
  id: string;
  type: "result";
  title: string;
  severity?: "low" | "medium" | "high";
  actions: string[];
  notes?: string[];
  references?: { chapter: string; section?: string }[];
};

export type DecisionTree = {
  id: string;
  title: string;
  startNodeId: string;
  nodes: Record<string, DecisionNode>;
};
