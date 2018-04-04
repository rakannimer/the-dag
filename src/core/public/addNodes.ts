import {
  GraphEdge,
  GraphStateManipulators,
  PartialEdge,
  PartialNode
} from "../../types";
import { privateMethods } from "../private/";
import { nodeExists } from "./nodeExists";

const { getStateManipulators, createNode, addPossibleTargets } = privateMethods;

export const addNodes = (
  nodes: PartialNode[] = [],
  stateManipulators?: GraphStateManipulators
) => {
  const { setState } = getStateManipulators(stateManipulators);
  nodes.forEach(node => {
    const { nodeID } = node;
    if (nodeExists(nodeID)) return;
    const newNode = createNode(node);
    setState(state => {
      state.nodes[nodeID] = newNode;
      return state;
    });
  });
};
export default addNodes;
