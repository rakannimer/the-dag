import defaultStateManipulators from '../private/_state';

const getStateManipulators = stateManipulators => {
  return stateManipulators ? stateManipulators : defaultStateManipulators;
};

export default getStateManipulators;
