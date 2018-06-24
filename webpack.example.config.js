const webpack = require("webpack");
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ConcatPlugin = require("webpack-concat-plugin");

const concatPluginConfigGenerator = (name, files) => {
  return {
    uglify: false,
    sourceMap: false,
    name: name,
    fileName: "[name].js",
    filesToConcat: files,
    injectType: "none"
  };
};

module.exports = options => {
  return {
    entry: {
      main: path.resolve("example/index.ts")
    },

    output: {
      path: __dirname + "/dist",
      filename: "bundle.js"
    },

    devtool: 'source-map',

    module: {
      rules: [
        { test: /\.ts$/, loader: "ts-loader" }
      ]
    },

    plugins: [
      new HtmlWebpackPlugin({
        template: path.resolve("static/index.html"),
        inject: false
      }),

      new ConcatPlugin(concatPluginConfigGenerator("phaser", [
        path.resolve(__dirname, "node_modules/phaser-ce/build/phaser.js")
      ])),
    ],

    resolve: {
      extensions: ['.ts', '.js', '.json']
    },

    devServer: {
      host: "0.0.0.0",
      contentBase: path.join(__dirname, "static"),
      hot: true,
      disableHostCheck: true,
      inline:false
    }

  }
};
