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

    if (typeof sourceNode === 'undefined') {
      throw new Error(
        'Couldnt find source node at edge ' +
          JSON.stringify(edge, null, 2) +
          ' \n Nodes in memory : ' +
          JSON.stringify(state.nodes)
      );
    }
    setState(stateToUpdate => {
      stateToUpdate.nodes[sourceID] = privateMethods.addPossibleTargets({
        sourceNode,
        targetID
      });
      return stateToUpdate;
    });

    const targetNode = state.nodes[targetID];
    if (typeof targetNode === 'undefined') {
      throw new Error(
        'Couldnt find target node at edge ' +
          JSON.stringify(edge, null, 2) +
          ' \n Nodes in memory : ' +
          JSON.stringify(state.nodes)
      );
    }
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
