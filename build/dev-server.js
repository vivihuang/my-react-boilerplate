import webpack from 'webpack'
import WebpackDevServer from 'webpack-dev-server'
import Dashboard from 'webpack-dashboard'
import DashboardPlugin from 'webpack-dashboard/plugin'

import config from './webpack.dev.config.babel'
import getRootPath from './tool/path'

const env = process.env.NODE_ENV || 'dev'
const envConfig = require(getRootPath('env', env)).default
const compiler = webpack(config)

const dashboard = new Dashboard()

compiler.apply(new DashboardPlugin(dashboard.setData))
const server = new WebpackDevServer(compiler, {
  hot: true,
  quiet: true,
  noInfo: false,
  proxy: envConfig.server ? {
    '/api/*': {
      target: envConfig.server
    }
  } : null
})

server.listen(5000)
