import webpack from 'webpack'
import qs from 'qs'
import getRootPath from './tool/path'
import webpackConfig from './webpack.base.config.babel'

process.env.NODE_ENV = process.env.NODE_ENV || 'dev'

const baseConfig = webpackConfig({
  env: process.env.NODE_ENV,
  release: false
})

const styleConfig = {
  sourceMap: false,
  modules: false,
  importLoaders: 1,
  localIdentName: '[path]--[local]--[hash:base64:5]'
}

baseConfig.entry.app.unshift(
  require.resolve('react-dev-utils/webpackHotDevClient')
)

baseConfig.output.publicPath = '/'

baseConfig.module.rules.unshift({
  test: /\.font\.js$/,
  use: ['style-loader', 'css-loader', 'postcss-loader', 'webfonts-loader']
})

baseConfig.module.rules = baseConfig.module.rules.concat(
  {
    test: /\.scss$/,
    use: [
      'style-loader',
      `css-loader?${qs.stringify(styleConfig)}`,
      'postcss-loader',
      `sass-loader?outputStyle=expanded&includePaths[]=${global.styleRoot}/`
    ]
  }
)

baseConfig.output.publicPath = '/'

baseConfig.plugins = baseConfig.plugins.concat(
  new webpack.HotModuleReplacementPlugin(),
  new webpack.NamedModulesPlugin(),
  new webpack.LoaderOptionsPlugin({
    debug: true,
    options: {
      context: getRootPath()
    }
  })
)

export default baseConfig
