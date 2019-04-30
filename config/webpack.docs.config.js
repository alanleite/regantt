const path = require('path')

const env = process.env.NODE_ENV || 'development'

module.exports = {
  entry: './src/docs/index.js',
  target: 'web',
  mode: env,
  output: {
    path: path.resolve(__dirname, '../docs'),
    filename: 'bundle.js'
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
  }
}
