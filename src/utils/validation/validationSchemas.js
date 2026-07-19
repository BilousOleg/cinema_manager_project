import * as yup from 'yup';

const nameField = fieldName =>
  yup
    .string()
    .trim()
    .min(2, `${fieldName} must contain at least 2 characters`)
    .max(50, `${fieldName} must contain at most 50 characters`)
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

export const MOVIE_VALIDATION_SCHEMA = yup.object();

export const PERSON_VALIDATION_SCHEMA = yup.object({
  firstName: nameField('First name'),
  lastName: nameField('Last name'),
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
  name: nameField('Name'),
  country: countryField,
  founded: yearField('Foundation year', 1800),
  logo: urlField,
  description: longTextField('Description'),
});
