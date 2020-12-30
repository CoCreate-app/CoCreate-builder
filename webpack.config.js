// Webpack uses this to work with directories
const path = require('path');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
// const HtmlWebpackPlugin = require('html-webpack-plugin');
// const { CleanWebpackPlugin } = require('clean-webpack-plugin');

let isProduction = process.env.NODE_ENV === 'production';

// This is main configuration object.
// Here you write different options and tell Webpack what to do
module.exports = {

  // Path to your entry point. From this file Webpack will begin his work
  entry: {
    'CoCreate-builder': './src/CoCreate-builder.js',
    // 'CoCreate-domReader': '../CoCcreate-components/CoCreate-domReader/src/CoCreate-domReader.js',
    // 'CoCreate-dnd': '../CoCcreate-components/CoCreate-dnd/src/index.js',
    // 'CoCreate-vdom': '../CoCcreate-components/CoCreate-vdom/src/CoCreate-vdom.js',
    // 'CoCreate-toolbar': '../CoCcreate-components/CoCreate-toolbar/src/CoCreate-toolbar.js',
    // 'CoCreate-styles': '../CoCcreate-components/CoCreate-styles/src/CoCreate-styles.js',
    // 'CoCreate-attributes': '../CoCcreate-components/CoCreate-attributes/src/CoCreate-attributes.js',
    // 'CoCreate-selected2': '../CoCcreate-components/CoCreate-selected2/src/CoCreate-selected2.js',
    // 'CoCreate-findPosition': '../CoCcreate-components/CoCreate-findPosition/src/CoCreate-findPosition.js',
    // 'CoCreate-pickr': '../CoCcreate-plugins/CoCreate-pickr/src/CoCreate-pickr.js',

  },

  // Path and filename of your result bundle.
  // Webpack will bundle all JavaScript into this file
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: isProduction ? '[name].min.js' : '[name].js', 
  },

  // Default mode for Webpack is production.
  // Depending on mode Webpack will apply different things
  // on final bundle. For now we don't need production's JavaScript
  // minifying and other thing so let's set mode to development
  mode: isProduction ? 'production' : 'development',
  module: {
    rules: [{
      test: /\.js$/,
      exclude: /(node_modules)/,
      use: {
        loader: 'babel-loader',
        options: {
          presets: ['@babel/preset-env']
        }
      }
    }]
  },

  // add source map
  ...(isProduction ? {} : { devtool: 'eval-source-map' }),

  // add uglifyJs
  optimization: {
    minimizer: [new UglifyJsPlugin({
      uglifyOptions: {
        // get options: https://github.com/mishoo/UglifyJS
        drop_console: isProduction
      },
    })],
  },
  // plugins: [
  //   new CleanWebpackPlugin(),
  //   new HtmlWebpackPlugin({
  //     title: 'My Builder',
  //     template: './CoCreate-builder/demo/CoCreate-builder.html',
  //     filename: 'builder.html'
  //   })
  // ]
};
