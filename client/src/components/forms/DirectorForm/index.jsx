import { useDispatch, useSelector } from 'react-redux';
import {
  addDirectorThunk,
  updateDirectorThunk,
} from '../../../store/slices/directorsSlice';
import { closeService } from '../../../store/slices/serviceSlice';
import PersonForm from '../PersonForm';
import CONSTANTS from '../../../constants';

const {
  EMPTY_FORM_VALUES: { EMPTY_DIRECTOR },
} = CONSTANTS;

function DirectorForm ({ selectedId }) {
  const dispatch = useDispatch();

  const { directors } = useSelector(state => state.directors);
  const currentDirector = selectedId
    ? directors.find(d => d.id === selectedId)
    : null;

  const formInitialValues = currentDirector
    ? {
        ...currentDirector,
        genreId: String(currentDirector.genreId),
      }
    : EMPTY_DIRECTOR;

  const handleSubmit = (values, { resetForm }) => {
    const action = selectedId ? updateDirectorThunk : addDirectorThunk;
    dispatch(action(values));
    resetForm();
    dispatch(closeService());
  };

  return (
    <PersonForm initialValues={formInitialValues} onSubmit={handleSubmit} />
  );
}

export default DirectorForm;
