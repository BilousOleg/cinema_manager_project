import { useSelector } from 'react-redux';
import EntitySelectionList from '../../../../fields/EntitySelectionList';

function GenresStep () {
  const { genres } = useSelector(state => state.genres);

  return (
    <EntitySelectionList
      items={genres}
      type='checkbox'
      name='genreIds'
      getValue={g => g.id}
      getTitle={g => g.genreName}
    />
  );
}

export default GenresStep;
