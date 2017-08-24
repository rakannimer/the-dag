const addEdges = require('../core/public/addEdges');
const addNodes = require('../core/public/addNodes');
const getEdges = require('../core/public/getEdges');

// const { getState } = require('../core/private/_state');

describe('core.public.getEdges', () => {
  test('exports', () => {
    expect(getEdges).toMatchSnapshot();
  });
  test('Gets edges', () => {
    addNodes([{ nodeID: 1 }, { nodeID: 2 }]);
    addEdges([{ source: { nodeID: 1 }, target: { nodeID: 2 } }]);
    expect(getEdges()).toMatchSnapshot();
    // expect(state).toMatchSnapshot();
  });
});
