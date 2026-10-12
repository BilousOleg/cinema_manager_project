import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import {
  createActorThunk,
  loadActorsThunk,
  loadActorByIdThunk,
  updateActorThunk,
  clearCurrentActor,
} from '../../../store/slices/actorsSlice';
import { closeService } from '../../../store/slices/serviceSlice';
import { showNotification } from '../../../store/slices/notificationSlice';
import { toPersonFormValues } from '../../../utils/formValues';
import PersonForm from '../PersonForm';
import CONSTANTS from '../../../constants';

const {
  EMPTY_FORM_VALUES: { EMPTY_ACTOR },
  DEFAULT_PAGE,
  DEFAULT_RESULTS,
} = CONSTANTS;

function ActorForm ({ selectedId }) {
  const [searchParams] = useSearchParams();
  const dispatch = useDispatch();

  const { currentActor, isFetching } = useSelector(state => state.actors);

  const page = Math.max(1, Number(searchParams.get('page')) || DEFAULT_PAGE);

  const results = Math.max(
    1,
    Number(searchParams.get('results')) || DEFAULT_RESULTS
  );

  useEffect(() => {
    if (selectedId) {
      dispatch(loadActorByIdThunk(selectedId));
    } else {
      dispatch(clearCurrentActor());
    }
  }, [selectedId, dispatch]);

  const formInitialValues = currentActor
    ? toPersonFormValues(currentActor)
    : EMPTY_ACTOR;

  const handleSubmit = async (values, { resetForm }) => {
    const action = selectedId ? updateActorThunk : createActorThunk;

    try {
      await dispatch(
        action(selectedId ? { id: selectedId, actor: values } : values)
      ).unwrap();

      await dispatch(loadActorsThunk({ page, results })).unwrap();

      resetForm();
      dispatch(closeService());

      dispatch(
        showNotification({
          message: selectedId
            ? 'Actor updated successfully'
            : 'Actor created successfully',
          type: 'success',
        })
      );
    } catch (err) {
      dispatch(
        showNotification({
          message: err || 'Failed to save actor',
          type: 'error',
        })
      );
    }
  };

  if (selectedId && isFetching && !currentActor) {
    return <p>Loading actor...</p>;
  }

  if (selectedId && !currentActor) {
    return null;
  }

  return (
    <PersonForm initialValues={formInitialValues} onSubmit={handleSubmit} />
  );
}

export default ActorForm;
