import { useSelector } from 'react-redux';
import EntityPage from '../EntityPage';
import ActorsListItem from '../../components/ActorsListItem';

function ActorsPage () {
  const { actors } = useSelector(state => state.actors);

  return (
    <EntityPage
      title='Actors List'
      items={actors}
      addButtonText='ADD ACTOR'
      ItemComponent={ActorsListItem}
      onAdd={() => {
        //
      }}
    />
  );
}

export default ActorsPage;
