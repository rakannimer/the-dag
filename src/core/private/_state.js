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

module.exports = {
  // initState,
  getState,
  setState,
  createStateManipulators
};
