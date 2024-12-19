const path = require("path");
const CopyWebpackPlugin = require("copy-webpack-plugin");
// const NodePolyfillPlugin = require("node-polyfill-webpack-plugin")

module.exports = {
  entry: {
    script: "./src/script.js",
    serviceWorker: "./src/serviceWorker.js",
  },
  output: {
    filename: "[name].bundle.js",
    path: path.resolve(__dirname, "dist"),
  },
  optimization: {
    minimize: false,
  },
  mode: "production",
  watch: true,
  plugins: [
    new CopyWebpackPlugin({
      patterns: [{ from: "static" }],
    }),
    // new NodePolyfillPlugin(),
  ],
};
