import { useSelector } from 'react-redux';
import EntityPage from '../EntityPage';

function ActorsPage () {
  const { actors } = useSelector(state => state.actors);

  return (
    <EntityPage
      title='Actors List'
      items={actors}
      entity='actors'
      addButtonText='ADD ACTOR'
      onAdd={() => {
        //
      }}
      getImage={a => a.photo}
      getPrimaryText={a => a.fullName}
    />
  );
}

export default ActorsPage;
