import webpack from 'webpack'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import ExtractTextPlugin from 'extract-text-webpack-plugin'
import cssnano from 'cssnano'

import getRootPath from './tool/path'

global.styleRoot = getRootPath('src/styles')

export default config => ({
  cache: true,

  debug: true,

  entry: {
    vendor: [
      'autobind-decorator',
      'babel-polyfill',
      'classnames',
      'flux-standard-action',
      'history',
      'immutable',
      'joi-browser',
      'lodash',
      'qs',
      'react',
      'react-addons-css-transition-group',
      'react-bootstrap',
      'react-dom',
      'react-intl',
      'react-redux',
      'react-router',
      'react-router-redux',
      'redux',
      'redux-actions',
      'redux-form',
      'redux-promise',
      'scriptjs',
      'isomorphic-fetch'
    ],
    app: [
      getRootPath('src/app.js')
    ]
  },

  output: {
    path: getRootPath('dist'),
    filename: '[name].js',
    publicPath: '/'
  },

  eslint: {
    configFile: './.eslintrc',
    ingore: './.eslintignore'
  },

  module: {
    preLoaders: [
      {
        test: /\.(js|jsx)$/,
        loaders: ['babel-loader', 'eslint-loader'],
        exclude: /node_modules/
      },
    ],
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.(png|jpg|gif)$/,
        loader: 'url?limit=1000'
      },
      {
        // required for bootstrap icons
        test: /\.(woff|woff2)(\?(.*))?$/,
        loader: 'url?prefix=factorynts/&limit=5000&mimetype=application/font-woff'
      },
      {
        test: /\.ttf(\?(.*))?$/,
        loader: 'file?prefix=fonts/'
      },
      {
        test: /\.eot(\?(.*))?$/,
        loader: 'file?prefix=fonts/'
      },
      {
        test: /\.svg(\?(.*))?$/,
        loader: 'file?prefix=fonts/'
      },
      {
        test: /\.otf(\?(.*))?$/,
        loader: 'file?prefix=fonts/'
      }
    ],

    noParse: []
  },

  resolve: {
    alias: {
      node_modules: getRootPath('node_modules'),
      base_modules: getRootPath('base_modules'),
      config: getRootPath('env', config.env)
    },
    extensions: [
      '',
      '.js',
      '.scss'
    ]
  },

  singleRun: true,

  externals: [],

  context: __dirname,

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

    new ExtractTextPlugin('[name].[hash].css', { allChunks: true }),

    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      filename: '[name]-[hash].js'
    }),

    new HtmlWebpackPlugin({
      filename: './index.html',
      template: getRootPath('src/index.html'),
      inject: true,
      hash: true
    })
  ],

  devtool: 'source-map'
})
