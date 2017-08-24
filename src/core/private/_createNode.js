const uuidV4 = require('uuid/v4');

const createNode = node => {
  const { nodeID, data } = node;
  const castNodeID = nodeID ? nodeID : uuidV4();
  const nodeData = data;
  return { nodeID: castNodeID, nodeData, possibleTargets: [] };
};
module.exports = createNode;
