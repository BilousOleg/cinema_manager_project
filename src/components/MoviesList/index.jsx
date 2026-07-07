import MoviesListItem from './MoviesListItem';
import styles from './MoviesList.module.sass';

function MoviesList ({ movies }) {
  return (
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
  );
}

export default MoviesList;
