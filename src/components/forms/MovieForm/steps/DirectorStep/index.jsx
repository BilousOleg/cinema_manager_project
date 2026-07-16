import { useSelector } from 'react-redux';
import EntitySelectionList from '../../../../EntitySelectionList';

function DirectorStep () {
  const { directors } = useSelector(state => state.directors);

  return (
    <EntitySelectionList
      items={directors}
      type='radio'
      name='directorId'
      getValue={d => d.id}
      getTitle={d => d.fullName}
      getImage={d => d.photo}
    />
  );
}

export default DirectorStep;
