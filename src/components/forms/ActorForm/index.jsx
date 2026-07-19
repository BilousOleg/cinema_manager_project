import { useDispatch, useSelector } from 'react-redux';
import { addActor, updateActor } from '../../../store/slices/actorsSlice';
import { closeService } from '../../../store/slices/serviceSlice';
import PersonForm from '../PersonForm';
import CONSTANTS from '../../../constants';

const {
  EMPTY_FORM_VALUES: { EMPTY_ACTOR },
} = CONSTANTS;

function ActorForm ({ selectedId }) {
  const dispatch = useDispatch();

  const { actors } = useSelector(state => state.actors);
  const currentDirector = selectedId
    ? actors.find(a => a.id === selectedId)
    : null;

  const formInitialValues = currentDirector
    ? {
        ...currentDirector,
        genreId: String(currentDirector.genreId),
      }
    : EMPTY_ACTOR;

  const handleSubmit = (values, { resetForm }) => {
    const action = selectedId ? updateActor : addActor;
    dispatch(action(values));
    resetForm();
    dispatch(closeService());
  };

  return (
    <PersonForm initialValues={formInitialValues} onSubmit={handleSubmit} />
  );
}

export default ActorForm;
