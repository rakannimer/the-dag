const uuidV4 = require('uuid/v4');

const createNode = node => {
  const { nodeID, data, nodeData } = node;
  const castNodeID = nodeID ? nodeID : uuidV4();
  const castNodeData = data ? data : nodeData;
  return { nodeID: castNodeID, nodeData: castNodeData, possibleTargets: [] };
};
module.exports = createNode;
