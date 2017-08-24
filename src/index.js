const TheDAG = require('./TheDAG');
const TheDAGFactory = require('./TheDAGFactory');

module.exports = {
  TheDAG,
  TheDAGFactory
};

// const uuidV4 = require('uuid/v4');
// const FIFO = require('fifo');
// const toposort = require('toposort');

// const { getState, setState } = require('./core/private/_state');
// const { privateMethods } = require('./core/private');
// const { publicMethods } = require('./core/public');
// const addEdges = publicMethods.addEdges;
// const addNodes = publicMethods.addNodes;
// const isAcyclic = publicMethods.isAcyclic;

// const DAGFactory = {
//   DAGs: {},
//   createDAG({ nodes, edges }) {
//     const dagID = uuidV4();
//     this.DAGs[dagID] = new TheDAG({ nodes, edges });
//   },
//   deleteDAG() {}
// };

// class TheDAG {
//   constructor({nodes, edges}) {

//     setState(({ nodes, edges }) => {
//       nodes = {};
//       edges = {};
//     });
//   }
//   toJS() {
//     const { nodes, edges } = getState();
//     return {
//       nodes,
//       edges
//     };
//   }
//   mutate(mutator) {
//     setState(mutator);
//     mutator({ nodes: this.nodes, edges: this.edges });
//   }

//   traverseBreadthFirst({ startingNodeID, visitNode = () => null }) {
//     return publicMethods.traverseBreadthFirst({ startingNodeID, visitNode });
//   }

//   *traverseBreadthFirstGenerator({ startingNodeID, visitNode = () => null }) {
//     yield* publicMethods.traverseBreadthFirstGenerator({
//       startingNodeID,
//       visitNode
//     });
//   }
//   *traverseDepthFirstGenerator({ startingNodeID, visitNode }) {
//     yield* publicMethods.traverseDepthFirstGenerator({
//       startingNodeID,
//       visitNode
//     });
//   }

//   getDistanceTo({ sourceNodeID, targetNodeID }) {
//     return publicMethods.getDistanceTo({ sourceNodeID, targetNodeID });
//   }

//   getNodesByDistanceTo({ sourceNodeID, hops }) {
//     return publicMethods.getNodesByDistanceTo({ sourceNodeID, hops });
//   }

//   isAcyclic() {
//     return isAcyclic();
//   }

//   _generateEdgeIDFromSourceAndTargetIDs({ sourceID, targetID }) {
//     const { generateEdgeIDFromSourceAndTargetIDs } = privateMethods;
//     return generateEdgeIDFromSourceAndTargetIDs({
//       sourceID,
//       targetID
//     });
//   }
//   _createNode(node = { nodeID: null, data: {} }) {
//     const { createNode } = privateMethods;
//     return createNode(node);
//   }
//   _createEdge(edge = { source: 'sourceNodeID', target: 'targetNodeID' }) {
//     const { createEdge } = privateMethods;
//     return createEdge(edge);
//   }
//   _addPossibleTargets({ sourceNode, targetID }) {
//     const { addPossibleTargets } = privateMethods;
//     return addPossibleTargets({ sourceNode, targetID });
//   }
//   _addPossibleSources({ targetNode, sourceID }) {
//     const { addPossibleSources } = privateMethods;
//     return addPossibleSources({ targetNode, sourceID });
//   }
//   nodeExists(nodeID) {
//     return publicMethods.nodeExists(nodeID);
//   }
//   addNodes(nodes = []) {
//     return addNodes(nodes);
//   }
//   addEdges(edges = []) {
//     return addEdges(edges);
//   }
//   getEdgeID({ source, target }) {
//     return publicMethods.getEdgeID({ source, target });
//   }
//   getNodes() {
//     return publicMethods.getNodes();
//   }
//   getEdges() {
//     return publicMethods.getEdges();
//   }
//   getNode({ nodeID }) {
//     return publicMethods.getNode({ nodeID });
//   }
//   getEdge({ source, target }) {
//     return publicMethods.getEdge({ source, target });
//   }
//   destroy() {
//     return publicMethods.destroy();
//   }
// }

// module.exports = TheDAG;
