const nodeExists = require('./nodeExists');
const { privateMethods } = require('../private/');
const getStateManipulators = require('../private/_getStateManipulators');

const addNodes = (nodes = [], stateManipulators) => {
  const { setState } = getStateManipulators(stateManipulators);
  nodes.forEach(node => {
    const { nodeID } = node;
    if (nodeExists(nodeID)) return;
    const newNode = privateMethods.createNode(node);
    setState(state => {
      state.nodes[nodeID] = newNode;
      return state;
    });
  });
};
module.exports = addNodes;
