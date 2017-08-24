const addPossibleSources = require('./_addPossibleSources');
const addPossibleTargets = require('./_addPossibleTargets');
const createEdge = require('./_createEdge');
const createNode = require('./_createNode');
const generateEdgeIDFromSourceAndTargetIDs = require('./_generateEdgeIDFromSourceAndTargetIDs');

module.exports = {
  privateMethods: {
    addPossibleSources,
    addPossibleTargets,
    createEdge,
    createNode,
    generateEdgeIDFromSourceAndTargetIDs
  }
};
