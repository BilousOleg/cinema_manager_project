import { useDispatch, useSelector } from 'react-redux';
import { openEntityForm } from '../../../../../store/slices/serviceSlice';
import defaultPhoto from './../../../../../assets/defaultImages/defaultPhoto.png';
import EntitySelectionList from '../../../../fields/EntitySelectionList';
import CONSTANTS from '../../../../../constants';

const {
  ENTITIES: { ACTORS },
} = CONSTANTS;

function ActorsStep () {
  const { actors } = useSelector(state => state.actors);
  const dispatch = useDispatch();

  const handleAddActor = () => {
    dispatch(openEntityForm({ entity: ACTORS }));
  };

  return (
    <EntitySelectionList
      items={actors}
      type='checkbox'
      name='actorIds'
      getValue={a => a.id}
      getTitle={a => `${a.firstName} ${a.lastName}`}
      getImage={a => a.photo}
      defaultImage={defaultPhoto}
      addButtonText={'Add actor'}
      onAdd={handleAddActor}
    />
  );
}

export default ActorsStep;
