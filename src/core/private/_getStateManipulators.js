const defaultStateManipulators = require('../private/_state');

const getStateManipulators = stateManipulators => {
  return stateManipulators ? stateManipulators : defaultStateManipulators;
};

module.exports = getStateManipulators;
