const addEdges = require('../core/public/addEdges');
const addNodes = require('../core/public/addNodes');
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
    { source: 4, target: 3 },
    { source: 4, target: 7 },
    { source: 5, target: 8 }
  ]);
  return getState();
};

const traverseBreadthFirst = require('../core/public/traverseBreadthFirst');

describe('core.public.traverseBreadthFirst', () => {
  beforeAll(() => {
    setState(graph => {
      graph.nodes = {};
      graph.edges = {};
      return graph;
    });
    createTestGraph();
  });
  test('exports', () => {
    expect(traverseBreadthFirst).toMatchSnapshot();
  });
  test('traverseBreadthFirst', () => {
    const orderedNodes = traverseBreadthFirst({
      startingNodeID: 1
    });
    expect(orderedNodes).toMatchSnapshot();
    // const expectedDistance = 2;
    // expect(

    // ).toMatchSnapshot();
  });
});
