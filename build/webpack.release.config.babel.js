import webpack from 'webpack'
import qs from 'qs'
import CleanWebpackPlugin from 'clean-webpack-plugin'
import ExtractTextPlugin from 'extract-text-webpack-plugin'
import getRootPath from './tool/path'
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

baseConfig.module.rules.unshift({
  test: /\.font\.js/,
  use: ExtractTextPlugin.extract({
    fallback: 'style-loader',
    use: ['css-loader', 'postcss-loader', 'webfonts-loader'],
  })
})

baseConfig.module.rules = baseConfig.module.rules.concat(
  {
    test: /\.scss$/,
    use: ExtractTextPlugin.extract({
      fallback: 'style-loader',
      use: [
        `css-loader?${qs.stringify(styleConfig)}`,
        'postcss-loader',
        `sass-loader?outputStyle=expanded&includePaths[]=${global.styleRoot}/`
      ]
    })
  }
)

baseConfig.plugins = baseConfig.plugins.concat(
  new CleanWebpackPlugin('dist', {
    root: getRootPath(),
    verbose: true,
    dry: false
  }),
  new webpack.optimize.OccurrenceOrderPlugin(),
  new webpack.optimize.UglifyJsPlugin({
    sourceMap: true,
    compress: {
      warnings: true
    }
  }),
  new webpack.LoaderOptionsPlugin({
    minimize: true,
    debug: false,
    options: {
      context: getRootPath()
    }
  })
)

export default baseConfig
