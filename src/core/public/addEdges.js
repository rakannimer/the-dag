const { privateMethods } = require('../private/');
const { getState, setState } = require('../private/_state');

const addEdges = (edges = []) => {
  const state = getState();
  edges.forEach(edge => {
    const { source, target } = edge;
    const { edgeID, edgeData, sourceID, targetID } = privateMethods.createEdge({
      source,
      target
    });
    const edgeExists = edgeID in state.edges;
    if (edgeExists) return;
    setState(stateToUpdate => {
      stateToUpdate.edges[edgeID] = { edgeID, edgeData, sourceID, targetID };
    });
    const sourceNode = state.nodes[sourceID];
    setState(stateToUpdate => {
      stateToUpdate.nodes[sourceID] = privateMethods.addPossibleTargets({
        sourceNode,
        targetID
      });
    });

    const targetNode = state.nodes[targetID];
    setState(stateToUpdate => {
      stateToUpdate.nodes[targetID] = privateMethods.addPossibleSources({
        targetNode,
        sourceID
      });
    });
  });
};

module.exports = addEdges;
