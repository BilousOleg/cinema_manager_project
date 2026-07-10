import { useSelector } from 'react-redux';
import EntityPage from '../EntityPage';

function ActorsPage () {
  const { actors } = useSelector(state => state.actors);

  return (
    <EntityPage
      title='Actors List'
      items={actors}
      addButtonText='ADD ACTOR'
      // ItemComponent={}
      onAdd={() => {
        //
      }}
    />
  );
}

export default ActorsPage;
