import { addNodes } from "./addNodes";
import { addEdges } from "./addEdges";
import { privateMethods } from "../private/";
import { GraphStateManipulators, ImportGraphArg } from "../../types";
const { getStateManipulators } = privateMethods;

export const importGraph = (
  {
    nodes,
    edges,
    nodeIDGenerator = node => node,
    edgeSourceIDGenerator = edge => edge.source,
    edgeTargetIDGenerator = edge => edge.target
  }: ImportGraphArg,
  stateManipulators?: GraphStateManipulators
) => {
  const theDAGFormatNodes = nodes.map(node => {
    return { nodeID: nodeIDGenerator(node), nodeData: node };
  });
  const theDAGFormatEdges = edges.map(edge => {
    return {
      source: edgeSourceIDGenerator(edge),
      target: edgeTargetIDGenerator(edge)
    };
  });
  addNodes(theDAGFormatNodes, stateManipulators);
  addEdges(theDAGFormatEdges, stateManipulators);
};

export default importGraph;
