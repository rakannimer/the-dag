const addEdges = require('../core/public/addEdges');
const addNodes = require('../core/public/addNodes');
const importGraph = require('../core/public/importGraph');

const getStateManipulators = require('../core/private/_getStateManipulators');
const { getState } = require('../core/private/_state');

describe('core.public.importGraph', () => {
  test('exports', () => {
    expect(importGraph).toMatchSnapshot();
  });
  test('importGraph works with right arguments', () => {
    const stateHandlers = getStateManipulators();
    const inputGraphWithDifferentFormat = {
      nodes: [1, 2, 3, 4, 5],
      edges: [
        { source: 1, target: 2 },
        { source: 2, target: 3 },
        { source: 2, target: 4 }
      ]
    };
    const graphReducers = {
      nodeIDGenerator: node => node,
      edgeSourceIDGenerator: edge => edge.source,
      edgeTargetIDGenerator: edge => edge.target
    };
    importGraph(
      Object.assign({}, inputGraphWithDifferentFormat, graphReducers)
    );
    expect(stateHandlers.getState()).toMatchSnapshot();
  });
  // test('addEdges works when source and target exist in state', () => {
  //   const stateHandlers = getStateManipulators();
  //   addNodes([{ nodeID: 1 }, { nodeID: 2 }], stateHandlers);
  //   addEdges([{ source: { nodeID: 1 }, target: { nodeID: 2 } }], stateHandlers);
  //   const state = stateHandlers.getState();
  //   expect(state).toMatchSnapshot();
  // });

  // test('Fails silently with no arguments', () => {
  //   addEdges();
  //   const state = getState();
  //   expect(state).toMatchSnapshot();
  // });

  // test('Works with custom state handlers passed down to it', () => {
  //   const stateHandlers = getStateManipulators();
  //   addNodes([{ nodeID: 1 }, { nodeID: 2 }], stateHandlers);
  //   // let state = stateHandlers.getState();
  //   addEdges([{ source: { nodeID: 1 }, target: { nodeID: 2 } }], stateHandlers);
  //   let state = stateHandlers.getState();
  //   expect(state).toMatchSnapshot();
  // });

  // test('Returns silently when an edge already exists', () => {
  //   const stateHandlers = getStateManipulators();
  //   addNodes([{ nodeID: 1 }, { nodeID: 2 }], stateHandlers);
  //   addEdges([{ source: { nodeID: 1 }, target: { nodeID: 2 } }], stateHandlers);
  //   addEdges([{ source: { nodeID: 1 }, target: { nodeID: 2 } }], stateHandlers);
  //   const state = stateHandlers.getState();
  //   expect(state).toMatchSnapshot();
  // });
});
