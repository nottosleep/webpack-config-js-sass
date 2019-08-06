const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin= require('copy-webpack-plugin');

module.exports = {
  entry: [
    './src/js/index.js',
  ],
  output: {
    filename: './js/index.js'
  },
  devtool: "source-map",
  module: {
    rules: [{
        test: /\.js$/,
        include: path.resolve(__dirname, 'src/js'),
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      },
      {
        test: /\.(sass|scss)$/,
        include: path.resolve(__dirname, 'src/sass'),
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: '../',
              hmr: process.env.NODE_ENV === 'development',
            },
          },
          {
            loader: 'style-loader'
          },
          {
            loader: 'css-loader', options: {
                sourceMap: true
            }
          },
          {
            loader: 'sass-loader', options: {
                sourceMap: true
            }
          }
        ],
      },
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].css',
      chunkFilename: '[id].css',
      ignoreOrder: false,
    }),
    new HtmlWebpackPlugin(),
    new CopyWebpackPlugin([{
        from: './src/fonts',
        to: './fonts'
      },
      {
        from: './src/img',
        to: './img'
      }
    ]),
  ],
};