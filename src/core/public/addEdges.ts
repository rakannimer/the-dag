import { GraphEdge, GraphStateManipulators, PartialEdge } from "../../types";
import { privateMethods } from "../private/";
const { getStateManipulators, createEdge, addPossibleTargets } = privateMethods;

export const addEdge = (
  edge: PartialEdge,
  stateManipulators?: GraphStateManipulators
) => {
  const { getState, setState } = getStateManipulators(stateManipulators);
  const state = getState();
  const { source, target, edgeData: providedEdgeData } = edge;
  const { edgeID, edgeData, sourceID, targetID } = createEdge({
    source,
    target,
    edgeData: providedEdgeData
  });
  const edgeExists = edgeID in state.edges;
  if (edgeExists) return;
  setState(stateToUpdate => {
    stateToUpdate.edges[edgeID] = { edgeID, edgeData, sourceID, targetID };
    return stateToUpdate;
  });
  const sourceNode = state.nodes[sourceID];

  if (typeof sourceNode === "undefined") {
    throw new Error(
      "Couldnt find source node at edge " +
        JSON.stringify(edge, null, 2) +
        " \n Nodes in memory : " +
        JSON.stringify(state.nodes)
    );
  }
  setState(stateToUpdate => {
    stateToUpdate.nodes[sourceID] = addPossibleTargets({
      sourceNode,
      targetID
    });
    return stateToUpdate;
  });
};

export const addEdges = (
  edges: PartialEdge[] = [],
  stateManipulators?: GraphStateManipulators
) => {
  const { getState, setState } = getStateManipulators(stateManipulators);
  const state = getState();
  edges.forEach(edge => {
    addEdge(edge, stateManipulators);
  });
};

export default addEdges;
