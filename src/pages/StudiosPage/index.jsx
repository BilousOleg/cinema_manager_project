import { useDispatch, useSelector } from 'react-redux';
import { deleteStudio } from '../../store/slices/studiosSlice';
import { openEntityForm } from '../../store/slices/serviceSlice';
import defaultLogo from './../../assets/defaultImages/defaultLogo.png';
import EntityPage from '../EntityPage';
import CONSTANTS from '../../constants';

const {
  ENTITIES: { STUDIOS },
} = CONSTANTS;

function StudiosPage () {
  const { studios } = useSelector(state => state.studios);

  const dispatch = useDispatch();

  const deleteStudioById = id => {
    dispatch(deleteStudio(id));
  };

  const addStudio = () => {
    dispatch(openEntityForm({ entity: STUDIOS }));
  };

  const editStudio = id => {
    dispatch(openEntityForm({ entity: STUDIOS, selectedId: id }));
  };

  return (
    <EntityPage
      title='Studios List'
      defaultImage={defaultLogo}
      items={studios}
      entity={STUDIOS}
      addButtonText='ADD STUDIO'
      onAdd={addStudio}
      onEdit={editStudio}
      onDelete={deleteStudioById}
      getImage={s => s.logo}
      getPrimaryText={s => s.name}
      getSecondaryText={s => s.founded}
    />
  );
}

export default StudiosPage;
