import { useDispatch, useSelector } from 'react-redux';
import { deleteDirector } from '../../store/slices/directorsSlice';
import { openEntityForm } from '../../store/slices/serviceSlice';
import defaultPhoto from './../../assets/defaultImages/defaultPhoto.png';
import EntityPage from '../EntityPage';
import CONSTANTS from '../../constants';

const {
  ENTITIES: { DIRECTORS },
} = CONSTANTS;

function DirectorsPage () {
  const { directors } = useSelector(state => state.directors);

  const dispatch = useDispatch();

  const deleteDirectorById = id => {
    dispatch(deleteDirector(id));
  };

  const addDirector = () => {
    dispatch(openEntityForm({ entity: DIRECTORS }));
  };

  const editDirector = id => {
    dispatch(openEntityForm({ entity: DIRECTORS, selectedId: id }));
  };

  return (
    <EntityPage
      title='Directors List'
      defaultImage={defaultPhoto}
      items={directors}
      entity='directors'
      addButtonText='ADD DIRECTOR'
      onAdd={addDirector}
      onEdit={editDirector}
      onDelete={deleteDirectorById}
      getImage={d => d.photo}
      getPrimaryText={d => `${d.firstName} ${d.lastName}`}
    />
  );
}

export default DirectorsPage;
