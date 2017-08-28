const addEdges = require('../core/public/addEdges');
const addNodes = require('../core/public/addNodes');
const importGraph = require('../core/public/importGraph');

const getStateManipulators = require('../core/private/_getStateManipulators');
const { getState } = require('../core/private/_state');

describe('core.public.importGraph', () => {
  beforeAll(() => {
    getStateManipulators().setState(graph => {
      graph.nodes = {};
      graph.edges = {};
      return graph;
    });
  });
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

  test('importGraph works without reducers in right format', () => {
    const stateHandlers = getStateManipulators();
    const inputGraphWithDifferentFormat = {
      nodes: [
        { nodeID: 1 },
        { nodeID: 2 },
        { nodeID: 3 },
        { nodeID: 4 },
        { nodeID: 5 }
      ],
      edges: [
        { source: 1, target: 2 },
        { source: 2, target: 3 },
        { source: 2, target: 4 }
      ]
    };
    const graphReducers = {};
    importGraph(
      Object.assign({}, inputGraphWithDifferentFormat, graphReducers)
    );
    expect(stateHandlers.getState()).toMatchSnapshot();
  });
});
