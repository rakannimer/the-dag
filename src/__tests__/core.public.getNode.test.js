const addEdges = require('../core/public/addEdges');
const addNodes = require('../core/public/addNodes');
const getNode = require('../core/public/getNode');

describe('core.public.getNode', () => {
  test('exports', () => {
    expect(getNode).toMatchSnapshot();
  });
  test('Gets node', () => {
    addNodes([{ nodeID: 1 }, { nodeID: 2 }]);
    addEdges([{ source: { nodeID: 1 }, target: { nodeID: 2 } }]);
    expect(getNode({ nodeID: 1 })).toMatchSnapshot();
  });
});
