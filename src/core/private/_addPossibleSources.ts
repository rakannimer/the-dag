import { GraphNode } from "../../types";

export type PossibleSources = {
  targetNode: GraphNode;
  sourceID: GraphNode["nodeID"];
};

const addPossibleSources = ({ targetNode, sourceID }: PossibleSources) => {
  const { possibleSources = [] } = targetNode;
  const updatedNode = {
    ...targetNode,
    possibleSources: [...possibleSources, sourceID]
  };
  return updatedNode;
};

export { addPossibleSources };
export default addPossibleSources;
