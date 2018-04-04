import { privateMethods } from "../private/";
const { getStateManipulators } = privateMethods;

export const destroy = (stateManipulators?: any) => {
  const { setState } = getStateManipulators(stateManipulators);
  setState(state => {
    state.nodes = {};
    state.edges = {};
    return state;
  });
};

export default destroy;
