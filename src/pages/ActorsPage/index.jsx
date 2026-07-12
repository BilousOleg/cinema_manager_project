import { useDispatch, useSelector } from 'react-redux';
import { deleteActor } from '../../store/slices/actorsSlice';
import EntityPage from '../EntityPage';

function ActorsPage () {
  const { actors } = useSelector(state => state.actors);

  const dispatch = useDispatch();

  const deleteActorById = id => {
    dispatch(deleteActor(id));
  };

  return (
    <EntityPage
      title='Actors List'
      items={actors}
      entity='actors'
      addButtonText='ADD ACTOR'
      onAdd={() => {
        //
      }}
      // onEdit={}
      onDelete={deleteActorById}
      getImage={a => a.photo}
      getPrimaryText={a => a.fullName}
    />
  );
}

export default ActorsPage;
