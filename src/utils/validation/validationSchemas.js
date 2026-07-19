import * as yup from 'yup';

const nameField = (fieldName, minChars, maxChars) =>
  yup
    .string()
    .trim()
    .min(minChars, `${fieldName} must contain at least ${minChars} characters`)
    .max(maxChars, `${fieldName} must contain at most ${maxChars} characters`)
    .matches(/^[A-Za-z' -]+$/, `${fieldName} contains invalid characters`)
    .required(`${fieldName} is required`);

const countryField = yup
  .string()
  .trim()
  .min(2, 'Country must contain at least 2 characters')
  .max(50, 'Country must contain at most 50 characters')
  .required('Country is required');

const yearField = (label, minYear) =>
  yup
    .string()
    .required(`${label} is required`)
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
  firstName: nameField('First name', 2, 50),
  lastName: nameField('Last name', 2, 50),
  birthDate: yup
    .string()
    .required('Birth date is required')
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
  country: countryField,
  photo: urlField,
  biography: longTextField('Biography'),
});

export const STUDIO_VALIDATION_SCHEMA = yup.object({
  name: nameField('Name', 2, 50),
  country: countryField,
  founded: yearField('Foundation year', 1800),
  logo: urlField,
  description: longTextField('Description'),
});
