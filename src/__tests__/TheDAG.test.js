const { TheDAG } = require('../');

describe('TheDAG', () => {
  test('exports', () => {
    expect(TheDAG).toMatchSnapshot();
  });
  test('is instantiatable', () => {
    const aDAG = new TheDAG({ nodes: [], edges: [] });
    expect(aDAG).toMatchSnapshot();
  });
});
