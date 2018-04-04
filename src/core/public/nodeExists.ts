import { GraphStateManipulators, GraphNode } from "../../types";
import { privateMethods } from "../private/";

const { getStateManipulators } = privateMethods;

const nodeExists = (
  nodeID: GraphNode["nodeID"],
  stateManipulators?: GraphStateManipulators
) => {
  const { getState } = getStateManipulators(stateManipulators);
  const state = getState();
  return nodeID in state.nodes;
};

export default nodeExists;
export { nodeExists };
