import FIFO from "fifo";
import { GraphNode, GraphStateManipulators, TraverseArgs } from "../../types";
import { privateMethods } from "../private/";

const { getStateManipulators } = privateMethods;

export const traverseDepthFirstGenerator = function*(
  { startingNodeID, visitNode = () => null }: TraverseArgs,
  stateManipulators?: GraphStateManipulators
): any {
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
  return;
};

export default traverseDepthFirstGenerator;
