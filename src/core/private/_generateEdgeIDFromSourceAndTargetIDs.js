const generateEdgeIDFromSourceAndTargetIDs = ({ sourceID, targetID }) => {
  return `${sourceID}_${targetID}`;
};
module.exports = generateEdgeIDFromSourceAndTargetIDs;
