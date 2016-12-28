import webpack from 'webpack'
import qs from 'qs'
import ExtractTextPlugin from 'extract-text-webpack-plugin'
import webpackConfig from './webpack.base.config.babel'

process.env.NODE_ENV = process.env.NODE_ENV || 'production'

const baseConfig = webpackConfig({
  env: process.env.NODE_ENV,
  release: true
})

const styleConfig = {
  sourceMap: true,
  modules: false,
  importLoaders: 1,
  localIdentName: '[hash:base64:5]'
}

baseConfig.devtool = false

baseConfig.debug = false

baseConfig.module.loaders.unshift({
  test: /\.font\.js/,
  loader: ExtractTextPlugin
    .extract(
      'style', 'css!postcss!fontgen'
    )
})

baseConfig.module.loaders = baseConfig.module.loaders.concat(
  {
    test: /\.jsx?$/,
    loaders: ['babel'],
    exclude: /node_modules/
  }, {
    test: /\.scss$/,
    loader: ExtractTextPlugin
      .extract(
        'style', `css?${qs.stringify(styleConfig)}!postcss!sass?outputStyle=expanded&includePaths[]=${global.styleRoot}/`
      )
  }
)

baseConfig.plugins = baseConfig.plugins.concat(
  new webpack.optimize.DedupePlugin(),
  new webpack.optimize.UglifyJsPlugin()
)

export default baseConfig
