const { validationResult } = require('express-validator');
const { isEmpty } = require('lodash');
const ErrorHandler = require('./errorHandler.util');

const PayloadValidationErrorsUtil = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return next(new ErrorHandler(errors['errors'][0].msg, 400));
  }

  next();
};

module.exports = PayloadValidationErrorsUtil;
