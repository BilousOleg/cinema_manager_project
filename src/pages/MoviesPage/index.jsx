import { useDispatch, useSelector } from 'react-redux';
import { deleteMovie } from '../../store/slices/moviesSlice';
import EntityPage from '../EntityPage';

function MoviesPage () {
  const { movies } = useSelector(state => state.movies);

  const dispatch = useDispatch();

  const deleteMovieById = id => {
    dispatch(deleteMovie(id));
  };

  return (
    <EntityPage
      title='Movies List'
      items={movies}
      entity='movies'
      addButtonText='ADD MOVIE'
      onAdd={() => {
        //
      }}
      // onEdit={}
      onDelete={deleteMovieById}
      getImage={m => m.poster}
      getPrimaryText={m => m.title}
      getSecondaryText={m => m.year}
    />
  );
}

export default MoviesPage;
