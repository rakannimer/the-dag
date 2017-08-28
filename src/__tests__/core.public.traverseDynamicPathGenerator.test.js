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

const traverseDynamicPathGenerator = require('../core/public/traverseDynamicPathGenerator');

describe('core.public.traverseDynamicPathGenerator', () => {
  beforeAll(() => {
    setState(graph => {
      graph.nodes = {};
      graph.edges = {};
      return graph;
    });
    createTestGraph();
  });
  test('exports', () => {
    expect(traverseDynamicPathGenerator).toMatchSnapshot();
  });
  test('traverseDynamicPathGenerator is traversable', () => {
    const nodeIterator = traverseDynamicPathGenerator({
      startingNodeID: 1
    });

    expect(nodeIterator.next()).toMatchSnapshot('FSM started');
    expect(nodeIterator.next(3)).toMatchSnapshot(
      'Custom traversal depending on the passed node id'
    );
    try {
      nodeIterator.next(10);
    } catch (err) {
      expect(err.message).toMatchSnapshot(
        'Throws when trying to go unconnected node'
      );
    }
  });
  test('', () => {
    const nodeIterator = traverseDynamicPathGenerator({
      startingNodeID: 1
    });
    nodeIterator.next();
    try {
      nodeIterator.next();
      throw new Error('this should be unreachable code');
    } catch (err) {
      expect(err.message).toMatchSnapshot(
        'Throws when no argument is provided to next'
      );
    }
  });
});
