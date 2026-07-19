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

  const editMovie = id => {
    dispatch(openEntityForm({ entity: MOVIES, selectedId: id }));
  };

  return (
    <EntityPage
      title='Movies List'
      defaultImage={defaultPoster}
      items={movies}
      entity={MOVIES}
      addButtonText='ADD MOVIE'
      onAdd={addMovie}
      onEdit={editMovie}
      onDelete={deleteMovieById}
      getImage={m => m.poster}
      getPrimaryText={m => m.title}
      getSecondaryText={m => m.year}
    />
  );
}

export default MoviesPage;
