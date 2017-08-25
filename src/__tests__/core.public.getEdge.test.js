const addEdges = require('../core/public/addEdges');
const addNodes = require('../core/public/addNodes');
const getEdge = require('../core/public/getEdge');

const getStateManipulators = require('../core/private/_getStateManipulators');
const { getState } = require('../core/private/_state');

describe('core.public.getEdge', () => {
  test('exports', () => {
    expect(getEdge).toMatchSnapshot();
  });
  test('gets edge by source and target objects', () => {
    const stateManipulators = getStateManipulators();
    addNodes([{ nodeID: 1 }, { nodeID: 2 }], stateManipulators);
    addEdges(
      [{ source: { nodeID: 1 }, target: { nodeID: 2 } }],
      stateManipulators
    );
    const edge = getEdge(
      { source: { nodeID: 1 }, target: { nodeID: 2 } },
      stateManipulators
    );
    expect(edge).toMatchSnapshot();
    const state = stateManipulators.getState();
    expect(state.edges).toMatchSnapshot();
  });
  test('gets edge by sourceID and targetID objects', () => {
    addNodes([{ nodeID: 1 }, { nodeID: 2 }]);
    addEdges([{ source: { nodeID: 1 }, target: { nodeID: 2 } }]);
    const edge = getEdge({ source: 1, target: 2 });
    expect(edge).toMatchSnapshot();
    const state = getState();
    expect(state.edges).toMatchSnapshot();
  });
});
