import uuidV4 from 'uuid/v4';

const createNode = node => {
  const { nodeID, data } = node;
  const castNodeID = nodeID ? nodeID : uuidV4();
  const nodeData = data;
  return { nodeID: castNodeID, nodeData, possibleTargets: [] };
};
export default createNode;
