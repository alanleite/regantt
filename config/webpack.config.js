const path = require('path')
const nodeExternals = require('webpack-node-externals')

const env = process.env.NODE_ENV || 'development'

module.exports = {
  entry: './src/index.js',
  mode: env,
  output: {
    library: '',
    libraryTarget: 'commonjs',
    path: path.resolve(__dirname, '../lib'),
    filename: 'regantt.js'
  },
  module: {
    rules: [
      {
        test: /\.js|jsx?$/,
        use: {
          loader: 'babel-loader'
        },
        exclude: /node_modules/
      }
    ]
  },
  resolve: {
    mainFields: ['browser', 'main', 'module'],
    extensions: ['.js', '.jsx']
  },
  externals: [nodeExternals()]
}
