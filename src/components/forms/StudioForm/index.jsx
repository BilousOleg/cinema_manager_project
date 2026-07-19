import { Formik, Form } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import CheckIcon from '@mui/icons-material/Check';
import { STUDIO_VALIDATION_SCHEMA } from '../../../utils/validation/validationSchemas';
import { addStudio, updateStudio } from '../../../store/slices/studiosSlice';
import { closeService } from '../../../store/slices/serviceSlice';
import TextField from '../../fields/TextField';
import TextAreaField from '../../fields/TextAreaField';
import styles from './StudioForm.module.sass';
import CONSTANTS from '../../../constants';

const {
  EMPTY_FORM_VALUES: { EMPTY_STUDIO },
} = CONSTANTS;

function StudioForm ({ selectedId }) {
  const dispatch = useDispatch();

  const { studios } = useSelector(state => state.studios);
  const currentStudio = selectedId
    ? studios.find(s => s.id === selectedId)
    : null;

  const formInitialValues = currentStudio
    ? {
        ...currentStudio,
        genreId: String(currentStudio.genreId),
      }
    : EMPTY_STUDIO;

  const handleSubmit = (values, { resetForm }) => {
    const action = selectedId ? updateStudio : addStudio;
    dispatch(action(values));
    resetForm();
    dispatch(closeService());
  };

  return (
    <Formik
      initialValues={formInitialValues}
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
