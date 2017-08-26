import getStateManipulators from '../private/_getStateManipulators';

const getNode = ({ nodeID }, stateManipulators) => {
  const { getState } = getStateManipulators(stateManipulators);
  const state = getState();
  return state.nodes[nodeID];
};

export default getNode;
