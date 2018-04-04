import { PartialEdge } from "../../types";

import { generateEdgeIDFromSourceAndTargetIDs } from "./_generateEdgeIDFromSourceAndTargetIDs";

const createEdge = (edge: PartialEdge) => {
  const { source, target, edgeData = {} } = edge;
  const sourceID = source.nodeID ? source.nodeID : source;
  const targetID = target.nodeID ? target.nodeID : target;
  const edgeID = generateEdgeIDFromSourceAndTargetIDs({
    sourceID,
    targetID
  });
  return { edgeID, sourceID, targetID, edgeData: edgeData };
};

export { createEdge };
export default createEdge;
