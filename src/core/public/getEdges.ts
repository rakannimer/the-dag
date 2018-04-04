import { privateMethods } from "../private/";
import { GraphStateManipulators } from "../../types";
const { getStateManipulators } = privateMethods;

export const getEdges = (stateManipulators?: GraphStateManipulators) => {
  const { getState } = getStateManipulators(stateManipulators);
  const state = getState();
  return state.edges;
};

export default getEdges;
