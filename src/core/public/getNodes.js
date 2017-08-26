import getStateManipulators from '../private/_getStateManipulators';

const getNodes = stateManipulators => {
  const { getState } = getStateManipulators(stateManipulators);
  const state = getState();
  return state.nodes;
};

export default getNodes;
