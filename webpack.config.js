var path = require('path');

var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './app/index.js',
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ['babel-loader'],
      },
    ],
  },
  resolve: {
    extensions: ['*', '.js', '.jsx'],
  },
  output: {
    path: path.resolve(__dirname, 'dist'),

    filename: 'index_bundle.js',
  },

  module: {
    rules: [
      { test: /\.(js|jsx)$/, use: 'babel-loader' },

      { test: /\.css$/, use: ['style-loader', 'css-loader'] },
    ],
  },

  mode: 'development',

  plugins: [
    new HtmlWebpackPlugin({
      template: 'app/index.html',
    }),
  ],
};
