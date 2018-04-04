import { privateMethods } from "../private/";
import { GraphStateManipulators } from "../../types";
const { getStateManipulators } = privateMethods;

export const getNode = (
  { nodeID }: { nodeID: string },
  stateManipulators?: GraphStateManipulators
) => {
  const { getState } = getStateManipulators(stateManipulators);
  const state = getState();
  return state.nodes[nodeID];
};

export default getNode;
