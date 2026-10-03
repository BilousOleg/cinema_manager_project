import { useDispatch, useSelector } from 'react-redux';
import { openEntityForm } from '../../../../../store/slices/serviceSlice';
import defaultPhoto from './../../../../../assets/defaultImages/defaultPhoto.png';
import EntitySelectionList from '../../../../fields/EntitySelectionList';
import CONSTANTS from '../../../../../constants';

const {
  ENTITIES: { DIRECTORS },
} = CONSTANTS;

function DirectorStep () {
  const { directors } = useSelector(state => state.directors);
  const dispatch = useDispatch();

  const handleAddDirector = () => {
    dispatch(openEntityForm({ entity: DIRECTORS }));
  };

  return (
    <EntitySelectionList
      items={directors}
      type='radio'
      name='directorId'
      getValue={d => d.id}
      getTitle={d => `${d.firstName} ${d.lastName}`}
      getImage={d => d.photo}
      defaultImage={defaultPhoto}
      addButtonText='Add director'
      onAdd={handleAddDirector}
    />
  );
}

export default DirectorStep;
