import { FIFO } from "../../utils/fifo";
import { GraphNode, GraphStateManipulators, TraverseArgs } from "../../types";
import { privateMethods } from "../private/";

const { getStateManipulators } = privateMethods;

export const traverseDynamicPathGenerator = function*(
  { startingNodeID, visitNode = () => null }: TraverseArgs,
  stateManipulators?: GraphStateManipulators
) {
  const { getState } = getStateManipulators(stateManipulators);
  const visitedNodes: {
    [nodeID: string]: boolean;
  } = {};
  const fifo = new FIFO();
  visitedNodes[startingNodeID] = true;
  fifo.push({ nodeID: startingNodeID, hops: 0 });
  while (fifo.length > 0) {
    const currentNode = fifo.shift();
    const { nodeID, hops } = currentNode;
    const state = getState();
    const visitedNode = state.nodes[nodeID];
    visitNode(currentNode);
    const nextNodeID = yield { visitedNode };
    if (!nextNodeID) {
      throw new Error(
        "Invalid Transition : nextNodeID not specified " + nextNodeID
      );
    }
    // throw visitedNode.possibleTargets;
    const isValidNextStep =
      visitedNode.possibleTargets.indexOf(nextNodeID) !== -1;
    if (!isValidNextStep) {
      throw new Error(
        `Invalid Transition : Trying to visit node ${nextNodeID} from ${currentNode.nodeID} `
      );
    }
    fifo.push({ nodeID: nextNodeID, hops: hops + 1 });
    visitedNodes[nextNodeID] = true;
  }
};

export default traverseDynamicPathGenerator;
