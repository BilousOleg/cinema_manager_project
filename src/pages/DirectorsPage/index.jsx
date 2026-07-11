import { useSelector } from 'react-redux';
import EntityPage from '../EntityPage';

function DirectorsPage () {
  const { directors } = useSelector(state => state.directors);

  return (
    <EntityPage
      title='Directors List'
      items={directors}
      entity='directors'
      addButtonText='ADD DIRECTOR'
      onAdd={() => {
        //
      }}
      getImage={d => d.photo}
      getPrimaryText={d => d.fullName}
    />
  );
}

export default DirectorsPage;
