import { useDispatch, useSelector } from 'react-redux';
import { deleteDirector } from '../../store/slices/directorsSlice';
import { openEntityForm } from '../../store/slices/serviceSlice';
import defaultPhoto from './../../assets/defaultImages/defaultPhoto.png';
import EntityPage from '../EntityPage';
import CONSTANTS from '../../constants';

const {
  ENTITIES: { DIRECTORS },
  SERVICE_MODES: { CREATE },
} = CONSTANTS;

function DirectorsPage () {
  const { directors } = useSelector(state => state.directors);

  const dispatch = useDispatch();

  const deleteDirectorById = id => {
    dispatch(deleteDirector(id));
  };

  const addDirector = () => {
    dispatch(openEntityForm({ entity: DIRECTORS, mode: CREATE }));
  };

  return (
    <EntityPage
      title='Directors List'
      items={directors}
      entity='directors'
      addButtonText='ADD DIRECTOR'
      onAdd={addDirector}
      // onEdit={}
      onDelete={deleteDirectorById}
      getImage={d => d.photo || defaultPhoto}
      getPrimaryText={d => `${d.firstName} ${d.lastName}`}
    />
  );
}

export default DirectorsPage;
