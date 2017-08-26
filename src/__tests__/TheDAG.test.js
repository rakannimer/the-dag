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

  test('public methods', () => {
    const getStateManipulators = require('../core/private/_getStateManipulators');
    const aDAG = new TheDAG(getStateManipulators());

    /* import graph from any different format */
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
    aDAG.destroy();
    /* Create simple graph */
    createTestGraph(aDAG, 'simple');
    expect(aDAG.toJS()).toMatchSnapshot('Create simple graph');

    /* Check if node exists */
    expect(aDAG.nodeExists(1)).toBe(true);
    expect(aDAG.nodeExists({ nodeID: 1 })).toBe(true);

    /* Get edge ID */
    expect(aDAG.getEdgeID({ source: 1, target: 2 })).toBe('1_2');
    expect(
      aDAG.getEdgeID({ source: { nodeID: 1 }, target: { nodeID: 2 } })
    ).toBe('1_2');

    /* Destroy graph */
    aDAG.destroy();
    const nodeIDs = Object.keys(aDAG.toJS().nodes);
    expect(nodeIDs.length).toBe(0);
    const edgeIDs = Object.keys(aDAG.toJS().edges);
    expect(edgeIDs.length).toBe(0);

    /* Create lessSimple graph */
    createTestGraph(aDAG, 'lessSimple');
    expect(aDAG.toJS()).toMatchSnapshot('Create lessSimple graph');

    /* Get distance or number of hops required to go from one node to another */
    const distanceFromNodeOneToNodeTwo = aDAG.getDistanceTo({
      sourceNodeID: 1,
      targetNodeID: 2
    });
    expect(distanceFromNodeOneToNodeTwo).toBe(2);

    /* Get edge by source and target ids */
    const edgeFromOneToThree = aDAG.getEdge({
      source: 1,
      target: 3
    });
    expect(edgeFromOneToThree).toMatchSnapshot(
      'Get edge by source and target ids'
    );

    /* Get edge by source and target nodes */
    const edgeFromOneToThreeUsingNodes = aDAG.getEdge({
      source: { nodeID: 1, nodeData: {} },
      target: { nodeID: 3, nodeData: {} }
    });
    expect(edgeFromOneToThree).toEqual(edgeFromOneToThreeUsingNodes);

    /* Get all DAG edges */
    const allDAGEdges = aDAG.getEdges();
    expect(allDAGEdges).toMatchSnapshot('Get all DAG edges');

    /* Get all DAG nodes */
    const allDAGNodes = aDAG.getNodes();
    expect(allDAGNodes).toMatchSnapshot('Get all DAG nodes');

    /* Get node by id */
    const nodeOne = aDAG.getNode({
      nodeID: 1,
      nodeData: {}
    });
    expect(nodeOne).toMatchSnapshot('Get node by id');

    /* Get nodes by relative distance */
    const nodesTwoHopsAway = aDAG.getNodesByDistanceTo({
      sourceNodeID: 1,
      hops: 2
    });
    expect(nodesTwoHopsAway).toMatchSnapshot('Get nodes by relative distance');

    /* Check for acyclicity and get topologically sorted array */
    const { isAcyclic, topologicallySortedNodeIDs } = aDAG.isAcyclic();
    expect({ isAcyclic, topologicallySortedNodeIDs }).toMatchSnapshot(
      'Check for acyclicity and get topologically sorted array'
    );

    /* Traverse the graph breadth first synchronously */
    const visitNode = jest.fn();
    const syncTraversalResult = aDAG.traverseBreadthFirst({
      startingNodeID: 1,
      visitNode
    });
    expect(syncTraversalResult).toMatchSnapshot(
      'Traverse the graph breadth first synchronously'
    );
    expect(visitNode.mock.calls).toMatchSnapshot(
      'Traverse the graph breadth first synchronously visitNode calls'
    );

    /* Traverse the graph breadth first using generators */
    const nodeIterator = aDAG.traverseBreadthFirstGenerator({
      startingNodeID: 1
    });
    let currentNode = nodeIterator.next();
    let orderedNodes = [];
    while (!currentNode.done) {
      orderedNodes.push(currentNode.value);
      currentNode = nodeIterator.next();
    }
    expect(orderedNodes).toEqual(syncTraversalResult);

    /* Traverse the graph depth first using generators */
    const TDF = () => {
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
    };
    TDF();
  });
});
