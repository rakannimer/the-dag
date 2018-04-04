import { GraphNode, GraphStateManipulators } from "../../types";
import { traverseBreadthFirstGenerator } from "./traverseBreadthFirstGenerator";

export const getNodesByDistanceTo = (
  { sourceNodeID, hops }: { sourceNodeID: string | number; hops: number },
  stateManipulators?: GraphStateManipulators
) => {
  const result = [];
  const traverse = traverseBreadthFirstGenerator(
    {
      startingNodeID: sourceNodeID
    },
    stateManipulators
  );
  //@ts-ignore
  let traversalResult = traverse.next();
  // console.warn(traversalResult.value);
  let reachedNextLevel = traversalResult.value.hops > hops;
  const isRightLevel = traversalResult.value.hops === hops;
  if (isRightLevel) {
    result.push(traversalResult.value);
  }
  while (!reachedNextLevel) {
    //@ts-ignore
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

export default getNodesByDistanceTo;
