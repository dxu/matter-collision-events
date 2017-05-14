var path = require('path'),
    webpack = require('webpack'); //to access built-in plugins

module.exports = {
  entry: {
    'matter-collision-events': './src/entry.js',
    'matter-collision-events.min': './src/entry.js',
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'build'),
    library: 'MatterCollisionEvents',
    libraryTarget: 'umd',
  },
  externals: {
    'matter-js': {
      root: 'Matter',
      commonjs: 'matter-js',
      commonjs2: 'matter-js',
      amd: 'matter-js',
    },
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin({
      include: /\.min\.js$/,
    }),
  ]
};
