const FIFO = require('fifo');
const { getState } = require('../private/_state');

const traverseDepthFirstGenerator = function*({
  startingNodeID,
  visitNode = () => null
}) {
  const state = getState();
  const { possibleTargets } = state.nodes[startingNodeID];
  const possibleTargetCount = possibleTargets.length;
  if (possibleTargetCount === 0) return;

  for (let i = 0; i < possibleTargetCount; i += 1) {
    const currentNodeID = possibleTargets[i];
    yield currentNodeID;
    visitNode(state.nodes[currentNodeID]);
    yield* traverseDepthFirstGenerator({ startingNodeID: currentNodeID });
  }
  return null;
};

module.exports = traverseDepthFirstGenerator;
