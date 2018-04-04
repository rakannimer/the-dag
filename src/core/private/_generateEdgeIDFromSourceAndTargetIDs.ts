import { GraphNode } from "../../types";

export type GenerateEdgeIDFromSourceAndTargetIDs = (
  sAndTID: { sourceID: GraphNode["nodeID"]; targetID: GraphNode["nodeID"] }
) => string;

const generateEdgeIDFromSourceAndTargetIDs: GenerateEdgeIDFromSourceAndTargetIDs = ({
  sourceID,
  targetID
}) => {
  return `${String(sourceID)}_${String(targetID)}`;
};

export default generateEdgeIDFromSourceAndTargetIDs;
export { generateEdgeIDFromSourceAndTargetIDs };
