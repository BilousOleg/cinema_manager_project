import { useSelector } from 'react-redux';
import EntityPage from '../EntityPage';
import DirectorsListItem from '../../components/DirectorsListItem';

function DirectorsPage () {
  const { directors } = useSelector(state => state.directors);

  return (
    <EntityPage
      title='Directors List'
      items={directors}
      addButtonText='ADD DIRECTOR'
      ItemComponent={DirectorsListItem}
      onAdd={() => {
        //
      }}
    />
  );
}

export default DirectorsPage;
