import { useSelector } from 'react-redux';
import EntityPage from '../EntityPage';
import StudiosListItem from '../../components/StudiosListItem';

function StudiosPage () {
  const { studios } = useSelector(state => state.studios);

  return (
    <EntityPage
      title='Studios List'
      items={studios}
      ItemComponent={StudiosListItem}
      addButtonText='ADD STUDIO'
      onAdd={() => {
        //
      }}
    />
  );
}

export default StudiosPage;
