const nodeExists = require('./nodeExists');
const { privateMethods } = require('../private/');
const { setState } = require('../private/_state');

const addNodes = (nodes = []) => {
  nodes.forEach(node => {
    const { nodeID } = node;
    if (nodeExists(nodeID)) return;
    const newNode = privateMethods.createNode(node);
    setState(state => {
      state.nodes[nodeID] = newNode;
    });
  });
};
module.exports = addNodes;
