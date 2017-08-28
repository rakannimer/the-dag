// const { getState } = require('./_state');
const generateEdgeIDFromSourceAndTargetIDs = require('./_generateEdgeIDFromSourceAndTargetIDs');

const createEdge = edge => {
  const { source, target, data = {} } = edge;
  const sourceID = source.nodeID ? source.nodeID : source;
  const targetID = target.nodeID ? target.nodeID : target;

  const edgeID = generateEdgeIDFromSourceAndTargetIDs({
    sourceID,
    targetID
  });
  // throw JSON.stringify({ edgeID, sourceID, targetID, edgeData: data });
  return { edgeID, sourceID, targetID, edgeData: data };
};

module.exports = createEdge;
