import { GraphNode } from "../../types";

export type PossibleTarget = {
  sourceNode: GraphNode;
  targetID: GraphNode["nodeID"];
};

const addPossibleTargets = ({ sourceNode, targetID }: PossibleTarget) => {
  const { possibleTargets } = sourceNode;
  const updatedNode = {
    ...sourceNode,
    possibleTargets: [...possibleTargets, targetID]
  };
  return updatedNode;
};

export default addPossibleTargets;
export { addPossibleTargets };
