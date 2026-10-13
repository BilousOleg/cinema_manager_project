import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loadActorsThunk } from '../../../../../store/slices/actorsSlice';
import { openEntityForm } from '../../../../../store/slices/serviceSlice';
import defaultPhoto from './../../../../../assets/defaultImages/defaultPhoto.png';
import EntitySelectionList from '../../../../fields/EntitySelectionList';
import CONSTANTS from '../../../../../constants';

const {
  ENTITIES: { ACTORS },
} = CONSTANTS;

function ActorsStep () {
  const dispatch = useDispatch();

  const { actors } = useSelector(state => state.actors);

  useEffect(() => {
    dispatch(loadActorsThunk());
  }, [dispatch]);

  const handleAddActor = () => {
    dispatch(openEntityForm({ entity: ACTORS }));
  };

  return (
    <EntitySelectionList
      items={actors}
      type='checkbox'
      name='actorIds'
      getValue={a => a.id}
      getTitle={({ Person }) => `${Person.firstName} ${Person.lastName}`}
      getImage={({ Person }) => Person.photo}
      defaultImage={defaultPhoto}
      addButtonText={'Add actor'}
      onAdd={handleAddActor}
    />
  );
}

export default ActorsStep;
