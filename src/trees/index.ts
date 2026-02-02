import type { DecisionTree } from "../decision/decisionTree";
import { chapter1_tree } from "./chapter1_accidents";
import { chapter2_tree } from "./chapter2_elimination";
import { chapter3_tree } from "./chapter3_prevention";
import { chapter4_tree } from "./chapter4_fishing_tools";
import { chapter5_tree } from "./chapter5_losses";

export const TREES: DecisionTree[] = [
  chapter1_tree,
  chapter2_tree,
  chapter3_tree,
  chapter4_tree,
  chapter5_tree,
];
