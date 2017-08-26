const getStateManipulators = require('./core/private/_getStateManipulators');
const { publicMethods } = require('./core/public');

const addEdges = publicMethods.addEdges;
const addNodes = publicMethods.addNodes;
const isAcyclic = publicMethods.isAcyclic;

/**
 * 
 * 
 * @class TheDAG
 * @example 
 * let a = new TheDAG()
 */
class TheDAG {
  constructor(stateManipulators) {
    this.stateManipulators = getStateManipulators(stateManipulators);
  }

  nodeExists(node) {
    const nodeID = node.nodeID ? node.nodeID : node;
    return publicMethods.nodeExists(nodeID, this.stateManipulators);
  }

  /**
    * @param {any[]} nodes
    * @param {any} nodes[].node
    * @param {any[]} edges
    * @param {any} edges[].edge
    * @param {function} nodeIDGenerator - input : nodes[].node output: nodeID
    * @param {function} edgeSourceIDGenerator - input : edges[].edge output: edgeSourceID
    * @param {function} edgeTargetIDGenerator - input : edges[].edge output: edgeTargetID
    * @returns {Void}
    * @memberof TheDAG
  */
  importGraph({
    nodes,
    edges,
    nodeIDGenerator,
    edgeSourceIDGenerator,
    edgeTargetIDGenerator
  }) {
    return publicMethods.importGraph(
      {
        nodes,
        edges,
        nodeIDGenerator,
        edgeSourceIDGenerator,
        edgeTargetIDGenerator
      },
      this.stateManipulators
    );
  }
  /**
    * @param {nodes} nodes
    * @param {Node} nodes.node { nodeID, nodeData }
    * @param {string} nodes.node.nodeID
    * @param {any} nodes.node.nodeData
    * @returns {Void}
    * @memberof TheDAG
   */
  addNodes(nodes) {
    return addNodes(nodes, this.stateManipulators);
  }
  /**
   * Adds Edges to graph.
   * @param {Object[]} Edges
   * @param {Object} Edges.PartialEdge { source, target } 
   * @param {Node | string} PartialEdge.source - Node { nodeID, ...otherStuff} or nodeID string
   * @param {Node | string} PartialEdge.target - Node { nodeID, ...otherStuff} or nodeID string
   * @returns {Void} 
   * @memberof TheDAG
   */
  addEdges(edges) {
    return addEdges(edges, this.stateManipulators);
  }

  /**
   * Gets Edge ID from partial edge information.
   * @param {Object} PartialEdge { source, target } 
   * @param {Node | string} PartialEdge.source - Node { nodeID, ...otherStuff} or nodeID string
   * @param {Node | string} PartialEdge.target - Node { nodeID, ...otherStuff} or nodeID string
   * @returns {string} edgeID
   * @memberof TheDAG
   */
  getEdgeID({ source, target }) {
    return publicMethods.getEdgeID({ source, target }, this.stateManipulators);
  }

  /**
    * Get all nodes in graph
    * @returns {Nodes} graph.nodes
    * @returns {Node} graph.nodes[nodeID] = { nodeID, nodeData }
    * @memberof TheDAG
  */
  getNodes() {
    return publicMethods.getNodes(this.stateManipulators);
  }

  /**
    * Gets all edges in graph
    * @returns {Edges} graph.edges
    * @returns {Edge} graph.edges[edgeID] = { edgeID, nodeData, sourceID, targetID }
    * @memberof TheDAG
   */
  getEdges() {
    return publicMethods.getEdges(this.stateManipulators);
  }

  /**
   * Gets Node by nodeID.
   * 
   * @param {Object} {nodeID} - Any object that has nodeID in it.
   * @param {string} {nodeID}.nodeID - nodeID
   * @returns {Node} { nodeID, nodeData }
   * @memberof TheDAG
   */
  getNode({ nodeID }) {
    return publicMethods.getNode({ nodeID }, this.stateManipulators);
  }
  /**
   * Gets edge by source and target nodes or nodeIDs
   * 
   * @param {Object} VersatileEdge { source, target } 
   * @param {Node | string} VersatileEdge.source - Node { nodeID, ...otherStuff} or nodeID string
   * @param {Node | string} VersatileEdge.target - Node { nodeID, ...otherStuff} or nodeID string
   * @returns {Edge} { edgeID, nodeData, sourceID, targetID }
   * @memberof TheDAG
   */
  getEdge({ source, target }) {
    return publicMethods.getEdge({ source, target }, this.stateManipulators);
  }

  /**
   * 
   * @returns {Object} graph
   * @returns {Nodes} graph.nodes
   * @returns {Node} graph.nodes[nodeID] = { nodeID, nodeData }
   * @returns {Edges} graph.edges
   * @returns {Edge} graph.edges[edgeID] = { edgeID, nodeData, sourceID, targetID }
   * @memberof TheDAG
   */
  toJS() {
    const { nodes, edges } = this.stateManipulators.getState();
    return {
      nodes,
      edges
    };
  }

  /**
   * 
   * Traverses the graph breadth first returning all nodes resulting from the traversal in insertion order. Might result in poor performance on large graphs as it stores it all in memory before returning it.
   * @param {Object}    input 
   * @param {string}    input.startingNodeID - ID of the node from which to start traversing
   * @param {function}  input.visitNode - function called everytime a new node is traversed
   * @memberof TheDAG
   * @yields {Object} generatorOutput
   * @yields {boolean} generatorOutput.done - Reached sink, done traversing.
   * @yields {Object} generatorOutput.value - Node.
    * @yields {string} generatorOutput.value.nodeID - Traversed node ID.
    * @yields {string} generatorOutput.value.nodeData - Traversed node data.
   */

  traverseBreadthFirst({ startingNodeID, visitNode }) {
    return publicMethods.traverseBreadthFirst(
      { startingNodeID, visitNode },
      this.stateManipulators
    );
  }

  /**
   * 
   * Traverses the graph breadth first yielding nodes as it crawls it. Good for large graphs as it doesnt store it all in memory
   * @param {Object}    input 
   * @param {string}    input.startingNodeID - ID of the node from which to start traversing
   * @param {function}  input.visitNode - function called everytime a new node is traversed
   * @memberof TheDAG
   * @yields {Object} generatorOutput
   * @yields {boolean} generatorOutput.done - Reached sink, done traversing.
   * @yields {Object} generatorOutput.value - Node.
    * @yields {string} generatorOutput.value.nodeID - Traversed node ID.
    * @yields {string} generatorOutput.value.nodeData - Traversed node data.
   */
  *traverseBreadthFirstGenerator({ startingNodeID, visitNode = () => null }) {
    yield* publicMethods.traverseBreadthFirstGenerator(
      {
        startingNodeID,
        visitNode
      },
      this.stateManipulators
    );
  }

  /**
   * 
   * Traverses the graph depth first yielding nodes as it crawls it. Good for large graphs as it doesnt store it all in memory
   * @param {Object}    input 
   * @param {string}    input.startingNodeID - ID of the node from which to start traversing
   * @param {function}  input.visitNode - function called everytime a new node is traversed
   * @memberof TheDAG
   * @yields {Object} generatorOutput
   * @yields {boolean} generatorOutput.done - Reached sink, done traversing.
   * @yields {Object} generatorOutput.value - Node.
    * @yields {string} generatorOutput.value.nodeID - Traversed node ID.
    * @yields {string} generatorOutput.value.nodeData - Traversed node data.
   */
  *traverseDepthFirstGenerator({ startingNodeID, visitNode }) {
    yield* publicMethods.traverseDepthFirstGenerator(
      {
        startingNodeID,
        visitNode
      },
      this.stateManipulators
    );
  }

  /**
   * 
   * 
   * @param {Object} input - sourceNodeID and targetNodeID
   * @param {string} input.sourceNodeID - ID of the source node
   * @param {string} input.targetNodeID - ID of the target node
   * @returns {number} numberOfHops - distance between nodes or number of hops required to go from source to target
   * @memberof TheDAG
   */
  getDistanceTo({ sourceNodeID, targetNodeID }) {
    return publicMethods.getDistanceTo(
      { sourceNodeID, targetNodeID },
      this.stateManipulators
    );
  }

  /**
   * 
   * 
   * @param {Object} input - sourceNodeID and hops
   * @param {string} input.sourceNodeID - ID of the source node
   * @param {string} input.hops - Distance or number of hops from source node
   * @returns {Object[]} nodes - All node at distance to source = hops
   * @returns {string} nodes[].nodeID
   * @returns {number} nodes[].hops
   * @memberof TheDAG
   */
  getNodesByDistanceTo({ sourceNodeID, hops }) {
    return publicMethods.getNodesByDistanceTo(
      { sourceNodeID, hops },
      this.stateManipulators
    );
  }

  /**
   * @description
   * Checks if the graph in the object state is acyclic. 
   * If it is acyclic : it returns an array of topologically sorted nodes.
   * If it is cyclic : it returns the ID of the node responsible for the cyclicity of the graph.
   * @returns {Object} acyclicityMetadata
   * @returns {boolean} acyclicityMetadata.isAcyclic
   * @returns {Object[]} acyclicityMetadata.topologicallySortedNodeIDs - A topologically sorted array of node IDs
   * @returns {string} acyclicityMetadata.topologicallySortedNodeIDs[] - nodeID
   * @returns {string} acyclicityMetadata.cyclicDependencyID - If the graph is cyclic, returns the node ID responsable for the cycle. This variable is only set if isAcyclic is false
   * @example 
   * const myDAG = new TheDAG();
   * // ... Add some nodes and edges
   * const { isAcyclic, topologicallySortedNodeIDs } = myDAG.isAcyclic()
   * @memberof TheDAG
   */
  isAcyclic() {
    return isAcyclic(this.stateManipulators);
  }

  /**
   * 
   * Clears nodes and edges in state.
   * @returns {Void}
   * @memberof TheDAG
   */
  destroy() {
    return publicMethods.destroy(this.stateManipulators);
  }
}

module.exports = TheDAG;
