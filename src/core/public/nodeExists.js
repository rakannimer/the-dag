const getStateManipulators = require('../private/_getStateManipulators');

const nodeExists = (nodeID, stateManipulators) => {
  const { getState } = getStateManipulators(stateManipulators);
  const state = getState();
  return nodeID in state.nodes;
};

module.exports = nodeExists;
