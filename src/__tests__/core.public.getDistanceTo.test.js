const addEdges = require('../core/public/addEdges');
const addNodes = require('../core/public/addNodes');
const getStateManipulators = require('../core/private/_getStateManipulators');

const createTestGraph = () => {
  const stateManipulators = getStateManipulators();
  addNodes(
    [
      { nodeID: 1, data: { some: 'data' } },
      { nodeID: 2, data: { some: 'otherData' } },
      { nodeID: 3, data: {} },
      { nodeID: 4, data: {} },
      { nodeID: 5, data: {} },
      { nodeID: 6, data: {} },
      { nodeID: 7, data: {} },
      { nodeID: 8, data: {} }
    ],
    stateManipulators
  );

  addEdges(
    [
      { source: 1, target: 3 },
      { source: 1, target: 4 },
      { source: 3, target: 5 },
      { source: 3, target: 6 },
      { source: 4, target: 2 },
      { source: 4, target: 7 },
      { source: 5, target: 8 }
    ],
    stateManipulators
  );
  return stateManipulators.getState();
};

const getDistanceTo = require('../core/public/getDistanceTo');

describe('core.public.getDistanceTo', () => {
  beforeAll(() => {
    createTestGraph();
  });
  test('exports', () => {
    expect(getDistanceTo).toMatchSnapshot();
  });
  test('get correct distance', () => {
    const expectedDistance = 2;
    expect(
      getDistanceTo({
        sourceNodeID: 1,
        targetNodeID: 2
      })
    ).toEqual(expectedDistance);
  });
});
