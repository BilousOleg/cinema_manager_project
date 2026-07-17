import { useSelector } from 'react-redux';
import getTopGenres from '../../utils/getTopGenres';
import PopularGenresList from './PopularGenresList';
import RecentMoviesList from './RecentMoviesList';
import TotalCountList from './TotalCountList';
import styles from './Dashboard.module.sass';
import CONSTANTS from '../../constants';

const { GENRES_BY_ID } = CONSTANTS;

function Dashboard () {
  const { movies } = useSelector(state => state.movies);

  const recentMovies = movies.slice(-3).reverse();

  const topGenres = getTopGenres(movies, GENRES_BY_ID);

  return (
    <article className={styles.dashboard}>
      <h2 className={styles.dashboardHeading}>Welcome to the Cinema Manager</h2>
      <TotalCountList />
      <h3 className={styles.dashboardListHeading}>Recently added movies</h3>
      <RecentMoviesList movies={recentMovies} />
      <h3 className={styles.dashboardListHeading}>Popular genres</h3>
      <PopularGenresList genres={topGenres} />
    </article>
  );
}

export default Dashboard;
