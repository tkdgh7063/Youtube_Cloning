const path = require("path");

module.exports = {
  entry: "./src/client/js/main.js", // src file from
  mode: "development",
  output: {
    filename: "main.js", // src file to
    path: path.resolve(__dirname, "assets", "js"), // should be absolute path
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: {
          loader: "babel-loader",
          options: {
            presets: [["@babel/preset-env", { targets: "defaults" }]],
          },
        },
      },
    ],
  },
};
