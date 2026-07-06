import { useDispatch } from 'react-redux';
import VideoCallIcon from '@mui/icons-material/VideoCall';
import MoviesList from '../../components/MoviesList';
import styles from './MoviesPage.module.sass';

function MoviesPage () {
  const dispatch = useDispatch();

  return (
    <article className={styles.movies}>
      <section className={styles.headingSection}>
        <h2>Movies List</h2>
        <button className={styles.addMovieBtn}>
          <VideoCallIcon />
          <span>ADD MOVIE</span>
        </button>
      </section>
      <MoviesList />
    </article>
  );
}

export default MoviesPage;
