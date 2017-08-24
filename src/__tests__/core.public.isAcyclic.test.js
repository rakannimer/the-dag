const addEdges = require('../core/public/addEdges');
const addNodes = require('../core/public/addNodes');
const destroy = require('../core/public/destroy');
const { getState, setState } = require('../core/private/_state');

const createTestGraph = () => {
  addNodes([
    { nodeID: 1, data: { some: 'data' } },
    { nodeID: 2, data: { some: 'otherData' } },
    { nodeID: 3, data: {} },
    { nodeID: 4, data: {} },
    { nodeID: 5, data: {} },
    { nodeID: 6, data: {} },
    { nodeID: 7, data: {} },
    { nodeID: 8, data: {} }
  ]);

  addEdges([
    { source: 1, target: 3 },
    { source: 1, target: 4 },
    { source: 3, target: 5 },
    { source: 3, target: 6 },
    { source: 4, target: 2 },
    { source: 4, target: 7 },
    { source: 5, target: 8 }
  ]);
  return getState();
};

const createCyclicGraph = () => {
  addNodes([
    { nodeID: 1, data: { some: 'data' } },
    { nodeID: 2, data: { some: 'otherData' } },
    { nodeID: 3, data: {} },
    { nodeID: 4, data: {} },
    { nodeID: 5, data: {} },
    { nodeID: 6, data: {} },
    { nodeID: 7, data: {} },
    { nodeID: 8, data: {} }
  ]);

  addEdges([
    { source: 1, target: 3 },
    { source: 3, target: 1 },
    { source: 1, target: 4 },
    { source: 3, target: 5 },
    { source: 3, target: 6 },
    { source: 4, target: 2 },
    { source: 4, target: 7 },
    { source: 5, target: 8 }
  ]);
  return getState();
};

const isAcyclic = require('../core/public/isAcyclic');

describe('core.public.isAcyclic', () => {
  beforeAll(() => {
    createTestGraph();
  });
  test('exports', () => {
    expect(isAcyclic).toMatchSnapshot();
  });
  test('can test for acyclicity & return topologically sorted node IDs', () => {
    const isAcyclicResult = isAcyclic();
    expect(isAcyclicResult).toMatchSnapshot();
  });
  test('If it is cyclic then it returns the circular dependency', () => {
    destroy();
    createCyclicGraph();
    const isAcyclicResult = isAcyclic();
    expect(isAcyclicResult).toMatchSnapshot();
  });

  test('it also handles different errors if somehow state is messed up', () => {
    destroy();
    setState(state => {
      state.edges['a'] = { s: 's' };
    });
    const isAcyclicResult = isAcyclic();
    expect(isAcyclicResult).toMatchSnapshot();
  });
});
