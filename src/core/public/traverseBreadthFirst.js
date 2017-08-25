const FIFO = require('fifo');
const getStateManipulators = require('../private/_getStateManipulators');

const traverseBreadthFirst = (
  { startingNodeID, visitNode = () => null },
  stateManipulators
) => {
  const { getState } = getStateManipulators(stateManipulators);
  const state = getState();
  const nodesBFT = [];
  const visitedNodes = {};
  const fifo = FIFO();
  fifo.push({ nodeID: startingNodeID, hops: 0 });
  visitedNodes[startingNodeID] = true;
  while (fifo.length > 0) {
    const currentNode = fifo.shift();
    visitNode(currentNode);
    const { nodeID, hops } = currentNode;
    const { possibleTargets } = state.nodes[nodeID];
    nodesBFT.push(currentNode);
    possibleTargets.forEach(targetID => {
      const isTargetVisited = targetID in visitedNodes;
      if (isTargetVisited) return;
      fifo.push({ nodeID: targetID, hops: hops + 1 });
      visitedNodes[targetID] = true;
    });
  }
  return nodesBFT;
};

module.exports = traverseBreadthFirst;
