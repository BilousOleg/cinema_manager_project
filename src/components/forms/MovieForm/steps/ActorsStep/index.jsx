import { useSelector } from 'react-redux';
import EntitySelectionList from '../../../../EntitySelectionList';

function ActorsStep () {
  const { actors } = useSelector(state => state.actors);

  return (
    <EntitySelectionList
      items={actors}
      type='checkbox'
      name='actorIds'
      getValue={a => a.id}
      getTitle={a => a.fullName}
      getImage={a => a.photo}
    />
  );
}

export default ActorsStep;
