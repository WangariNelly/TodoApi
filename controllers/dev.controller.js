const { CatchAsyncErrors } = require('../utils/catchAsyncErrors');
const ErrorHandler = require('../utils/errorHandler.util');

exports.devTest = CatchAsyncErrors(async (req, res, next) => {
  if (req.errored) {
    return next(new ErrorHandler('Server is down', 403));
  }
  return res.status(200).json({
    success: true,
    message: 'Server is running',
  });
});
