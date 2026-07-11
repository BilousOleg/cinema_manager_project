import { useSelector } from 'react-redux';
import EntityPage from '../EntityPage';
function StudiosPage () {
  const { studios } = useSelector(state => state.studios);

  return (
    <EntityPage
      title='Studios List'
      items={studios}
      entity='studios'
      addButtonText='ADD STUDIO'
      onAdd={() => {
        //
      }}
      getImage={s => s.logo}
      getPrimaryText={s => s.name}
      getSecondaryText={s => s.founded}
    />
  );
}

export default StudiosPage;
