import { useSelector } from 'react-redux';
import styles from './MoviesList.module.sass';
import MoviesListItem from './MoviesListItem';

function MoviesList () {
  const { movies } = useSelector(state => state.movies);

  console.log(movies);

  return (
    <section className={styles.moviesListSection}>
      <ul className={styles.moviesList}>
        {movies.map(m => (
          <MoviesListItem
            key={m.id}
            title={m.title}
            year={m.year}
            imgSrc={m.poster}
          />
        ))}
      </ul>
    </section>
  );
}

export default MoviesList;
