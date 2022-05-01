const HtmlWebpackPlugin = require("html-webpack-plugin");
const WebpackPwaManifest = require("webpack-pwa-manifest");
const path = require("path");
const { InjectManifest } = require("workbox-webpack-plugin");

// TODO: Add and configure workbox plugins for a service worker and manifest file.
// TODO: Add CSS loaders and babel to webpack.

module.exports = () => {
  return {
    mode: "development",
    // entry point for bundles
    entry: {
      main: "./src/js/index.js",
      install: "./src/js/install.js",
    },
    // output for bundles
    output: {
      filename: "[name].bundle.js",
      path: path.resolve(__dirname, "dist"),
    },
    plugins: [
      //webpack plugin that generates our html fil and injects our bundles
      new HtmlWebpackPlugin({
        template: "./index.html",
      }),
      // Injects our custom service worker
      new InjectManifest({
        swSrc: "./src/sw.js",
        swDest: "service-worker.js",
      }),
      // creates a manifest.json file
      new WebpackPwaManifest({}),
    ],

    module: {
      // css loaders
      rules: [
        {
          test: /\.css$/i,
          use: ["style-loader", "css-loader"],
        },
        {
          test: /\.m?js$/,
          exclude: /node_modules/,
          // babel-loader to be able to use ES6
          use: {
            loader: "babel-loader",
            options: {
              presets: ["@babel/preset-env"],
              plugins: [
                "@babel/plugin-proposal-object-rest-spread",
                "@babel/transform-runtime",
              ],
            },
          },
        },
      ],
    },
  };
};
