import webpack from 'webpack'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import ExtractTextPlugin from 'extract-text-webpack-plugin'

import getRootPath from './tool/path'

global.styleRoot = getRootPath('src/styles')

export default config => ({
  cache: true,

  context: __dirname,

  entry: {
    app: [getRootPath('src/app.js')]
  },

  output: {
    path: getRootPath('dist'),
    filename: '[name].js',
    publicPath: ''
  },

  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        loaders: [
          { loader: 'babel-loader' },
          { loader: 'eslint-loader',
            options: {
              configFile: './.eslintrc',
              ingore: './.eslintignore'
            }
          }
        ],
        enforce: 'pre',
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.(png|jpg|gif)$/,
        loader: 'url-loader?limit=1000'
      },
      {
        // required for bootstrap icons
        test: /\.(woff|woff2)(\?(.*))?$/,
        loader: 'url-loader?prefix=factorynts/&limit=5000&mimetype=application/font-woff'
      },
      {
        test: /\.ttf(\?(.*))?$/,
        loader: 'file-loader?prefix=fonts/'
      },
      {
        test: /\.eot(\?(.*))?$/,
        loader: 'file-loader?prefix=fonts/'
      },
      {
        test: /\.svg(\?(.*))?$/,
        loader: 'file-loader?prefix=fonts/'
      },
      {
        test: /\.otf(\?(.*))?$/,
        loader: 'file-loader?prefix=fonts/'
      }
    ],
  },

  resolve: {
    alias: {
      config: getRootPath('env', config.env)
    },
    extensions: ['.js', 'json', '.scss']
  },

  externals: [],

  node: {
    __filename: true,
    net: 'empty',
    tls: 'empty',
    dns: 'empty'
  },

  plugins: [

    new webpack.DefinePlugin({
      'process.env.NODE_ENV': `'${process.env.NODE_ENV}'`,
      __DEBUG__: !config.release
    }),

    // disable dynamic requires
    new webpack.ContextReplacementPlugin(/.*$/, /a^/),

    new ExtractTextPlugin({
      filename: '[name].[hash].css',
      allChunks: true
    }),

    new webpack.optimize.CommonsChunkPlugin({
      name: ['vendor', 'manifest'],
      filename: '[name].[hash].js',
      minChunks: module => /node_modules/.test(module.context)
    }),

    new HtmlWebpackPlugin({
      filename: './index.html',
      template: getRootPath('src/index.html'),
      inject: true,
      hash: true
    }),

    new webpack.LoaderOptionsPlugin({
      debug: true
    })
  ],

  devtool: 'source-map'
})
