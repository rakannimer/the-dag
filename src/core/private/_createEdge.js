// const { getState } = require('./_state');
import generateEdgeIDFromSourceAndTargetIDs from './_generateEdgeIDFromSourceAndTargetIDs';
import getStateManipulators from './_getStateManipulators';

const createEdge = (edge, stateManipulators) => {
  const { getState } = getStateManipulators(stateManipulators);
  const { source, target, data = {} } = edge;
  const { nodes } = getState();
  const sourceID = source.nodeID ? source.nodeID : source;
  const targetID = target.nodeID ? target.nodeID : target;
  const sourceNodeExists = sourceID in nodes;
  if (!sourceNodeExists) {
    throw new Error(`Couldn't find source node ${JSON.stringify(sourceID)}`);
  }
  // const targetNodeExists = targetID in nodes;
  // if (!targetNodeExists) {
  //   throw new Error(`Couldn't find target node ${JSON.stringify(target)}`);
  // }

  const edgeID = generateEdgeIDFromSourceAndTargetIDs({
    sourceID,
    targetID
  });

  return { edgeID, sourceID, targetID, edgeData: data };
};

export default createEdge;
