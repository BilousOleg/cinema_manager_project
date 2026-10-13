import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loadDirectorsThunk } from '../../../../../store/slices/directorsSlice';
import { openEntityForm } from '../../../../../store/slices/serviceSlice';
import defaultPhoto from './../../../../../assets/defaultImages/defaultPhoto.png';
import EntitySelectionList from '../../../../fields/EntitySelectionList';
import CONSTANTS from '../../../../../constants';

const {
  ENTITIES: { DIRECTORS },
} = CONSTANTS;

function DirectorsStep () {
  const dispatch = useDispatch();

  const { directors } = useSelector(state => state.directors);

  useEffect(() => {
    dispatch(loadDirectorsThunk());
  }, [dispatch]);

  const handleAddDirector = () => {
    dispatch(openEntityForm({ entity: DIRECTORS }));
  };

  return (
    <EntitySelectionList
      items={directors}
      type='checkbox'
      name='directorIds'
      getValue={d => d.id}
      getTitle={({ Person }) => `${Person.firstName} ${Person.lastName}`}
      getImage={({ Person }) => Person.photo}
      defaultImage={defaultPhoto}
      addButtonText='Add director'
      onAdd={handleAddDirector}
    />
  );
}

export default DirectorsStep;
