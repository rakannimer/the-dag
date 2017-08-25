jest.mock('uuid/v4', () => {
  return () => 'FAKE_UUID_V4';
});
