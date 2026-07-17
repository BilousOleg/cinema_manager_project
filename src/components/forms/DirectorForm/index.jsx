import { useDispatch } from 'react-redux';
import { addDirector } from '../../../store/slices/directorsSlice';
import PersonForm from '../PersonForm';

function DirectorForm () {
  const dispatch = useDispatch();

  const handleSubmit = (values, { resetForm }) => {
    dispatch(addDirector(values));
    resetForm();
  };

  return <PersonForm onSubmit={handleSubmit} />;
}

export default DirectorForm;
