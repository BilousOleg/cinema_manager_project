import { useDispatch, useSelector } from 'react-redux';
import { deleteActor } from '../../store/slices/actorsSlice';
import { openEntityForm } from '../../store/slices/serviceSlice';
import EntityPage from '../EntityPage';
import CONSTANTS from '../../constants';

const {
  ENTITIES: { ACTORS },
  SERVICE_MODES: { CREATE },
} = CONSTANTS;

function ActorsPage () {
  const { actors } = useSelector(state => state.actors);

  const dispatch = useDispatch();

  const deleteActorById = id => {
    dispatch(deleteActor(id));
  };

  const addActor = () => {
    dispatch(openEntityForm({ entity: ACTORS, mode: CREATE }));
  };

  return (
    <EntityPage
      title='Actors List'
      items={actors}
      entity={ACTORS}
      addButtonText='ADD ACTOR'
      onAdd={addActor}
      // onEdit={}
      onDelete={deleteActorById}
      getImage={a => a.photo}
      getPrimaryText={a => a.fullName}
    />
  );
}

export default ActorsPage;
