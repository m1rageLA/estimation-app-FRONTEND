const path = require("path");
const { VueLoaderPlugin } = require("vue-loader");

module.exports = {
  // WebPack build PROJ. starting from main.js
  entry: "./src/main.js",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js",
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        use: "vue-loader",
      },
      {
        test: /\.css$/,
        use: ["vue-style-loader", "css-loader"],
      },
      {
        test: /\.s[ac]ss$/,
        use: ["vue-style-loader", "css-loader", "sass-loader"],
      },
    ],
  },
  plugins: [
    new VueLoaderPlugin()
  ],
  devServer: {
    static: {
      directory: path.join(__dirname, 'public'),
    },
    compress: true,
    port: 9000,
    hot: true,
  },
};
