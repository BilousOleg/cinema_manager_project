import { useSelector } from 'react-redux';
import defaultPhoto from './../../../../../assets/defaultImages/defaultPhoto.png';
import EntitySelectionList from '../../../../fields/EntitySelectionList';

function DirectorStep () {
  const { directors } = useSelector(state => state.directors);

  return (
    <EntitySelectionList
      items={directors}
      type='radio'
      name='directorId'
      getValue={d => d.id}
      getTitle={d => `${d.firstName} ${d.lastName}`}
      getImage={d => d.photo}
      defaultImage={defaultPhoto}
    />
  );
}

export default DirectorStep;
