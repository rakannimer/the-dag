const { privateMethods } = require('../private/');
const getStateManipulators = require('../private/_getStateManipulators');

const addEdges = (edges = [], stateManipulators) => {
  const { getState, setState } = getStateManipulators(stateManipulators);
  const state = getState();
  edges.forEach(edge => {
    const { source, target } = edge;
    const { edgeID, edgeData, sourceID, targetID } = privateMethods.createEdge(
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
      stateToUpdate.nodes[sourceID] = privateMethods.addPossibleTargets({
        sourceNode,
        targetID
      });
      return stateToUpdate;
    });

    const targetNode = state.nodes[targetID];
    setState(stateToUpdate => {
      stateToUpdate.nodes[targetID] = privateMethods.addPossibleSources({
        targetNode,
        sourceID
      });
      return stateToUpdate;
    });
  });
};

module.exports = addEdges;
