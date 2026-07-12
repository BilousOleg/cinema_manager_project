import { useDispatch, useSelector } from 'react-redux';
import { deleteStudio } from '../../store/slices/studiosSlice';
import EntityPage from '../EntityPage';

function StudiosPage () {
  const { studios } = useSelector(state => state.studios);

  const dispatch = useDispatch();

  const deleteStudioById = id => {
    dispatch(deleteStudio(id));
  };

  return (
    <EntityPage
      title='Studios List'
      items={studios}
      entity='studios'
      addButtonText='ADD STUDIO'
      onAdd={() => {
        //
      }}
      // onEdit={}
      onDelete={deleteStudioById}
      getImage={s => s.logo}
      getPrimaryText={s => s.name}
      getSecondaryText={s => s.founded}
    />
  );
}

export default StudiosPage;
