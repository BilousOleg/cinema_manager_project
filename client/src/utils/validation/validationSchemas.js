import * as yup from 'yup';

const PERSON_NAME_REGEX = /^[\p{L}\p{M}]+(?:[ '-][\p{L}\p{M}]+)*$/u;
const STUDIO_NAME_REGEX =
  /^[\p{L}\p{M}\p{N}]+(?:[ .,'&()\/-]+[\p{L}\p{M}\p{N}]+)*\.?$/u;

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

const countryField = yup
  .number()
  .transform((value, originalValue) => (originalValue === '' ? null : value))
  .integer('Country must be a valid country')
  .positive('Country must be a valid country')
  .nullable();

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
    );

const urlField = yup
  .string()
  .trim()
  .test(
    'url-or-empty',
    'Enter a valid URL',
    value => !value || yup.string().url().isValidSync(value)
  );

const longTextField = fieldName =>
  yup
    .string()
    .trim()
    .max(2000, `${fieldName} must contain at most 2000 characters`);

export const MOVIE_VALIDATION_SCHEMA = yup.object({
  title: nameField('Title', 1, 100),
  genreId: yup.number().required('Genre is required'),
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
    ),
  directorId: yup.string().required('Director is required'),
  actorIds: yup
    .array()
    .min(1, 'Select at least one actor')
    .required('Select at least one actor'),
  studioId: yup.string().required('Studio is required'),
  description: longTextField('Description'),
});

export const PERSON_VALIDATION_SCHEMA = yup.object({
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
    }),
  countryId: countryField,
  photo: urlField,
  biography: longTextField('Biography'),
});

export const STUDIO_VALIDATION_SCHEMA = yup.object({
  studioName: nameField('Name', 2, 50, STUDIO_NAME_REGEX),
  countryId: countryField,
  founded: yearField('Foundation year', 1800),
  logo: urlField,
  description: longTextField('Description'),
});
