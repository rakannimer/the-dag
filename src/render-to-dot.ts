export const renderToDot = (
  dagGraph,
  { renderNode = node => "[]", renderEdge = edge => "[]" } = {
    renderNode: () => "[]",
    renderEdge: () => "[]"
  }
) => {
  const { nodes, edges } = dagGraph.toJS();
  const dotString = `
  digraph g {
    ${Object.keys(nodes)
      .map(nodeID => nodes[nodeID])
      .map(node => `NODE_${node.nodeID} ${renderNode(node)};`)
      .join(" ")}
    ${Object.keys(edges)
      .map(edgeID => edges[edgeID])
      .map(
        edge =>
          `NODE_${edge.sourceID} -> NODE_${edge.targetID} ${renderEdge(edge)}`
      )}
  }
`;
  return dotString;
};
