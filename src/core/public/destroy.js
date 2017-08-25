const getStateManipulators = require('../private/_getStateManipulators');
const destroy = stateManipulators => {
  const { setState } = getStateManipulators(stateManipulators);
  setState(state => {
    state.nodes = {};
    state.edges = {};
    return state;
  });
};

module.exports = destroy;
