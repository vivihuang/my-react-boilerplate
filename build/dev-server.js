import webpack from 'webpack'
import WebpackDevServer from 'webpack-dev-server'
import { isEmpty } from 'lodash'

import config from './webpack.dev.config.babel'
import getRootPath from './tool/path'

const env = process.env.NODE_ENV || 'dev'
const envConfig = require(getRootPath('env', env))
const compiler = webpack(config)

const server = new WebpackDevServer(compiler, {
  compress: true,
  clientLogLevel: 'none',
  publicPath: config.output.publicPath,
  hot: true,
  quiet: true,
  noInfo: false,
  watchOptions: {
    ignored: /node_modules/,
  },
  historyApiFallback: true,
  proxy: isEmpty(envConfig.server)
    ? {}
    : {
      '/api/*': {
        target: envConfig.server
      }
    }
})

server.listen(5000)
