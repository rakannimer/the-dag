const generateEdgeIDFromSourceAndTargetIDs = ({ sourceID, targetID }) => {
  return `${sourceID}_${targetID}`;
};
export default generateEdgeIDFromSourceAndTargetIDs;
