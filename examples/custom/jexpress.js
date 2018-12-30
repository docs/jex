// Empty config file

module.exports = {
  beforeContext: (req, res, next) => {
    // console.log('I am beforeContext')
    next()
  }
}
