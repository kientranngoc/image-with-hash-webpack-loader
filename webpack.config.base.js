const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_module/,
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
        exclude: /node_module/,
      },
      {
        test: /\.js$/,
        include: /src/,
        use: [
          {
            loader: path.resolve(
              './src/webpack-loaders/imageWithHashLoader.js'
            ),
            options: {
              src: 'src',
              'query-param-key': 'v',
              'hash-algorithm': 'sha1',
              length: 8,
              extensions: ['gif', 'jpeg', 'jpg', 'png'],
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
    }),
  ],
}
