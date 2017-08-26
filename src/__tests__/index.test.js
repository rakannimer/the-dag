import TheDAG from '../';

describe('the-dag packaged correctly ', () => {
  test('exports TheDAG', () => {
    expect(TheDAG).toMatchSnapshot();
  });
});
