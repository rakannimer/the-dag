import addEdges from './addEdges';
import addNodes from './addNodes';
import destroy from './destroy';
import getDistanceTo from './getDistanceTo';
import getEdge from './getEdge';
import getEdgeID from './getEdgeID';
import getEdges from './getEdges';
import getNode from './getNode';
import getNodes from './getNodes';
import getNodesByDistanceTo from './getNodesByDistanceTo';
import isAcyclic from './isAcyclic';
import nodeExists from './nodeExists';
import traverseBreadthFirst from './traverseBreadthFirst';
import traverseBreadthFirstGenerator from './traverseBreadthFirstGenerator';
import traverseDepthFirstGenerator from './traverseDepthFirstGenerator';

export const publicMethods = {
  addEdges,
  addNodes,
  destroy,
  getDistanceTo,
  getEdge,
  getEdgeID,
  getEdges,
  getNode,
  getNodes,
  getNodesByDistanceTo,
  isAcyclic,
  nodeExists,
  traverseBreadthFirst,
  traverseBreadthFirstGenerator,
  traverseDepthFirstGenerator
};
export default {
  publicMethods: {
    addEdges,
    addNodes,
    destroy,
    getDistanceTo,
    getEdge,
    getEdgeID,
    getEdges,
    getNode,
    getNodes,
    getNodesByDistanceTo,
    isAcyclic,
    nodeExists,
    traverseBreadthFirst,
    traverseBreadthFirstGenerator,
    traverseDepthFirstGenerator
  }
};
