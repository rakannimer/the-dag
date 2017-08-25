const addEdges = require('../core/public/addEdges');
const addNodes = require('../core/public/addNodes');
const getNode = require('../core/public/getNode');
const _createNode = require('../core/private/_createNode');

describe('core.public.getNode', () => {
  test('exports', () => {
    expect(getNode).toMatchSnapshot();
  });
  test('Gets node', () => {
    addNodes([{ nodeID: 1 }, { nodeID: 2 }]);
    addEdges([{ source: { nodeID: 1 }, target: { nodeID: 2 } }]);
    expect(getNode({ nodeID: 1 })).toMatchSnapshot();
  });
  test('Creates id for node if id not passed in private createNode', () => {
    const node = _createNode({ data: {} });
    expect(node).toMatchSnapshot();
  });
});
