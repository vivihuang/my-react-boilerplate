import webpack from 'webpack'
import AssetsPlugin from 'assets-webpack-plugin'
import CleanWebpackPlugin from 'clean-webpack-plugin'
import getRootPath from './tool/path'

const vendors = [
  "autobind-decorator",
  "bootstrap-sass",
  "classnames",
  "flux-standard-action",
  "history",
  "immutable",
  "isomorphic-fetch",
  "joi-browser",
  "lodash",
  "qs",
  "react",
  "react-bootstrap",
  "react-dom",
  "react-intl",
  "react-redux",
  "react-router",
  "react-router-redux",
  "redux",
  "redux-actions",
  "redux-promise"
]

export default {
  output: {
    path: getRootPath('dll'),
    filename: '[name]_[hash:8].js',
    library: '[name]_[hash:8]',
  },
  entry: {
    'vendor': vendors,
  },
  plugins: [
    new CleanWebpackPlugin('dll', {
      root: getRootPath(),
      verbose: true,
      dry: false
    }),
    new AssetsPlugin({
      filename: 'assets.json',
      path: getRootPath('dll'),
      prettyPrint: true
    }),
    new webpack.DllPlugin({
      path: getRootPath('dll', 'manifest.json'),
      name: '[name]_[hash:8]' ,
      context: getRootPath(),
    }),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: true,
      compress: {
        warnings: true
      }
    })
  ]
}