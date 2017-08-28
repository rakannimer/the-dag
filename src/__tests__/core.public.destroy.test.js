const addEdges = require('../core/public/addEdges');
const addNodes = require('../core/public/addNodes');
const destroy = require('../core/public/destroy');

const getStateManipulators = require('../core/private/_getStateManipulators');

// const { getState } = require('../core/private/_state');
describe('core.public.destroy', () => {
  beforeAll(() => {
    getStateManipulators().setState(graph => {
      graph.nodes = {};
      graph.edges = {};
      return graph;
    });
  });
  test('exports', () => {
    expect(destroy).toMatchSnapshot();
  });
  test('Destroys nodes and edges', () => {
    const stateHandlers = getStateManipulators();
    addNodes([{ nodeID: 1 }, { nodeID: 2 }], stateHandlers);
    addEdges([{ source: { nodeID: 1 }, target: { nodeID: 2 } }], stateHandlers);
    expect(stateHandlers.getState()).toMatchSnapshot();
    destroy();
    const state = stateHandlers.getState();
    expect(Object.keys(state.nodes).length).toBe(0);
    expect(Object.keys(state.edges).length).toBe(0);
  });
});
