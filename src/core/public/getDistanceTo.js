const traverseBreadthFirstGenerator = require('./traverseBreadthFirstGenerator');

const getDistanceTo = ({ sourceNodeID, targetNodeID }) => {
  const traverse = traverseBreadthFirstGenerator({
    startingNodeID: sourceNodeID
  });
  let traversalResult = traverse.next();
  let didFindNode = traversalResult.value.nodeID === targetNodeID;
  while (!didFindNode) {
    traversalResult = traverse.next();
    didFindNode = traversalResult.value.nodeID === targetNodeID;

    if (didFindNode) {
      return traversalResult.value.hops;
    }
  }
};

module.exports = getDistanceTo;
