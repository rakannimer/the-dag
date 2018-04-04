import { genID } from "./_genID";
import { PartialNode, GraphNode } from "../../types";

const createNode = (node: PartialNode): GraphNode => {
  const { nodeID, data, nodeData } = node;
  const castNodeID = nodeID ? nodeID : genID();
  const castNodeData = data ? data : nodeData;
  return {
    id: castNodeID,
    nodeID: castNodeID,
    nodeData: castNodeData,
    possibleTargets: [],
    possibleSources: []
  };
};

export default createNode;
export { createNode };
