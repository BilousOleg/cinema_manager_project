import { useDispatch, useSelector } from 'react-redux';
import styles from './MoviesPage.module.sass';

function MoviesPage () {
  const dispatch = useDispatch();

  const { movies } = useSelector(state => state.movies);

  return <div>{JSON.stringify(movies)}</div>;
}

export default MoviesPage;
