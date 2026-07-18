import * as yup from 'yup';

export const MOVIE_VALIDATION_SCHEMA = yup.object();

export const PERSON_VALIDATION_SCHEMA = yup.object({
  firstName: yup
    .string()
    .trim()
    .required('First name is required')
    .min(MIN_LENGTH, `Minimum ${MIN_LENGTH} characters required`)
    .max(MAX_LENGTH, `Maximum ${MAX_LENGTH} characters`),
});

export const STUDIO_VALIDATION_SCHEMA = yup.object();
