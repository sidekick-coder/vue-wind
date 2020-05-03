const path = require("path");
const MiniCssExtractplugin = require("mini-css-extract-plugin");

module.exports = {
    entry: "./src/index.ts",
    mode: process.env.NODE_ENV || "production",
    module: {
      rules: [
        {
          test: /\.ts?$/,
          use: "ts-loader",
          exclude: /node_modules/,
        },
        {
          test: /\.css$/i,
          use: [
            "style-loader",
            MiniCssExtractplugin.loader,
            "css-loader"
          ],
        },
      ],
    },
    resolve: {
      extensions: [ ".ts", ".js" ],
    },
    plugins:[new MiniCssExtractplugin({
      filename: 'css/[name].css',
    })],
    output: {
      filename: "index.js",
      library: "VueWind",
      libraryTarget: "umd",
      path: path.resolve(__dirname, "dist"),
    },
  };