const addEdges = require('../core/public/addEdges');
const addNodes = require('../core/public/addNodes');
const destroy = require('../core/public/destroy');

const { getState } = require('../core/private/_state');
describe('core.public.destroy', () => {
  test('exports', () => {
    expect(destroy).toMatchSnapshot();
  });
  test('Destroys nodes and edges', () => {
    addNodes([{ nodeID: 1 }, { nodeID: 2 }]);
    addEdges([{ source: { nodeID: 1 }, target: { nodeID: 2 } }]);
    expect(getState()).toMatchSnapshot();

    destroy();

    const state = getState();
    expect(Object.keys(state.nodes).length).toBe(0);
    expect(Object.keys(state.edges).length).toBe(0);
    // expect(state).toMatchSnapshot();
  });
});
