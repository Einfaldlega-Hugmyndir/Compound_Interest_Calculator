const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {

  mode: "production",

  entry: "./src/main.ts",

  resolve: {
    extensions: [".ts", ".js"],
  },

  module: {
    rules: [
      {
        test: /\.ts$/,
        exclude: /node_modules/,
        use: [
          {
            loader: "babel-loader",
            options: {
              presets: ["@babel/preset-env", "@babel/preset-typescript"],
            },
          },
          "ts-loader",
        ],
      },
    ],
  },

  output: {
    publicPath: "/",
    filename: "main.js",
    path: path.resolve(__dirname, "build"),
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/index.html",
      filename: "index.html",
      inject: true,
    }),
  ],

  devServer: {
    static: {
      directory: path.join(__dirname, "build"),
      publicPath: "/",
      watch: true,
    },

    compress: true,
    port: 3000,
    open: true,
  },
};