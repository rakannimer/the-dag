import { GraphNode, GraphStateManipulators } from "../../types";
import { traverseBreadthFirstGenerator } from "./traverseBreadthFirstGenerator";

export const getDistanceTo = (
  {
    sourceNodeID,
    targetNodeID
  }: {
    sourceNodeID: GraphNode["nodeID"];
    targetNodeID: GraphNode["nodeID"];
  },
  stateManipulators?: GraphStateManipulators
) => {
  const traverse = traverseBreadthFirstGenerator(
    {
      startingNodeID: sourceNodeID
    },
    stateManipulators
  );
  //@ts-ignore
  let traversalResult = traverse.next();
  let didFindNode = traversalResult.value.nodeID === targetNodeID;
  while (!didFindNode) {
    //@ts-ignore
    traversalResult = traverse.next();
    didFindNode = traversalResult.value.nodeID === targetNodeID;

    if (didFindNode) {
      return traversalResult.value.hops;
    }
  }
};

export default getDistanceTo;
