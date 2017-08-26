import getStateManipulators from '../private/_getStateManipulators';

const getEdges = stateManipulators => {
  const { getState } = getStateManipulators(stateManipulators);
  const state = getState();
  return state.edges;
};

export default getEdges;
