import { useSelector } from 'react-redux';
import defaultPhoto from './../../../../../assets/defaultImages/defaultPhoto.png';
import EntitySelectionList from '../../../../fields/EntitySelectionList';

function ActorsStep () {
  const { actors } = useSelector(state => state.actors);

  return (
    <EntitySelectionList
      items={actors}
      type='checkbox'
      name='actorIds'
      getValue={a => a.id}
      getTitle={a => `${a.firstName} ${a.lastName}`}
      getImage={a => a.photo}
      defaultImage={defaultPhoto}
    />
  );
}

export default ActorsStep;
