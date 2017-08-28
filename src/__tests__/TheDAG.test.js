const TheDAG = require('../');

const createTestGraph = (aDAG, type) => {
  switch (type) {
    case 'simple': {
      aDAG.addNodes([{ nodeID: 1 }, { nodeID: 2 }]);
      aDAG.addEdges([{ source: { nodeID: 1 }, target: { nodeID: 2 } }]);
      return;
    }
    case 'lessSimple': {
      aDAG.addNodes([
        { nodeID: 1, data: { some: 'data' } },
        { nodeID: 2, data: { some: 'otherData' } },
        { nodeID: 3, data: {} },
        { nodeID: 4, data: {} },
        { nodeID: 5, data: {} },
        { nodeID: 6, data: {} },
        { nodeID: 7, data: {} },
        { nodeID: 8, data: {} }
      ]);

      aDAG.addEdges([
        { source: 1, target: 3 },
        { source: 1, target: 4 },
        { source: 3, target: 5 },
        { source: 3, target: 6 },
        { source: 4, target: 2 },
        { source: 4, target: 7 },
        { source: 5, target: 8 }
      ]);
      return;
    }
    default:
      return;
  }
};

describe('TheDAG', () => {
  test('exports', () => {
    expect(TheDAG).toMatchSnapshot();
  });
  test('is instantiatable', () => {
    const getStateManipulators = require('../core/private/_getStateManipulators');
    const aDAG = new TheDAG(getStateManipulators());
    expect(aDAG).toMatchSnapshot();
  });

  test('import graph from any different format', () => {
    const aDAG = new TheDAG();
    const inputGraphWithDifferentFormat = {
      nodes: [1, 2, 3, 4, 5],
      edges: [
        { source: 1, target: 2 },
        { source: 2, target: 3 },
        { source: 2, target: 4 }
      ]
    };
    const graphReducers = {
      nodeIDGenerator: node => node,
      edgeSourceIDGenerator: edge => edge.source,
      edgeTargetIDGenerator: edge => edge.target
    };
    aDAG.importGraph(
      Object.assign({}, inputGraphWithDifferentFormat, graphReducers)
    );
    expect(aDAG.toJS()).toMatchSnapshot(
      'import graph from any different format'
    );
  });

  test('Create simple graph ', () => {
    const aDAG = new TheDAG();
    createTestGraph(aDAG, 'simple');
    expect(aDAG.toJS()).toMatchSnapshot();
    expect(aDAG.nodeExists(1)).toBe(true);
    expect(aDAG.nodeExists({ nodeID: 1 })).toBe(true);
  });

  test('Can get edgeID by loose source and target objects', () => {
    const aDAG = new TheDAG();
    createTestGraph(aDAG, 'simple');
    expect(aDAG.getEdgeID({ source: 1, target: 2 })).toBe('1_2');
    expect(
      aDAG.getEdgeID({ source: { nodeID: 1 }, target: { nodeID: 2 } })
    ).toBe('1_2');
  });

  test('can destroy graph nodes and edges', () => {
    const aDAG = new TheDAG();
    createTestGraph(aDAG, 'simple');
    aDAG.destroy();
    const nodeIDs = Object.keys(aDAG.toJS().nodes);
    expect(nodeIDs.length).toBe(0);
    const edgeIDs = Object.keys(aDAG.toJS().edges);
    expect(edgeIDs.length).toBe(0);
  });

  test('can create less simple graph', () => {
    const aDAG = new TheDAG();
    createTestGraph(aDAG, 'lessSimple');
    expect(aDAG.toJS()).toMatchSnapshot();
  });
  test('Get distance or number of hops required to go from one node to another', () => {
    const aDAG = new TheDAG();
    createTestGraph(aDAG, 'lessSimple');
    const distanceFromNodeOneToNodeTwo = aDAG.getDistanceTo({
      sourceNodeID: 1,
      targetNodeID: 2
    });
    expect(distanceFromNodeOneToNodeTwo).toBe(2);
  });
  test('Get edge by loose source and target ', () => {
    const aDAG = new TheDAG();
    createTestGraph(aDAG, 'lessSimple');
    const edgeFromOneToThree = aDAG.getEdge({
      source: 1,
      target: 3
    });
    expect({ edgeFromOneToThree }).toMatchSnapshot();
    const edgeFromOneToThreeUsingNodes = aDAG.getEdge({
      source: { nodeID: 1, nodeData: {} },
      target: { nodeID: 3, nodeData: {} }
    });
    expect(edgeFromOneToThree).toEqual(edgeFromOneToThreeUsingNodes);
  });
  test('Get all DAG edges', () => {
    const aDAG = new TheDAG();
    createTestGraph(aDAG, 'lessSimple');
    const allDAGEdges = aDAG.getEdges();
    expect(allDAGEdges).toMatchSnapshot();
  });
  test('Get all DAG nodes', () => {
    const aDAG = new TheDAG();
    createTestGraph(aDAG, 'lessSimple');
    const allDAGNodes = aDAG.getNodes();
    expect(allDAGNodes).toMatchSnapshot('Get all DAG nodes');
  });
  test('Get node by id', () => {
    const aDAG = new TheDAG();
    createTestGraph(aDAG, 'lessSimple');
    const nodeOne = aDAG.getNode({
      nodeID: 1,
      nodeData: {}
    });
    expect(nodeOne).toMatchSnapshot('Get node by id');
  });
  test('Traverse the graph breadth first', () => {
    const aDAG = new TheDAG();
    createTestGraph(aDAG, 'lessSimple');
    const nodeIterator = aDAG.traverseBreadthFirstGenerator({
      startingNodeID: 1
    });
    let currentNode = nodeIterator.next();
    let orderedNodes = [];
    while (!currentNode.done) {
      orderedNodes.push(currentNode.value);
      currentNode = nodeIterator.next();
    }
    const visitNode = jest.fn();
    const syncTraversalResult = aDAG.traverseBreadthFirst({
      startingNodeID: 1,
      visitNode
    });
    expect(syncTraversalResult).toMatchSnapshot();
    expect(visitNode.mock.calls).toMatchSnapshot();
    expect(orderedNodes).toEqual(syncTraversalResult);
  });
  test('Get nodes by relative distance', () => {
    const aDAG = new TheDAG();
    createTestGraph(aDAG, 'lessSimple');
    const nodesTwoHopsAway = aDAG.getNodesByDistanceTo({
      sourceNodeID: 1,
      hops: 2
    });
    expect(nodesTwoHopsAway).toMatchSnapshot();
  });
  test('Check for acyclicity and get topologically sorted array', () => {
    const aDAG = new TheDAG();
    createTestGraph(aDAG, 'lessSimple');
    const { isAcyclic, topologicallySortedNodeIDs } = aDAG.isAcyclic();
    expect({ isAcyclic, topologicallySortedNodeIDs }).toMatchSnapshot();
  });

  test('Traverse the graph depth first using generators', () => {
    const aDAG = new TheDAG();
    createTestGraph(aDAG, 'lessSimple');
    const nodeIterator = aDAG.traverseDepthFirstGenerator({
      startingNodeID: 1
    });
    let currentNode = nodeIterator.next();
    let orderedNodes = [];
    while (!currentNode.done) {
      orderedNodes.push(currentNode.value);
      currentNode = nodeIterator.next();
    }
    expect(orderedNodes).toMatchSnapshot();
  });
  test('Traverse the graph however u want', () => {
    const aDAG = new TheDAG();
    createTestGraph(aDAG, 'lessSimple');
    const nodeIterator = aDAG.traverseDynamicPathGenerator({
      startingNodeID: 1
    });
    let currentNode = nodeIterator.next();
    // console.warn(currentNode);
    let nextNode = nodeIterator.next(
      currentNode.value.visitedNode.possibleTargets[0]
    );
    expect(nextNode).toMatchSnapshot();
    nextNode = nodeIterator.next(nextNode.value.visitedNode.possibleTargets[0]);
    expect(nextNode).toMatchSnapshot();
  });
  test('public methods', () => {
    //   /* Traverse the graph however u want */
    //   const TDP = () => {
    //     const nodeIterator = aDAG.traverseDynamicPathGenerator({
    //       startingNodeID: 1
    //     });
    //     let currentNode = nodeIterator.next();
    //     // console.warn(currentNode);
    //     let nextNode = nodeIterator.next(
    //       currentNode.value.visitedNode.possibleTargets[0]
    //     );
    //     expect(nextNode).toMatchSnapshot();
    //     nextNode = nodeIterator.next(
    //       nextNode.value.visitedNode.possibleTargets[0]
    //     );
    //     expect(nextNode).toMatchSnapshot();
    //   };
    //   TDP();
  });
});
