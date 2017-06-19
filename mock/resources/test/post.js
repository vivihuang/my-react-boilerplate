module.exports = (req, res, next) => {
  res.send(200, 'Post successful!')
  next()
}
