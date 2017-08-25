const getStateManipulators = require('../private/_getStateManipulators');

const getEdgeID = require('./getEdgeID');

const getEdge = ({ source, target }, stateManipulators) => {
  const { getState } = getStateManipulators(stateManipulators);
  const state = getState();
  const edgeID = getEdgeID({ source, target });
  // if (edgeID === false) return false;
  return state.edges[edgeID];
};

module.exports = getEdge;
