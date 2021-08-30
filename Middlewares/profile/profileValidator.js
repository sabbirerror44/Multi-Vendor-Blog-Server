//external imports
const { check, validationResult } = require("express-validator");
const createError = require("http-errors");

//internal imports
const User = require("../../models/User");

const linkValidator = value => {
    if(value){
        if(!validator.isURL(value)){
            throw new Error('Please provide a valid url')
        }
    }
    return true;
}

//Profile validator
const profileValidators = [
    check('name')
    .not()
    .isEmpty().withMessage("Name can't be empty")
    .isLength({max:32})
    .trim(),

    check('bio')
    .not()
    .isEmpty().withMessage("Bio can't be empty")
    .trim()
    ,
    check('title')
    .not()
    .isEmpty().withMessage("title can't be empty")
    .trim(),
    check('website')
    .custom(linkValidator)
    ,
    check('facebook')
    .custom(linkValidator)
    ,
    check('youtube')
    .custom(linkValidator)
    ,
    check('github')
    .custom(linkValidator)
];

const profileValidationHandler = function (req, res, next) {
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
  profileValidators,
  profileValidationHandler,
};
