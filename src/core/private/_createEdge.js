// const { getState } = require('./_state');
const generateEdgeIDFromSourceAndTargetIDs = require('./_generateEdgeIDFromSourceAndTargetIDs');

const createEdge = edge => {
  const { source, target, edgeData = {} } = edge;
  const sourceID = source.nodeID ? source.nodeID : source;
  const targetID = target.nodeID ? target.nodeID : target;
  const edgeID = generateEdgeIDFromSourceAndTargetIDs({
    sourceID,
    targetID
  });
  return { edgeID, sourceID, targetID, edgeData: edgeData };
};

module.exports = createEdge;
