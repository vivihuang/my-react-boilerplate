module.exports = {
  plugins: [
    require('autoprefixer')({
      add: true,
      remove: true,
      browsers: ['last 5 versions']
    }),
    require('cssnano')({
      discardComments: {
        removeAll: true
      },
      discardUnused: false,
      mergeIdents: false,
      reduceIdents: false,
      safe: true,
      sourcemap: true
    })
  ]
}