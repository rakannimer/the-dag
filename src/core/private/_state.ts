import {
  GraphState,
  GraphStateMutator,
  GraphStateManipulators
} from "../../types";

const createStateManipulators = () => {
  let state: GraphState = {
    nodes: {},
    edges: {}
  };
  const getState = () => {
    return state;
  };

  const setState = (stateMutator: GraphStateMutator) => {
    stateMutator(state);
  };

  return {
    state,
    getState,
    setState
  } as GraphStateManipulators;
};

const {
  // initState,
  getState,
  setState,
  state
} = createStateManipulators();

const defaultStateManipulators: GraphStateManipulators = {
  getState,
  setState,
  state
};
export {
  getState,
  setState,
  createStateManipulators,
  defaultStateManipulators
};
export default {
  getState,
  setState,
  createStateManipulators,
  defaultStateManipulators
};
