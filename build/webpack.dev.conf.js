const webpack = require('webpack')
const config = require('./config')
const { merge } = require('webpack-merge')
const baseWebpackConfig = require('./webpack.base.conf')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')
// const VueLoaderPlugin = require('vue-loader-plugin');
const urls = require('../client/common/urls/index');

// add hot-reload related code to entry chunks
Object.keys(baseWebpackConfig.entry).forEach(function (name) {
  baseWebpackConfig.entry[name] = ['./build/dev-client'].concat(baseWebpackConfig.entry[name])
})

module.exports = merge(baseWebpackConfig, {
  mode: 'development',
  module: {
    rules: [
      {
        test: /\.(c|le)ss$/,
        use: [
             'vue-style-loader',
            'css-loader',
            'less-loader',
        ],
      },
    ]
  },
  // cheap-module-eval-source-map is faster for development
  devtool: 'eval-cheap-module-source-map',
  plugins: [
    new webpack.DefinePlugin({
      'process.env': config.dev.env
    }),
    // https://github.com/glenjamin/webpack-hot-middleware#installation--usage
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: `index.html`,
      urls:urls,
      inject: true,
      chunks: ['vendor', 'manifest', 'app']
    }),
    new FriendlyErrorsPlugin(),
    // new VueLoaderPlugin()
  ]
})
