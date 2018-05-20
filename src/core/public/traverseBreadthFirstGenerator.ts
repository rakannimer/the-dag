import { FIFO } from "../../utils/fifo";
import { GraphNode, GraphStateManipulators, TraverseArgs } from "../../types";
import { privateMethods } from "../private/";

const { getStateManipulators } = privateMethods;

export const traverseBreadthFirstGenerator = function*(
  { startingNodeID, visitNode = () => null }: TraverseArgs,
  stateManipulators?: GraphStateManipulators
) {
  const { getState } = getStateManipulators(stateManipulators);
  const nodesBFT = [];
  const visitedNodes: {
    [nodeID: string]: boolean;
  } = {};
  const fifo = new FIFO();
  visitedNodes[startingNodeID] = true;
  fifo.push({ nodeID: startingNodeID, hops: 0 });
  while (fifo.length > 0) {
    const currentNode = fifo.shift();

    visitNode(currentNode);

    yield currentNode;
    const { nodeID, hops } = currentNode;
    const state = getState();
    const { possibleTargets } = state.nodes[nodeID];
    nodesBFT.push(currentNode);
    possibleTargets.forEach(targetID => {
      const isTargetVisited = targetID in visitedNodes;
      if (isTargetVisited) return;
      fifo.push({ nodeID: targetID, hops: hops + 1 });
      visitedNodes[targetID] = true;
    });
  }
  return nodesBFT;
};

export default traverseBreadthFirstGenerator;
