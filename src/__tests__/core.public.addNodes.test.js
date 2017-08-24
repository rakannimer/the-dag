const addNodes = require('../core/public/addNodes');
const { getState } = require('../core/private/_state');
describe('core.public.addNodes', () => {
  test('exports', () => {
    expect(addNodes).toMatchSnapshot();
  });
  test('Adds Single Node', () => {
    const node = { nodeID: 1, data: { some: 'data' } };
    addNodes([node]);
    expect(getState()).toMatchSnapshot();
  });

  test('Adds Two Nodes', () => {
    const sourceNode = { nodeID: 1, data: { some: 'data' } };
    const targetNode = { nodeID: 2, data: { some: 'otherData' } };
    addNodes([sourceNode, targetNode]);
    expect(getState()).toMatchSnapshot();
  });
  test('Fails silently with no arguments', () => {
    addNodes();
    const state = getState();
    expect(state).toMatchSnapshot();
  });
});
