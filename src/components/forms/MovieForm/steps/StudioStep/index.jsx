import { useSelector } from 'react-redux';
import defaultLogo from './../../../../../assets/defaultImages/defaultLogo.png';
import EntitySelectionList from '../../../../EntitySelectionList';

function StudioStep () {
  const { studios } = useSelector(state => state.studios);

  return (
    <EntitySelectionList
      items={studios}
      type='radio'
      name='studioId'
      getValue={s => s.id}
      getTitle={s => s.name}
      getImage={s => s.logo}
      defaultImage={defaultLogo}
    />
  );
}

export default StudioStep;
