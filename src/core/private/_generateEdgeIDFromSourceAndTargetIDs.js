const generateEdgeIDFromSourceAndTargetIDs = ({ sourceID, targetID }) => {
  return `${String(sourceID)}_${String(targetID)}`;
};
module.exports = generateEdgeIDFromSourceAndTargetIDs;
