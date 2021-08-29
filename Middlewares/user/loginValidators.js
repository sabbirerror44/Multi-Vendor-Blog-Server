const { check, validationResult } = require("express-validator");

const doLoginValidators = [
  check("email")
    .not()
    .isEmpty().withMessage("Email is required"),

  check("password").isLength({ min: 4 }).withMessage("Password must have more than 4 characters"),
];

const doLoginValidationHandler = function (req, res, next) {
  const errors = validationResult(req);
  const mappedErrors = errors.mapped();

  if (Object.keys(mappedErrors).length === 0) {
    next();
  } else {
    // response the errors
    res.status(500).json({
      errors: mappedErrors,
    });
  }
};

module.exports = {
  doLoginValidators,
  doLoginValidationHandler,
};
