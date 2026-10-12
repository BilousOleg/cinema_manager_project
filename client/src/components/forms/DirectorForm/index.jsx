import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import {
  clearCurrentDirector,
  createDirectorThunk,
  loadDirectorByIdThunk,
  loadDirectorsThunk,
  updateDirectorThunk,
} from '../../../store/slices/directorsSlice';
import { closeService } from '../../../store/slices/serviceSlice';
import { showNotification } from '../../../store/slices/notificationSlice';
import { toPersonFormValues } from '../../../utils/formValues';
import PersonForm from '../PersonForm';
import CONSTANTS from '../../../constants';

const {
  EMPTY_FORM_VALUES: { EMPTY_DIRECTOR },
  DEFAULT_PAGE,
  DEFAULT_RESULTS,
} = CONSTANTS;

function DirectorForm ({ selectedId }) {
  const [searchParams] = useSearchParams();
  const dispatch = useDispatch();

  const { currentDirector, isFetching } = useSelector(state => state.directors);

  const page = Math.max(1, Number(searchParams.get('page')) || DEFAULT_PAGE);

  const results = Math.max(
    1,
    Number(searchParams.get('results')) || DEFAULT_RESULTS
  );

  useEffect(() => {
    if (selectedId) {
      dispatch(loadDirectorByIdThunk(selectedId));
    } else {
      dispatch(clearCurrentDirector());
    }
  }, [selectedId, dispatch]);

  const formInitialValues = currentDirector
    ? toPersonFormValues(currentDirector)
    : EMPTY_DIRECTOR;

  const handleSubmit = async (values, { resetForm }) => {
    const action = selectedId ? updateDirectorThunk : createDirectorThunk;

    try {
      await dispatch(
        action(selectedId ? { id: selectedId, director: values } : values)
      ).unwrap();

      await dispatch(loadDirectorsThunk({ page, results })).unwrap();

      resetForm();
      dispatch(closeService());

      dispatch(
        showNotification({
          message: selectedId
            ? 'Director updated successfully'
            : 'Director created successfully',
          type: 'success',
        })
      );
    } catch (err) {
      dispatch(
        showNotification({
          message: err || 'Failed to save director',
          type: 'error',
        })
      );
    }
  };

  if (selectedId && isFetching && !currentDirector) {
    return <p>Loading actor...</p>;
  }

  if (selectedId && !currentDirector) {
    return null;
  }

  return (
    <PersonForm initialValues={formInitialValues} onSubmit={handleSubmit} />
  );
}

export default DirectorForm;
