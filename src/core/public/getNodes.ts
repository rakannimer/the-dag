import { privateMethods } from "../private/";
import { GraphStateManipulators } from "../../types";
const { getStateManipulators } = privateMethods;

export const getNodes = (stateManipulators?: GraphStateManipulators) => {
  const { getState } = getStateManipulators(stateManipulators);
  const state = getState();
  return state.nodes;
};

export default getNodes;
