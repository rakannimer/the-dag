const addPossibleTargets = ({ sourceNode, targetID }) => {
  const { possibleTargets } = sourceNode;
  const updatedNode = Object.assign({}, sourceNode, {
    possibleTargets: [...possibleTargets, targetID]
  });
  return updatedNode;
};

module.exports = addPossibleTargets;
