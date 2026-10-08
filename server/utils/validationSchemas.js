const yup = require('yup');

const integerValidationSchema = name =>
  yup
    .number()
    .typeError(`${name} must be a number`)
    .integer(`${name} must be an integer`)
    .min(1, `${name} must be greater than 0`);

module.exports.ID_VALIDATION_SCHEMA = integerValidationSchema('Id');

module.exports.LIMIT_VALIDATION_SCHEMA =
  integerValidationSchema('Limit').default(3);
