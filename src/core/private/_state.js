const createStateManipulators = () => {
  let state = {
    nodes: {},
    edges: {}
  };
  // const initState = initialState => {
  //   state = initialState;
  // };
  const getState = () => {
    return state;
  };

  const setState = stateMutator => {
    stateMutator(state);
  };
  return {
    state,
    // initState,
    getState,
    setState
  };
};

const {
  // initState,
  getState,
  setState
} = createStateManipulators();

export { getState, setState, createStateManipulators };
export default {
  getState,
  setState,
  createStateManipulators
};
