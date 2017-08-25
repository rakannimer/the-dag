const getStateManipulators = require('../private/_getStateManipulators');

const getNodes = stateManipulators => {
  const { getState } = getStateManipulators(stateManipulators);
  const state = getState();
  return state.nodes;
};

module.exports = getNodes;
