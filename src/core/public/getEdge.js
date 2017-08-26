import getStateManipulators from '../private/_getStateManipulators';

import getEdgeID from './getEdgeID';

const getEdge = ({ source, target }, stateManipulators) => {
  const { getState } = getStateManipulators(stateManipulators);
  const state = getState();
  const edgeID = getEdgeID({ source, target });
  // if (edgeID === false) return false;
  return state.edges[edgeID];
};

export default getEdge;
