const { getState } = require('../private/_state');
const getEdgeID = require('./getEdgeID');

const getEdge = ({ source, target }) => {
  const state = getState();
  const edgeID = getEdgeID({ source, target });
  // if (edgeID === false) return false;
  return state.edges[edgeID];
};

module.exports = getEdge;
