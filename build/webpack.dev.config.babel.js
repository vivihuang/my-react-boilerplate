import webpack from 'webpack'
import qs from 'qs'
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
  'webpack/hot/dev-server',
  'webpack-dev-server/client?http://0.0.0.0:5000'
)

baseConfig.output.publicPath = '/'

baseConfig.module.loaders.unshift({
  test: /\.font\.js$/,
  loaders: ['style', 'css', 'postcss', 'fontgen']
})

baseConfig.module.loaders = baseConfig.module.loaders.concat(
  {
    test: /\.scss$/,
    loader: `style!css?${qs.stringify(styleConfig)}!postcss!sass?outputStyle=expanded&includePaths[]=${global.styleRoot}/`
  }
)

baseConfig.output.publicPath = '/'

baseConfig.plugins = baseConfig
  .plugins
  .concat([
    new webpack.HotModuleReplacementPlugin()
  ])

export default baseConfig
