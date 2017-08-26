import getStateManipulators from '../private/_getStateManipulators';

const traverseDepthFirstGenerator = function*(
  { startingNodeID, visitNode = () => null },
  stateManipulators
) {
  const { getState } = getStateManipulators(stateManipulators);
  const state = getState();
  const { possibleTargets } = state.nodes[startingNodeID];
  const possibleTargetCount = possibleTargets.length;
  if (possibleTargetCount === 0) return;

  for (let i = 0; i < possibleTargetCount; i += 1) {
    const currentNodeID = possibleTargets[i];
    yield state.nodes[currentNodeID];
    visitNode(state.nodes[currentNodeID]);
    yield* traverseDepthFirstGenerator(
      { startingNodeID: currentNodeID },
      stateManipulators
    );
  }
  return null;
};

export default traverseDepthFirstGenerator;
