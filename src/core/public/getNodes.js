const { getState } = require('../private/_state');

const getNodes = () => {
  const state = getState();
  return state.nodes;
};

module.exports = getNodes;
