import { useSelector } from 'react-redux';
import EntityPage from '../EntityPage';
import MoviesListItem from '../../components/MoviesListItem';

function MoviesPage () {
  const { movies } = useSelector(state => state.movies);

  return (
    <EntityPage
      title='Movies List'
      items={movies}
      ItemComponent={MoviesListItem}
      addButtonText='ADD MOVIE'
      onAdd={() => {
        //
      }}
    />
  );
}

export default MoviesPage;
