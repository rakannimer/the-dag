const { getState } = require('../private/_state');

const nodeExists = nodeID => {
  const state = getState();
  return nodeID in state.nodes;
};

module.exports = nodeExists;
