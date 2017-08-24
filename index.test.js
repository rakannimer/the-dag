const TheDAG = require('./src/');

const createTestGraph = () => {
  const DAG = new TheDAG();
  DAG.addNodes([
    { nodeID: 1, data: { some: 'data' } },
    { nodeID: 2, data: { some: 'otherData' } },
    { nodeID: 3, data: {} },
    { nodeID: 4, data: {} },
    { nodeID: 5, data: {} },
    { nodeID: 6, data: {} },
    { nodeID: 7, data: {} },
    { nodeID: 8, data: {} }
  ]);

  DAG.addEdges([
    { source: 1, target: 3 },
    { source: 1, target: 4 },
    { source: 3, target: 5 },
    { source: 3, target: 6 },
    { source: 4, target: 2 },
    { source: 4, target: 7 },
    { source: 5, target: 8 }
  ]);
  return DAG;
};

let DirectedGraph;
describe('TheDAG', () => {
  test('nothing', () => {});
  // beforeEach(() => {
  //   DirectedGraph = new TheDAG();
  // });
  // afterEach(() => {
  //   DirectedGraph.destroy();
  // });
  // test('Adds Single Node', () => {
  //   const node = { nodeID: 1, data: { some: 'data' } };
  //   DirectedGraph.addNodes([node]);
  //   expect(DirectedGraph.getNodes()).toMatchSnapshot();
  // });
  // test('Adds Two Nodes', () => {
  //   const sourceNode = { nodeID: 1, data: { some: 'data' } };
  //   const targetNode = { nodeID: 2, data: { some: 'otherData' } };
  //   DirectedGraph.addNodes([sourceNode, targetNode]);
  //   expect(DirectedGraph.getNodes()).toMatchSnapshot();
  // });
  // test('Adds edge between new two nodes', () => {
  //   const sourceNode = { nodeID: 1, data: { some: 'data' } };
  //   const targetNode = { nodeID: 2, data: { some: 'otherData' } };
  //   DirectedGraph.addNodes([sourceNode, targetNode]);
  //   DirectedGraph.addEdges([{ source: 1, target: 2 }]);
  //   expect(DirectedGraph.getNodes()).toMatchSnapshot();
  //   expect(DirectedGraph.getEdges()).toMatchSnapshot();
  // });
  // test('Can get edge by source and target nodes', () => {
  //   const sourceNode = { nodeID: 1, data: { some: 'data' } };
  //   const targetNode = { nodeID: 2, data: { some: 'otherData' } };
  //   DirectedGraph.addNodes([sourceNode, targetNode]);
  //   DirectedGraph.addEdges([{ source: 1, target: 2 }]);
  //   const edge = DirectedGraph.getEdge({
  //     source: sourceNode,
  //     target: targetNode
  //   });
  //   expect(edge).toMatchSnapshot();
  // });
  // test('isTraversable', () => {
  //   const DAG = createTestGraph();
  //   let orderedNodeIDs = DAG.traverseBreadthFirst({
  //     startingNodeID: 1
  //   });
  //   expect(orderedNodeIDs).toMatchSnapshot();
  // });
  // test('Is Traversable (with generators)', () => {
  //   const DAG = createTestGraph();
  //   const orderedNodeIDs = [];
  //   const traverse = DAG.traverseBreadthFirstGenerator({
  //     startingNodeID: 1
  //   });
  //   let traversalResult = traverse.next();
  //   while (!traversalResult.done) {
  //     orderedNodeIDs.push(traversalResult.value);
  //     traversalResult = traverse.next();
  //   }
  //   expect(orderedNodeIDs).toEqual(
  //     DAG.traverseBreadthFirst({
  //       startingNodeID: 1
  //     })
  //   );
  // });
  // test('can get distance between 2 nodes ', () => {
  //   const DAG = createTestGraph();
  //   const sourceNodeID = 1;
  //   const targetNodeID = 2;
  //   const numberOfHopsToTarget = DAG.getDistanceTo({
  //     sourceNodeID,
  //     targetNodeID
  //   });
  //   expect(numberOfHopsToTarget).toEqual(2);
  // });
  // test('can get nodes by distance to source', () => {
  //   const DAG = createTestGraph();
  //   const sourceNodeID = 1;
  //   const nodesTwoHopsAway = DAG.getNodesByDistanceTo({
  //     sourceNodeID,
  //     hops: 2
  //   });
  //   expect(nodesTwoHopsAway).toMatchSnapshot();
  // });
  // test('can test for acyclicity', () => {
  //   // const DAG = createTestGraph();
  //   const DAG = new TheDAG();
  //   DAG.addNodes([
  //     { nodeID: 1, data: { some: 'data' } },
  //     { nodeID: 2, data: { some: 'otherData' } },
  //     { nodeID: 3, data: {} },
  //     { nodeID: 4, data: {} },
  //     { nodeID: 5, data: {} },
  //     { nodeID: 6, data: {} },
  //     { nodeID: 7, data: {} },
  //     { nodeID: 8, data: {} }
  //   ]);
  //   DAG.addEdges([
  //     { source: 1, target: 3 },
  //     { source: 3, target: 1 },
  //     { source: 1, target: 4 },
  //     { source: 3, target: 5 },
  //     { source: 3, target: 6 },
  //     { source: 4, target: 2 },
  //     { source: 4, target: 7 },
  //     { source: 5, target: 8 }
  //   ]);
  //   const isAcyclic = DAG.isAcyclic();
  //   expect(isAcyclic).toMatchSnapshot();
  // });
  // test('If it is acyclic then it returns topologically sorted node IDs', () => {
  //   const DAG = createTestGraph();
  //   const { isAcyclic, topologicallySortedNodeIDs } = DAG.isAcyclic();
  //   expect({ isAcyclic, topologicallySortedNodeIDs }).toMatchSnapshot();
  // });
});
