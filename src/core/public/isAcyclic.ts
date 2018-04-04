import * as toposort from "toposort";
import { privateMethods } from "../private/";
import { GraphStateManipulators } from "../../types";
const { getStateManipulators } = privateMethods;

export const isAcyclic = (stateManipulators?: GraphStateManipulators) => {
  const { getState } = getStateManipulators(stateManipulators);
  const state = getState();
  const edges = Object.keys(state.edges).map(edgeID => [
    state.edges[edgeID].sourceID,
    state.edges[edgeID].targetID
  ]);
  try {
    const topoSortedNodes = toposort(edges);
    return { isAcyclic: true, topologicallySortedNodeIDs: topoSortedNodes };
  } catch (err) {
    const { message } = err;
    try {
      let cyclicDependencyID = message.split(":")[1].trim();
      return { isAcyclic: false, message, cyclicDependencyID };
    } catch (err) {
      return { isAcyclic: false, message };
    }
  }
};
export default isAcyclic;
