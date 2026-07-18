import { Formik, Form } from 'formik';
import CheckIcon from '@mui/icons-material/Check';
import TextField from '../../fields/TextField';
import DateField from '../../fields/DateField';
import TextAreaField from '../../fields/TextAreaField';
import styles from './PersonForm.module.sass';

const initialValues = {
  firstName: '',
  lastName: '',
  birthDate: '',
  country: '',
  photo: '',
  biography: '',
};

function PersonForm ({
  // validationSchema,
  onSubmit,
}) {
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      enableReinitialize
    >
      {({ dirty, isValid, isSubmitting }) => (
        <Form className={styles.form}>
          <TextField name='firstName' placeholder='First name' />
          <TextField name='lastName' placeholder='Last name' />
          <DateField name='birthDate' />
          <TextField name='country' placeholder='Country' />
          <TextField name='photo' placeholder='Photo URL' />
          <TextAreaField name='biography' placeholder='Biography...' rows={6} />
          <button
            type='submit'
            className={styles.submitBtn}
            disabled={!dirty || !isValid || isSubmitting}
          >
            <CheckIcon />
            <span>SAVE</span>
          </button>
        </Form>
      )}
    </Formik>
  );
}

export default PersonForm;
