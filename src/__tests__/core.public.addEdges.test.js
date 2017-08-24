const addEdges = require('../core/public/addEdges');
const addNodes = require('../core/public/addNodes');
const { getState } = require('../core/private/_state');
describe('core.public.addEdges', () => {
  test('exports', () => {
    expect(addEdges).toMatchSnapshot();
  });
  test('addEdges throws if source and/or target are not registered nodes in state', () => {
    try {
      addEdges([{ source: 1, target: 2 }]);
    } catch (err) {
      expect(err.message).toMatchSnapshot();
    }
  });
  test('addEdges works when source and target exist in state', () => {
    addNodes([{ nodeID: 1 }, { nodeID: 2 }]);
    addEdges([{ source: { nodeID: 1 }, target: { nodeID: 2 } }]);
    const state = getState();
    expect(state).toMatchSnapshot();
  });

  test('Fails silently with no arguments', () => {
    addEdges();
    const state = getState();
    expect(state).toMatchSnapshot();
  });

  test('Returns silently when an edge already exists', () => {
    addNodes([{ nodeID: 1 }, { nodeID: 2 }]);
    addEdges([{ source: { nodeID: 1 }, target: { nodeID: 2 } }]);
    addEdges([{ source: { nodeID: 1 }, target: { nodeID: 2 } }]);
    const state = getState();
    expect(state).toMatchSnapshot();
  });
});
