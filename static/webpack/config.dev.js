const { merge } = require('webpack-merge');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const shared = require('./shared');
const base = {
  mode: 'development',
  plugins: [
    new MiniCssExtractPlugin({ filename: '[name].[contenthash:7].css' }),
  ],
  optimization: { splitChunks: { chunks: 'all' } },
  watch: true,
  watchOptions: {
    ignored: /node_modules/,
  },
};

module.exports = merge(base, shared);