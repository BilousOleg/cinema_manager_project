import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loadStudiosThunk } from '../../../../../store/slices/studiosSlice';
import { openEntityForm } from '../../../../../store/slices/serviceSlice';
import defaultLogo from './../../../../../assets/defaultImages/defaultLogo.png';
import EntitySelectionList from '../../../../fields/EntitySelectionList';
import CONSTANTS from '../../../../../constants';

const {
  ENTITIES: { STUDIOS },
} = CONSTANTS;

function StudiosStep () {
  const dispatch = useDispatch();

  const { studios } = useSelector(state => state.studios);

  useEffect(() => {
    dispatch(loadStudiosThunk());
  }, [dispatch]);

  const handleAddStudio = () => {
    dispatch(openEntityForm({ entity: STUDIOS }));
  };

  return (
    <EntitySelectionList
      items={studios}
      type='checkbox'
      name='studioIds'
      getValue={s => s.id}
      getTitle={s => s.studioName}
      getImage={s => s.logo}
      defaultImage={defaultLogo}
      addButtonText={'Add studio'}
      onAdd={handleAddStudio}
    />
  );
}

export default StudiosStep;
