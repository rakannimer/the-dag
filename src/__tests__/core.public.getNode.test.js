import addEdges from '../core/public/addEdges';
import addNodes from '../core/public/addNodes';
import getNode from '../core/public/getNode';

import createNode from '../core/private/_createNode';

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
    const node = createNode({ data: {} });
    expect(node).toMatchSnapshot();
  });
});
