const path = require('path')
const nodeExternals = require('webpack-node-externals')

module.exports = {
  devtool: 'hidden-source-map',
  entry: './src/index.js',
  mode: process.env.NODE_ENV || 'development',
  output: {
    path: path.resolve('./lib'),
    filename: 'regantt.js',
    libraryTarget: 'umd',
    library: 'regantt'
  },
  module: {
    rules: [
      {
        test: /\.js|jsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.jsx']
  },
  externals: [nodeExternals()]
}
