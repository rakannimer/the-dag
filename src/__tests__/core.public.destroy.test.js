import addEdges from '../core/public/addEdges';
import addNodes from '../core/public/addNodes';
import destroy from '../core/public/destroy';

import getStateManipulators from '../core/private/_getStateManipulators';

// const { getState } = require('../core/private/_state');
describe('core.public.destroy', () => {
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
