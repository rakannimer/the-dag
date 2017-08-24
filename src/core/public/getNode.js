const { getState } = require('../private/_state');

const getNode = ({ nodeID }) => {
  const state = getState();
  return state.nodes[nodeID];
};

module.exports = getNode;
