const toposort = require('toposort');

const getStateManipulators = require('../private/_getStateManipulators');

const isAcyclic = stateManipulators => {
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
    let cyclicDependencyID = message.split(':')[1].trim();
    return { isAcyclic: false, message, cyclicDependencyID };
  }
};
module.exports = isAcyclic;
