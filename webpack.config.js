var webpack = require('webpack');
var path = require('path');

module.exports = {
  entry: {
    app: ['./src/entry.js']
  },
  output: {
    path: path.resolve(__dirname, 'build', 'assets'),
    publicPath: '/assets',
    filename: 'bundle.js'
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        exclude: [
          path.resolve(__dirname, 'node_modules')
        ],
        include: [
          path.resolve(__dirname, 'src')
        ],
        query: {
          cacheDirectory: true,
          presets: ['react', 'es2015'],
          plugins: [
            'transform-object-rest-spread',
            'transform-class-properties'
          ]
        }
      }
    ]
  },
  plugins: [
    new webpack.NoErrorsPlugin()
  ]
};
