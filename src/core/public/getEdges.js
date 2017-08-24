const { getState } = require('../private/_state');

const getEdges = () => {
  const state = getState();
  return state.edges;
};

module.exports = getEdges;
