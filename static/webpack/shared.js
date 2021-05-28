const { resolve } = require('path');
const { VueLoaderPlugin } = require('vue-loader');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const BundleTracker = require('webpack-bundle-tracker');

const srcPath = resolve('src');

module.exports = {
  entry: {
    index: `${srcPath}/scripts/index.js`,
  },
  output: {
    filename: `${'production' !== process.env.NODE_ENV ? '[name]' : '[contenthash:7]'}.js`,
    publicPath: '/assets/',
    path: resolve('assets'),
    assetModuleFilename: '[name][ext]',
  },
  module: {
    rules: [
      {
        test: /(?<!\.vue)\.(s?[ac]ss|less|styl)$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
        ],
      },
      {
        test: /\.vue\.(s?[ac]ss)$/,
        use: ['vue-style-loader', 'css-loader']
      },
      {
        test: /\.(woff2?|ttf|eot|svg|png|ico|jpe?g)$/,
        type: 'asset/resource',
      },
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            cacheDirectory: true,
          }
        }
      },
      {
        test: /\.vue$/,
        exclude: /node_modules/,
        use: 'vue-loader',
      }
    ],
  },
  plugins: [
    new VueLoaderPlugin(),
    new BundleTracker({ filename: './webpack/webpack-stats.json' }),
  ],
  resolve: {
    extensions: ['.js', '.vue', '.css', '.json']
  }
};