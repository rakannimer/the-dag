import addEdges from '../core/public/addEdges';
import addNodes from '../core/public/addNodes';
import getStateManipulators from '../core/private/_getStateManipulators';
const { getState } = require('../core/private/_state');
describe('core.public.addEdges', () => {
  test('exports', () => {
    expect(addEdges).toMatchSnapshot();
  });
  test('addEdges throws if source and/or target are not registered nodes in state', () => {
    const stateHandlers = getStateManipulators();
    try {
      addEdges([{ source: 1, target: 2 }], stateHandlers);
    } catch (err) {
      expect(err.message).toMatchSnapshot();
    }
    try {
      addEdges([{ target: 10, source: 2 }], stateHandlers);
    } catch (err) {
      expect(err.message).toMatchSnapshot();
    }
  });
  test('addEdges works when source and target exist in state', () => {
    const stateHandlers = getStateManipulators();
    addNodes([{ nodeID: 1 }, { nodeID: 2 }], stateHandlers);
    addEdges([{ source: { nodeID: 1 }, target: { nodeID: 2 } }], stateHandlers);
    const state = stateHandlers.getState();
    expect(state).toMatchSnapshot();
  });

  test('Fails silently with no arguments', () => {
    addEdges();
    const state = getState();
    expect(state).toMatchSnapshot();
  });

  test('Works with custom state handlers passed down to it', () => {
    const stateHandlers = getStateManipulators();
    addNodes([{ nodeID: 1 }, { nodeID: 2 }], stateHandlers);
    // let state = stateHandlers.getState();
    addEdges([{ source: { nodeID: 1 }, target: { nodeID: 2 } }], stateHandlers);
    let state = stateHandlers.getState();
    expect(state).toMatchSnapshot();
  });

  test('Returns silently when an edge already exists', () => {
    const stateHandlers = getStateManipulators();
    addNodes([{ nodeID: 1 }, { nodeID: 2 }], stateHandlers);
    addEdges([{ source: { nodeID: 1 }, target: { nodeID: 2 } }], stateHandlers);
    addEdges([{ source: { nodeID: 1 }, target: { nodeID: 2 } }], stateHandlers);
    const state = stateHandlers.getState();
    expect(state).toMatchSnapshot();
  });
});
