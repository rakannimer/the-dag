import generateEdgeIDFromSourceAndTargetIDs from '../private/_generateEdgeIDFromSourceAndTargetIDs';

const getEdgeID = ({ source, target }) => {
  const sourceID = source.nodeID ? source.nodeID : source;
  const targetID = target.nodeID ? target.nodeID : target;
  const edgeID = generateEdgeIDFromSourceAndTargetIDs({
    sourceID,
    targetID
  });
  return edgeID;
};

export default getEdgeID;
