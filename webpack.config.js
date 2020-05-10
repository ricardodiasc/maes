var path = require("path");
var HtmlWebpackPlugin = require("html-webpack-plugin");
var CopyPlugin = require("copy-webpack-plugin");

var HtmlWebpackPluginConfig = new HtmlWebpackPlugin({
  template: "./index.html",
  filename: "./index.html",
  inject: "body",
});

module.exports = {
  entry: "./src/index.ts",
  mode: "development",
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "dist"),
  },
  devtool: "source-map",
  resolve: {
    extensions: [
      ".webpack.config.js",
      "web.js",
      ".ts",
      ".tsx",
      ".js",
      ".jsx",
      ".d.ts",
    ],
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: "ts-loader",
      },
      {
        test: /\.(glb|hdr)$/i,
        use: {
          loader: "file-loader",
          options: {
            name: "[path][name].[ext]",
          },
        },
      },
    ],
  },
  plugins: [
    HtmlWebpackPluginConfig,
    new CopyPlugin([
      {
        from: "public",
        to: ".",
      },
    ]),
  ],
};
