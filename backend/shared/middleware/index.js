module.exports = {
  ...require('./auth.middleware'),
  ...require('./errorHandler'),
  ...require('./validation')
};