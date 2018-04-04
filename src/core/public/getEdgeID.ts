import { privateMethods } from "../private/";
import { PartialEdge } from "../../types";

export const getEdgeID = ({ source, target }: PartialEdge) => {
  const sourceID = source.nodeID ? source.nodeID : source;
  const targetID = target.nodeID ? target.nodeID : target;
  const edgeID = privateMethods.generateEdgeIDFromSourceAndTargetIDs({
    sourceID,
    targetID
  });
  return edgeID;
};

export default getEdgeID;
