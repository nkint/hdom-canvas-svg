const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: "./src/index.ts",
  output: {
    path: path.resolve(__dirname, "../dist"),
    filename: "bundle.js",
    clean: true,
  },
  module: {
    rules: [{ test: /\.ts?$/, loader: "ts-loader" }],
  },
  resolve: {
    extensions: ["*", ".js", ".jsx", ".ts", ".tsx"],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./public/index.html",
      inject: "body",
      publicPath: "./",
    }),
  ],
};
