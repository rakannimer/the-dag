import createEdge from '../private/_createEdge';
import addPossibleSources from '../private/_addPossibleSources';
import addPossibleTargets from '../private/_addPossibleTargets';
import getStateManipulators from '../private/_getStateManipulators';

const addEdges = (edges = [], stateManipulators) => {
  const { getState, setState } = getStateManipulators(stateManipulators);
  const state = getState();
  edges.forEach(edge => {
    const { source, target } = edge;
    const { edgeID, edgeData, sourceID, targetID } = createEdge(
      {
        source,
        target
      },
      { getState }
    );

    const edgeExists = edgeID in state.edges;
    if (edgeExists) return;
    setState(stateToUpdate => {
      stateToUpdate.edges[edgeID] = { edgeID, edgeData, sourceID, targetID };
      return stateToUpdate;
    });
    const sourceNode = state.nodes[sourceID];
    setState(stateToUpdate => {
      stateToUpdate.nodes[sourceID] = addPossibleTargets({
        sourceNode,
        targetID
      });
      return stateToUpdate;
    });

    const targetNode = state.nodes[targetID];
    setState(stateToUpdate => {
      stateToUpdate.nodes[targetID] = addPossibleSources({
        targetNode,
        sourceID
      });
      return stateToUpdate;
    });
  });
};

export default addEdges;
