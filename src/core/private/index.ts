import { addPossibleSources } from "./_addPossibleSources";
import { addPossibleTargets } from "./_addPossibleTargets";
import { createEdge } from "./_createEdge";
import { createNode } from "./_createNode";
import { generateEdgeIDFromSourceAndTargetIDs } from "./_generateEdgeIDFromSourceAndTargetIDs";
import { getStateManipulators } from "./_getStateManipulators";
import { createStateManipulators } from "./_state";

export const privateMethods = {
  addPossibleSources,
  addPossibleTargets,
  createEdge,
  createNode,
  generateEdgeIDFromSourceAndTargetIDs,
  getStateManipulators,
  createStateManipulators
};

export default {
  privateMethods
};
