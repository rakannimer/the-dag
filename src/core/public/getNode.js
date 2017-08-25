const getStateManipulators = require('../private/_getStateManipulators');

const getNode = ({ nodeID }, stateManipulators) => {
  const { getState } = getStateManipulators(stateManipulators);
  const state = getState();
  return state.nodes[nodeID];
};

module.exports = getNode;
