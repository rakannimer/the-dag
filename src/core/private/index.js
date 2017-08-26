import addPossibleSources from './_addPossibleSources';
import addPossibleTargets from './_addPossibleTargets';
import createEdge from './_createEdge';
import createNode from './_createNode';
import generateEdgeIDFromSourceAndTargetIDs from './_generateEdgeIDFromSourceAndTargetIDs';

export default {
  privateMethods: {
    addPossibleSources,
    addPossibleTargets,
    createEdge,
    createNode,
    generateEdgeIDFromSourceAndTargetIDs
  }
};

export const privateMethods = {
  addPossibleSources,
  addPossibleTargets,
  createEdge,
  createNode,
  generateEdgeIDFromSourceAndTargetIDs
};

// module.exports = {
//   privateMethods: {
//     addPossibleSources,
//     addPossibleTargets,
//     createEdge,
//     createNode,
//     generateEdgeIDFromSourceAndTargetIDs
//   }
// };
