const addEdges = require('../core/public/addEdges');
const addNodes = require('../core/public/addNodes');
const getNodes = require('../core/public/getNodes');

// const { getState } = require('../core/private/_state');

describe('core.public.getNodes', () => {
  test('exports', () => {
    expect(getNodes).toMatchSnapshot();
  });
  test('Gets edges', () => {
    addNodes([{ nodeID: 1 }, { nodeID: 2 }]);
    addEdges([{ source: { nodeID: 1 }, target: { nodeID: 2 } }]);
    expect(getNodes()).toMatchSnapshot();
    // expect(state).toMatchSnapshot();
  });
});
