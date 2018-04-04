export type GraphNode = {
  id: string | number | symbol;
  nodeID: any;
  nodeData: any;
  possibleTargets: string[];
  possibleSources: string[];
};

export type GraphEdge = {
  edgeID: string;
  edgeData: any;
  sourceID: string;
  targetID: string;
};

export type GraphState = {
  nodes: {
    [nodeID: string]: GraphNode;
  };
  edges: {
    [edgeID: string]: GraphEdge;
  };
};

export type GraphStateMutator = (state: GraphState) => void;

export type GraphStateManipulators = {
  state: GraphState;
  getState: () => GraphState;
  setState: (m: GraphStateMutator) => void;
};

export type PartialNode = {
  nodeID: string;
  data?: {};
  nodeData?: {};
};

export type PartialEdge = {
  source: GraphNode | any;
  target: GraphNode | any;
  edgeData?: any;
};

export type TraverseArgs = {
  startingNodeID: GraphNode["id"];
  visitNode?: (node: GraphNode) => void;
};
export type ImportGraphArg = {
  nodes: any[];
  edges: any[];
  nodeIDGenerator: (node: any) => string;
  edgeSourceIDGenerator: (edge: any) => string;
  edgeTargetIDGenerator: (edge: any) => string;
};
