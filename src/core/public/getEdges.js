const getStateManipulators = require('../private/_getStateManipulators');

const getEdges = stateManipulators => {
  const { getState } = getStateManipulators(stateManipulators);
  const state = getState();
  return state.edges;
};

module.exports = getEdges;
