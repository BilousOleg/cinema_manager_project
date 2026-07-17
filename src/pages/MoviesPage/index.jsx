import { useDispatch, useSelector } from 'react-redux';
import { deleteMovie } from '../../store/slices/moviesSlice';
import { openEntityForm } from '../../store/slices/serviceSlice';
import defaultPoster from './../../assets/defaultImages/defaultPoster.png';
import EntityPage from '../EntityPage';
import CONSTANTS from '../../constants';

const {
  ENTITIES: { MOVIES },
} = CONSTANTS;

function MoviesPage () {
  const { movies } = useSelector(state => state.movies);

  const dispatch = useDispatch();

  const deleteMovieById = id => {
    dispatch(deleteMovie(id));
  };

  const addMovie = () => {
    dispatch(openEntityForm({ entity: MOVIES }));
  };

  return (
    <EntityPage
      title='Movies List'
      items={movies}
      entity={MOVIES}
      addButtonText='ADD MOVIE'
      onAdd={addMovie}
      // onEdit={}
      onDelete={deleteMovieById}
      getImage={m => m.poster || defaultPoster}
      getPrimaryText={m => m.title}
      getSecondaryText={m => m.year}
    />
  );
}

export default MoviesPage;
