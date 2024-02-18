const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = (env, { mode }) => {

  const base = '/';
  const dist = path.resolve(__dirname, './dist');

  // build mode
  let buildMode = 'production';
  if (mode === 'development') {
    buildMode = 'development';
  }

  const webpackConfig = {

    mode: buildMode,
    devtool: ((buildMode === 'development') ? 'inline-source-map' : 'source-map'),

    entry: {'index': './test/index.tsx'},
    output: {
      clean: true,
      filename: '[name].js',
      publicPath: base,
      path: dist,
      chunkFilename: '[name].js',
    },

    resolve: {
      extensions: ['.ts', '.tsx', '.js', '.jsx'],
      alias: {
        '@': path.resolve(__dirname, './src'),
      },
    },

    module: {
      rules: [
        {
          test: /\.(ts|tsx)$/,
          exclude: /node_modules/,
          use: 'ts-loader',
        },
      ],
    },

    plugins: [
      new HtmlWebpackPlugin({
        template: './test/index.html',
        filename: './index.html',
        chunks: ['index']
      }),
    ],

    devServer: {
      port: '3000',
      host: '0.0.0.0',
      open: true,
      hot: true,
      liveReload: true,
    },

  };

  return webpackConfig;

};
