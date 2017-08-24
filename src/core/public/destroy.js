const { setState } = require('../private/_state');
const destroy = () => {
  setState(state => {
    state.nodes = {};
    state.edges = {};
  });
};

module.exports = destroy;
