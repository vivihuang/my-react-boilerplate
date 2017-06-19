import formatWebpackMessages from 'react-dev-utils/formatWebpackMessages'
import openBrowser from 'react-dev-utils/openBrowser'
import { choosePort } from 'react-dev-utils/WebpackDevServerUtils'
import webpack from 'webpack'
import WebpackDevServer from 'webpack-dev-server'
import chalk from 'chalk'
import chokidar from 'chokidar'
import { isEmpty } from 'lodash'

import config from './webpack.dev.config.babel'
import getRootPath from './tool/path'

const env = process.env.NODE_ENV || 'dev'
const envConfig = require(getRootPath('env', env))

const DEFAULT_PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 8000

let compiler

function setupCompiler(host, port, protocol) {
  try {
    compiler = webpack(config)
  } catch (e) {
    console.log(e)
  }

  compiler.plugin('invalid', () => {
    console.log('Compiling...')
  })

  let isFirstCompile = true
  compiler.plugin('done', (stats) => {
    const json = stats.toJson({}, true)
    const messages = formatWebpackMessages(json)
    const isSuccessful = !messages.errors.length && !messages.warnings.length
    const showInstructions = isSuccessful && isFirstCompile

    if (isSuccessful) {
      if (stats.stats) {
        console.log(chalk.green('Compiled successfully'))
      } else {
        console.log(chalk.green(`Compiled successfully in ${(json.time / 1000).toFixed(1)}s!`))
      }
    }

    if (showInstructions) {
      console.log()
      console.log('The app is running at:')
      console.log()
      console.log(`  ${chalk.cyan(`${protocol}://${host}:${port}/`)}`)
      console.log()
      console.log('Note that the development build is not optimized.')
      console.log(`To create a production build, use ${chalk.cyan('npm run build')}.`)
      console.log()
      isFirstCompile = false
    }

    // If errors exist, only show errors.
    if (messages.errors.length) {
      console.log(chalk.red('Failed to compile.'))
      console.log()
      messages.errors.forEach((message) => {
        console.log(message)
        console.log()
      })

      // Show warnings if no errors were found.
    } else if (messages.warnings.length) {
      console.log(chalk.yellow('Compiled with warnings.'))
      console.log()
      messages.warnings.forEach((message) => {
        console.log(message)
        console.log()
      })
      // Teach some ESLint tricks.
      console.log('You may use special comments to disable some warnings.')
      console.log(`Use ${chalk.yellow('// eslint-disable-next-line')} to ignore the next line.`)
      console.log(`Use ${chalk.yellow('/* eslint-disable */')} to ignore all warnings in a file.`)
      console.log()
    }
  })
}

function runDevServer(host, port, protocol) {
  const devServer = new WebpackDevServer(compiler, {
    disableHostCheck: true,
    compress: true,
    clientLogLevel: 'none',
    contentBase: config.output.path,
    hot: true,
    publicPath: config.output.publicPath,
    quiet: true,
    watchOptions: {
      ignored: /node_modules/,
    },
    https: protocol === 'https',
    host,
    historyApiFallback: true,
    proxy: isEmpty(envConfig.server)
      ? {}
      : {
        '/api/*': {
          target: envConfig.server
        }
      }
  })

  devServer.listen(port, '0.0.0.0', (err) => {
    if (err) {
      return console.log(err)
    }

    process.send('READY')

    console.log(chalk.cyan('Starting the development server...'))
    console.log()

    openBrowser(`${protocol}://${host}:${port}/`)
  })

  setupWatch(devServer, port)
}

function setupWatch(devServer) {
  const files = [
    getRootPath('build/*'),
    getRootPath('.babelrc'),
    getRootPath('..eslintignore'),
    getRootPath('.eslintrc'),
    getRootPath('.stylelintrc'),
    getRootPath('package.json')
  ]
  const watcher = chokidar.watch(files, {
    ignored: /node_modules/,
    persistent: true,
  })
  watcher.on('change', (path) => {
    console.log(chalk.green(`File ${path.replace(getRootPath(), './')} changed, try to restart server`))
    watcher.close()
    devServer.close()
    process.send('RESTART')
  })
}

const run = (port) => {
  const protocol = process.env.HTTPS === 'true' ? 'https' : 'http'
  const host = process.env.HOST || 'localhost'
  setupCompiler(host, port, protocol)
  runDevServer(host, port, protocol)
}

const init = () => {
  const HOST = process.env.HOST || '0.0.0.0'

  choosePort(HOST, DEFAULT_PORT).then((port) => {
    if (port === null) {
      return
    }

    try {
      run(port)
    } catch (e) {
      console.log(e)
    }
  })
}

init()
