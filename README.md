# The last DAG you'll need

[![CircleCI](https://circleci.com/gh/RakanNimer/the-dag.svg?style=shield&circle-token=0341fbc880e92e058fca0301fd532660039338c6)](https://circleci.com/gh/RakanNimer/the-dag)

## Installation

```
yarn add the-dag
```

## Usage

```javascript

const { TheDAGFactory } = require('the-dag');

const state = { nodes: {}, edges: {} };

// Create a DAG instance
const myDag = TheDAGFactory.create(state)

// Add Nodes
myDag.addNodes([
  {
    nodeID: 1,
    nodeData: { some: 'data' } 
  },
  {
    nodeID: 2,
    nodeData: { some: 'other', data: ['of','any','type'] }
  },
])

// Add Edges by passing objects
myDag.addEdges([{ source: { nodeID: 1 }, target: { nodeID: 2 } }]);

// Or ids directly
myDag.addEdges([{ source: 1, target: 2 }]);

```


Read [tests](/src/__tests__/) for more detailed examples
