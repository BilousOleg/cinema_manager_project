const yup = require('yup');

const PERSON_NAME_REGEX = /^[\p{L}\p{M}]+(?:[ '-][\p{L}\p{M}]+)*$/u;
const STUDIO_NAME_REGEX =
  /^[\p{L}\p{M}\p{N}]+(?:[ .,'&()/-]+[\p{L}\p{M}\p{N}]+)*\.?$/u;

const positiveIntegerValidationSchema = (fieldName, defaultValue) =>
  yup
    .number()
    .typeError(`${fieldName} must be a number`)
    .integer(`${fieldName} must be an integer`)
    .min(1, `${fieldName} must be greater than 0`)
    .default(defaultValue);

const ID_VALIDATION_SCHEMA = yup.string().uuid();

module.exports.ID_VALIDATION_SCHEMA = ID_VALIDATION_SCHEMA;

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

const nameField = (fieldName, minChars, maxChars, regExp = null) => {
  let schema = yup
    .string()
    .trim()
    .min(minChars, `${fieldName} must contain at least ${minChars} characters`)
    .max(maxChars, `${fieldName} must contain at most ${maxChars} characters`)
    .required(`${fieldName} is required`);

  if (regExp) {
    schema = schema.matches(regExp, `${fieldName} contains invalid characters`);
  }

  return schema;
};

const countryIdField = ID_VALIDATION_SCHEMA.nullable().optional();

const yearField = (label, minYear) =>
  yup
    .string()
    .length(4, `${label} must consist of 4 digits`)
    .test(
      'year-range',
      `${label} must be between ${minYear} and ${new Date().getFullYear()}`,
      value => {
        if (!value) return true;

        const year = Number(value);

        return (
          Number.isInteger(year) &&
          year >= minYear &&
          year <= new Date().getFullYear()
        );
      }
    )
    .nullable();

const urlField = yup
  .string()
  .trim()
  .test(
    'url-or-empty',
    'Enter a valid URL',
    value => !value || yup.string().url().isValidSync(value)
  )
  .nullable();

const arrayField = fieldName =>
  yup
    .array()
    .min(1, `Select at least one ${fieldName}`)
    .required(`Select at least one actor ${fieldName}`);

const longTextField = fieldName =>
  yup
    .string()
    .trim()
    .max(2000, `${fieldName} must contain at most 2000 characters`)
    .nullable();

module.exports.MOVIE_VALIDATION_SCHEMA = yup.object({
  title: nameField('Title', 1, 100),
  genreIds: arrayField('genre'),
  year: yearField('Release year', 1800),
  poster: urlField,
  trailer: yup
    .string()
    .trim()
    .test(
      'youtube-url-or-empty',
      'Enter a valid YouTube URL',
      value =>
        !value ||
        /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be)\//.test(value)
    )
    .nullable(),
  directorIds: arrayField('director'),
  actorIds: arrayField('actor'),
  studioIds: arrayField('studio'),
  description: longTextField('Description'),
});

module.exports.PERSON_VALIDATION_SCHEMA = yup.object({
  firstName: nameField('First name', 2, 50, PERSON_NAME_REGEX),
  lastName: nameField('Last name', 2, 50, PERSON_NAME_REGEX),
  birthDate: yup
    .string()
    .test('not-in-future', 'Birth date cannot be in the future', value => {
      if (!value) {
        return true;
      }
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      const birthDate = new Date(value);
      birthDate.setHours(0, 0, 0, 0);

      return birthDate <= today;
    })
    .nullable(),
  countryId: countryIdField,
  photo: urlField,
  biography: longTextField('Biography'),
});

module.exports.STUDIO_VALIDATION_SCHEMA = yup.object({
  studioName: nameField('Studio name', 2, 50, STUDIO_NAME_REGEX),
  countryId: countryIdField,
  founded: yearField('Foundation year', 1800),
  logo: urlField,
  description: longTextField('Description'),
});
