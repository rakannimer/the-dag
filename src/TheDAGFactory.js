const TheDAG = require('./TheDAG');

const TheDAGFactory = {
  DAGs: {},
  createDAG({ nodes, edges }) {
    const dagID = uuidV4();
    this.DAGs[dagID] = new TheDAG({ nodes, edges });
  },
  deleteDAG() {}
};

module.exports = TheDAGFactory;
