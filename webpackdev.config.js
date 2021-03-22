const path = require("path")
const TerserPlugin = require("terser-webpack-plugin")
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const { CleanWebpackPlugin } = require("clean-webpack-plugin")
const HtmlWebpackPlugin = require("html-webpack-plugin")


let isProduction = process.env.NODE_ENV === "production"

module.exports = {

  entry: {
    "CoCreate-builder": "./src/index.js",
    "CoCreate-builder-canvas": "./src/canvas.js",
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: pathData => pathData.chunk.name === 'CoCreate-builder-canvas' ? '[name].js' : '[name].[fullhash].js',
    chunkFilename: "[name].[fullhash].js",
    libraryTarget: "umd",
    libraryExport: "default",
    library: "CoCreate",
    globalObject: "this",
    // publicPath: 'https://server.cocreate.app/CoCreateJS/dist/'
  },

  plugins: [
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: "[name].css",
    }),

    new HtmlWebpackPlugin({
      template: "./src/index.html",
      chunks:['CoCreate-builder']
    }),
  ],
  // Default mode for Webpack is production.
  // Depending on mode Webpack will apply different things
  // on final bundle. For now we don't need production's JavaScript
  // minifying and other thing so let's set mode to development
  mode: isProduction ? "production" : "development",
  module: {
    rules: [{
        test: /.js$/,
        exclude: /(node_modules)/,
        use: {
          loader: "babel-loader",
          options: {
            plugins: ["@babel/plugin-transform-modules-commonjs"],
          },
        },
      },
      {
        test: /.css$/i,
        use: [
          { loader: "style-loader", options: { injectType: "linkTag" } },
          "file-loader",
        ],
      },
    ],
  },

  // add source map
  ...(isProduction ? {} : { devtool: "eval-source-map" }),

  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        extractComments: true,
        // cache: true,
        parallel: true,
        // sourceMap: true, // Must be set to true if using source-maps in production
        terserOptions: {
          // https://github.com/webpack-contrib/terser-webpack-plugin#terseroptions
          // extractComments: 'all',
          compress: {
            drop_console: true,
          },
        },
      }),
    ],
    splitChunks: {
      // chunks: "all",
      // minSize: 200,
      // maxSize: 99999,
      //minChunks: 1,
    },
  },
}
