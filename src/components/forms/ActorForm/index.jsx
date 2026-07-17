import { useDispatch } from 'react-redux';
import { addActor } from '../../../store/slices/actorsSlice';
import PersonForm from '../PersonForm';

function ActorForm () {
  const dispatch = useDispatch();

  const handleSubmit = (values, { resetForm }) => {
    dispatch(addActor(values));
    resetForm();
  };

  return <PersonForm onSubmit={handleSubmit} />;
}

export default ActorForm;
