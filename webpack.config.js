const NodePolyfillPlugin = require("node-polyfill-webpack-plugin");

module.exports = {
  // Other rules...
  resolve: {
    fallback: {
      fs: false,
    },
  },
  plugins: [new NodePolyfillPlugin()],
};
