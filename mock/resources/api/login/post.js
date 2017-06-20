module.exports = (req, res, next) => {
  const { username, password } = req.body
  if (username === 'vivi' && password === '1206') {
    res.send(200, { username, role: 'admin' })
  } else {
    res.send(401)
  }
  next()
}
