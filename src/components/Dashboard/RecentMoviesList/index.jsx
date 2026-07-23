import RecentMoviesListItem from './RecentMoviesListItem';
import defaultPoster from './../../../assets/defaultImages/defaultPoster.png';
import NoItems from '../../NoItems';
import styles from './RecentMoviesList.module.sass';

function RecentMoviesList ({ movies }) {
  return movies.length ? (
    <ul className={styles.recentMoviesList}>
      {movies.map(m => (
        <RecentMoviesListItem
          key={m.id}
          id={m.id}
          title={m.title}
          poster={m.poster}
          fallback={defaultPoster}
        />
      ))}
    </ul>
  ) : (
    <NoItems message='Create a movie to display it here...' />
  );
}

export default RecentMoviesList;
