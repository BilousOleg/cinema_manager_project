import { useDispatch, useSelector } from 'react-redux';
import { openEntityForm } from '../../../../../store/slices/serviceSlice';
import defaultLogo from './../../../../../assets/defaultImages/defaultLogo.png';
import EntitySelectionList from '../../../../fields/EntitySelectionList';
import CONSTANTS from '../../../../../constants';

const {
  ENTITIES: { STUDIOS },
} = CONSTANTS;

function StudioStep () {
  const { studios } = useSelector(state => state.studios);
  const dispatch = useDispatch();

  const handleAddStudio = () => {
    dispatch(openEntityForm({ entity: STUDIOS }));
  };

  return (
    <EntitySelectionList
      items={studios}
      type='radio'
      name='studioId'
      getValue={s => s.id}
      getTitle={s => s.name}
      getImage={s => s.logo}
      defaultImage={defaultLogo}
      addButtonText={'AddStudio'}
      onAdd={handleAddStudio}
    />
  );
}

export default StudioStep;
