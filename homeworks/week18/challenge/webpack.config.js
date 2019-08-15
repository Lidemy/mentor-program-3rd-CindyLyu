const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  entry: ['./index.js', './index.sass'],
  output: {
    path: path.resolve(__dirname, 'build'), // 目錄名
    filename: './bundle.min.js',
  },
  module: {
    rules: [
      { // babel
        test: /\.js$/, // 符合此副檔名者使用
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
          presets: ['@babel/preset-env'],
        },
      },
      { // css 轉譯及壓縮（執行順序由後到前）
        test: /\.sass$/,
        use: [
          'style-loader',
          MiniCssExtractPlugin.loader,
          'css-loader',
          'sass-loader',
        ],
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].min.css',
      chunkFilename: '[id].css',
    }),
  ],
};
