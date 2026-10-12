import { useEffect } from 'react';
import { Formik, Form } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import CheckIcon from '@mui/icons-material/Check';
import { STUDIO_VALIDATION_SCHEMA } from '../../../utils/validation/validationSchemas';
import { selectCountries } from '../../../store/slices/countriesSlice';
import {
  clearCurrentStudio,
  createStudioThunk,
  loadStudioByIdThunk,
  loadStudiosThunk,
  updateStudioThunk,
} from '../../../store/slices/studiosSlice';
import { closeService } from '../../../store/slices/serviceSlice';
import { showNotification } from '../../../store/slices/notificationSlice';
import { toStudioFormValues } from '../../../utils/formValues';
import TextField from '../../fields/TextField';
import SelectField from '../../fields/SelectField';
import TextAreaField from '../../fields/TextAreaField';
import styles from './StudioForm.module.sass';
import CONSTANTS from '../../../constants';

const {
  EMPTY_FORM_VALUES: { EMPTY_STUDIO },
  DEFAULT_PAGE,
  DEFAULT_RESULTS,
} = CONSTANTS;

function StudioForm ({ selectedId }) {
  const [searchParams] = useSearchParams();
  const dispatch = useDispatch();

  const countries = useSelector(selectCountries);
  const { currentStudio, isFetching } = useSelector(state => state.studios);

  const page = Math.max(1, Number(searchParams.get('page')) || DEFAULT_PAGE);

  const results = Math.max(
    1,
    Number(searchParams.get('results')) || DEFAULT_RESULTS
  );

  useEffect(() => {
    if (selectedId) {
      dispatch(loadStudioByIdThunk(selectedId));
    } else {
      dispatch(clearCurrentStudio());
    }
  }, [selectedId, dispatch]);

  const formInitialValues = currentStudio
    ? toStudioFormValues(currentStudio)
    : EMPTY_STUDIO;

  const handleSubmit = async (values, { resetForm }) => {
    const action = selectedId ? updateStudioThunk : createStudioThunk;

    try {
      await dispatch(
        action(selectedId ? { id: selectedId, studio: values } : values)
      ).unwrap();

      await dispatch(loadStudiosThunk({ page, results })).unwrap();

      resetForm();
      dispatch(closeService());

      dispatch(
        showNotification({
          message: selectedId
            ? 'Studio updated successfully'
            : 'Studio created successfully',
          type: 'success',
        })
      );
    } catch (err) {
      dispatch(
        showNotification({
          message: err || 'Failed to save studio',
          type: 'error',
        })
      );
    }
  };

  if (selectedId && isFetching && !currentStudio) {
    return <p>Loading actor...</p>;
  }

  if (selectedId && !currentStudio) {
    return null;
  }

  return (
    <Formik
      initialValues={formInitialValues}
      onSubmit={handleSubmit}
      validationSchema={STUDIO_VALIDATION_SCHEMA}
      enableReinitialize
    >
      <Form className={styles.form}>
        <TextField name='studioName' placeholder='Studio name' />
        <SelectField
          name='countryId'
          label='Country'
          items={countries}
          getValue={c => c.id}
          getLabel={c => c.countryName}
          placeholder='Choose country'
        />
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
