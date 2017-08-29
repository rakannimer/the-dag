# TheDAG

[![CircleCI](https://circleci.com/gh/RakanNimer/the-dag.svg?style=shield&circle-token=0341fbc880e92e058fca0301fd532660039338c6)](https://circleci.com/gh/RakanNimer/the-dag)
[![codecov](https://codecov.io/gh/RakanNimer/the-dag/branch/master/graph/badge.svg)](https://codecov.io/gh/RakanNimer/the-dag)

## What is it ?

A well-tested data structure to represent data as Directed Unweighted ( for now) Graphs.

## Why not cal it TheDUG then ? 

Because its aimed for use cases where the graph is acyclic.

Adding weights support to edges and the corresponding traversal and utility methods is something I will add when I need it or when someone is kind enough to submit a PR for it.



## Installation

```
yarn add the-dag
```

Or from unpkg : 

```html
  <script src="https://unpkg.com/the-dag@latest/umd/TheDAG.js"></script>
  <script>
    const myDAG = new TheDAG();
  </script>
```


## [Full API documentation](https://rakannimer.github.io/the-dag/TheDAG.html)

## Usage

### Instantiate a DAG
<details open>
  <summary>constructor</summary>

```javascript
const TheDAG = require('the-dag');
const aDAG = new TheDAG(); // You can optionally pass in your own state read/writer
```
</details>


### Create a simple graph 
<details open>
  <summary>addNodes & addEdges ( simple )</summary>

```javascript
aDAG.addNodes([{ nodeID: 1 }, { nodeID: 2 }]);
aDAG.addEdges([{ source: { nodeID: 1 }, target: { nodeID: 2 } }]);
```
</details>

### Destroy graph
<details open>
  <summary>destroy</summary>

```javascript
aDAG.destroy();
const nodeIDs = Object.keys(aDAG.toJS().nodes);
// expect(nodeIDs.length).toBe(0);
const edgeIDs = Object.keys(aDAG.toJS().edges);
// expect(edgeIDs.length).toBe(0);
```
</details>



### Create aCyclic graph
<details open>
  <summary>addNodes & addEdges</summary>

```javascript
aDAG.addNodes([
  { nodeID: 1, data: { some: 'data' } },
  { nodeID: 2, data: { someOther: 'Data' } },
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

```
</details>

### Get distance from one node to another
<details open>
  <summary>getDistanceTo</summary>

```javascript
/* Get distance or number of hops required to go from one node to another */
const distanceFromNodeOneToNodeTwo = aDAG.getDistanceTo({
  sourceNodeID: 1,
  targetNodeID: 2
});

// expect(distanceFromNodeOneToNodeTwo).toBe(2);
```
</details>


### API
<details open>
  <summary>API Usage Demo</summary>

```javascript


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


/* Check if node exists */
expect(aDAG.nodeExists(1)).toBe(true);
expect(aDAG.nodeExists({ nodeID: 1 })).toBe(true);

/* Get edge ID */
expect(aDAG.getEdgeID({ source: 1, target: 2 })).toBe('1_2');
expect(
  aDAG.getEdgeID({ source: { nodeID: 1 }, target: { nodeID: 2 } })
).toBe('1_2');


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


```
</details>


Read [tests](/src/__tests__/) and [snapshots](/src/__tests__/__snapshots__/TheDAG.test.js.snap) for more usage information.
## Development

```sh
git clone https://github.com/rakannimer/the-dag
cd the-dag && yarn install
yarn test ## To make sure everything is setup correctly
```
## License

[MIT](/LICENSE)