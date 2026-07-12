import { useDispatch, useSelector } from 'react-redux';
import { deleteDirector } from '../../store/slices/directorsSlice';
import EntityPage from '../EntityPage';

function DirectorsPage () {
  const { directors } = useSelector(state => state.directors);

  const dispatch = useDispatch();

  const deleteDirectorById = id => {
    dispatch(deleteDirector(id));
  };

  return (
    <EntityPage
      title='Directors List'
      items={directors}
      entity='directors'
      addButtonText='ADD DIRECTOR'
      onAdd={() => {
        //
      }}
      // onEdit={}
      onDelete={deleteDirectorById}
      getImage={d => d.photo}
      getPrimaryText={d => d.fullName}
    />
  );
}

export default DirectorsPage;
