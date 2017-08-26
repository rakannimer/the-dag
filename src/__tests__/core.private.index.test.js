import All from '../core/private';

describe('Private methods', () => {
  test('export correctly', () => {
    expect(All).toMatchSnapshot();
  });
});
