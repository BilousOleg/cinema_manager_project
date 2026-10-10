const yup = require('yup');

const positiveIntegerValidationSchema = (fieldName, defaultValue) =>
  yup
    .number()
    .typeError(`${fieldName} must be a number`)
    .integer(`${fieldName} must be an integer`)
    .min(1, `${fieldName} must be greater than 0`)
    .default(defaultValue);

module.exports.ID_VALIDATION_SCHEMA = positiveIntegerValidationSchema('Id');

module.exports.LIMIT_VALIDATION_SCHEMA = positiveIntegerValidationSchema(
  'Limit',
  3
);

module.exports.PAGINATION_VALIDATION_SCHEMA = yup.object({
  page: positiveIntegerValidationSchema('Page', 1),
  results: positiveIntegerValidationSchema('Results', 10).max(
    100,
    'Results must not exceed 100'
  ),
});
