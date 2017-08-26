import cleanup from 'rollup-plugin-cleanup';

export default {
  input: 'src/index.js',
  output: {
    file: 'umd/bundle.js',
    format: 'umd'
  },
  plugins: [
    cleanup({
      comments: 'none'
    })
  ],
  name: 'TheDAG'
};
