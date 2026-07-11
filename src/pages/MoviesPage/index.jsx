import { useSelector } from 'react-redux';
import EntityPage from '../EntityPage';

function MoviesPage () {
  const { movies } = useSelector(state => state.movies);

  return (
    <EntityPage
      title='Movies List'
      items={movies}
      entity='movies'
      addButtonText='ADD MOVIE'
      onAdd={() => {
        //
      }}
      getImage={m => m.poster}
      getPrimaryText={m => m.title}
      getSecondaryText={m => m.year}
    />
  );
}

export default MoviesPage;
