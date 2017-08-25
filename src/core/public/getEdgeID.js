const { privateMethods } = require('../private/');

const getEdgeID = ({ source, target }) => {
  const sourceID = source.nodeID ? source.nodeID : source;
  const targetID = target.nodeID ? target.nodeID : target;
  const edgeID = privateMethods.generateEdgeIDFromSourceAndTargetIDs({
    sourceID,
    targetID
  });
  return edgeID;
};

module.exports = getEdgeID;
