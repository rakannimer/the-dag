const All = require('../');

describe('the-dag packaged correctly ', () => {
  test('exports TheDAG and TheDAGFactory', () => {
    expect(All).toMatchSnapshot();
  });
});
