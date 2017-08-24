const traverseBreadthFirstGenerator = require('./traverseBreadthFirstGenerator');

const getNodesByDistanceTo = ({ sourceNodeID, hops }) => {
  const result = [];
  const traverse = traverseBreadthFirstGenerator({
    startingNodeID: sourceNodeID
  });
  let traversalResult = traverse.next();
  // console.warn(traversalResult.value);
  let reachedNextLevel = traversalResult.value.hops > hops;
  const isRightLevel = traversalResult.value.hops === hops;
  if (isRightLevel) {
    result.push(traversalResult.value);
  }
  while (!reachedNextLevel) {
    traversalResult = traverse.next();
    // console.warn(traversalResult.value);
    reachedNextLevel = traversalResult.value.hops > hops;
    const isRightLevel = traversalResult.value.hops === hops;
    if (isRightLevel) {
      result.push(traversalResult.value);
    }
    if (traversalResult.done) {
      return result;
    }
    if (reachedNextLevel) {
      // console.warn('Should stop');
    }
  }
  return result;
};

module.exports = getNodesByDistanceTo;
