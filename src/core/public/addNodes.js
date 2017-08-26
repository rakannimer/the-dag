import nodeExists from './nodeExists';
import createNode from '../private/_createNode';
import getStateManipulators from '../private/_getStateManipulators';

const addNodes = (nodes = [], stateManipulators) => {
  const { setState } = getStateManipulators(stateManipulators);
  nodes.forEach(node => {
    const { nodeID } = node;
    if (nodeExists(nodeID)) return;
    const newNode = createNode(node);
    setState(state => {
      state.nodes[nodeID] = newNode;
      return state;
    });
  });
};
export default addNodes;
