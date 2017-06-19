const data = { content: 'this is a test' }

module.exports = (req, res, next) => {
  res.send(200, data)
  next()
}
