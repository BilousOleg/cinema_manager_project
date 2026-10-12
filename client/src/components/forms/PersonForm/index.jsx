import { Formik, Form } from 'formik';
import { useSelector } from 'react-redux';
import CheckIcon from '@mui/icons-material/Check';
import { PERSON_VALIDATION_SCHEMA } from '../../../utils/validation/validationSchemas';
import { selectCountries } from '../../../store/slices/countriesSlice';
import TextField from '../../fields/TextField';
import DateField from '../../fields/DateField';
import SelectField from '../../fields/SelectField';
import TextAreaField from '../../fields/TextAreaField';
import styles from './PersonForm.module.sass';

function PersonForm ({ initialValues, onSubmit }) {
  const countries = useSelector(selectCountries);

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={PERSON_VALIDATION_SCHEMA}
      enableReinitialize
    >
      <Form className={styles.form}>
        <TextField name='firstName' placeholder='First name' />
        <TextField name='lastName' placeholder='Last name' />
        <DateField name='birthDate' />
        <SelectField
          name='countryId'
          label='Country'
          items={countries}
          getValue={c => c.id}
          getLabel={c => c.countryName}
          placeholder='Choose country'
        />
        <TextField name='photo' placeholder='Photo URL' />
        <TextAreaField name='biography' placeholder='Biography...' />
        <button type='submit' className={styles.submitBtn}>
          <CheckIcon />
          <span>SAVE</span>
        </button>
      </Form>
    </Formik>
  );
}

export default PersonForm;
