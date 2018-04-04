import { privateMethods } from "../private/";
import { getEdgeID } from "./getEdgeID";
import { GraphStateManipulators, PartialEdge } from "../../types";
const { getStateManipulators } = privateMethods;

export const getEdge = (
  { source, target }: PartialEdge,
  stateManipulators?: GraphStateManipulators
) => {
  const { getState } = getStateManipulators(stateManipulators);
  const state = getState();
  const edgeID = getEdgeID({ source, target });
  // if (edgeID === false) return false;
  return state.edges[edgeID];
};

export default getEdge;
