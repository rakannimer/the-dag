const { getState } = require('./_state');
const generateEdgeIDFromSourceAndTargetIDs = require('./_generateEdgeIDFromSourceAndTargetIDs');

const createEdge = (
  edge = { source: 'sourceNodeID', target: 'targetNodeID' }
) => {
  const { source, target, data = {} } = edge;
  const { nodes } = getState();
  const sourceID = source.nodeID ? source.nodeID : source;
  const targetID = target.nodeID ? target.nodeID : target;
  const sourceNodeExists = sourceID in nodes;
  const targetNodeExists = targetID in nodes;
  if (!sourceNodeExists) {
    throw new Error(`Couldn't find source node ${JSON.stringify(sourceID)}`);
  }
  if (!targetNodeExists) {
    throw new Error(`Couldn't find target node ${JSON.stringify(target)}`);
  }

  const edgeID = generateEdgeIDFromSourceAndTargetIDs({
    sourceID,
    targetID
  });

  return { edgeID, sourceID, targetID, edgeData: data };
};

module.exports = createEdge;
