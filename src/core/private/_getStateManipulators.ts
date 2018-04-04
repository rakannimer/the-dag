import { GraphStateManipulators } from "../../types";
import { defaultStateManipulators } from "./_state";

const getStateManipulators = (
  stateManipulators?: GraphStateManipulators
): GraphStateManipulators => {
  return stateManipulators ? stateManipulators : defaultStateManipulators;
};

export default getStateManipulators;
export { getStateManipulators };
