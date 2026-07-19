import { Formik, Form } from 'formik';
import { useDispatch } from 'react-redux';
import CheckIcon from '@mui/icons-material/Check';
import { STUDIO_VALIDATION_SCHEMA } from '../../../utils/validation/validationSchemas';
import TextField from '../../fields/TextField';
import TextAreaField from '../../fields/TextAreaField';
import { addStudio } from '../../../store/slices/studiosSlice';
import styles from './StudioForm.module.sass';

const initialValues = {
  name: '',
  country: '',
  founded: '',
  logo: '',
  description: '',
};

function StudioForm () {
  const dispatch = useDispatch();

  const handleSubmit = (values, { resetForm }) => {
    dispatch(addStudio(values));
    resetForm();
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleSubmit}
      validationSchema={STUDIO_VALIDATION_SCHEMA}
      enableReinitialize
    >
      <Form className={styles.form}>
        <TextField name='name' placeholder='Studio name' />
        <TextField name='country' placeholder='Country' />
        <TextField
          name='founded'
          placeholder='Year of foundation'
          inputMode='numeric'
          maxLength={4}
          normalize={value => value.replace(/\D/g, '').slice(0, 4)}
        />
        <TextField name='logo' placeholder='Logo URL' />
        <TextAreaField
          name='description'
          placeholder='Description...'
          rows={6}
        />
        <button type='submit' className={styles.submitBtn}>
          <CheckIcon />
          <span>SAVE</span>
        </button>
      </Form>
    </Formik>
  );
}

export default StudioForm;
