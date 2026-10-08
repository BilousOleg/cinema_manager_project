import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  loadPopularGenresThunk,
  loadRecentMoviesThunk,
  loadTotalCountsThunk,
} from '../../store/slices/dashboardSlice';
import getTotalCountData from '../../utils/getTotalCountData';
import PopularGenresList from './PopularGenresList';
import RecentMoviesList from './RecentMoviesList';
import TotalCountList from './TotalCountList';
import styles from './Dashboard.module.sass';

function Dashboard () {
  const dispatch = useDispatch();

  const {
    totalCounts,
    popularGenres,
    recentMovies,
    isFetchingTotalCounts,
    isFetchingPopularGenres,
    isFetchingRecentMovies,
    totalCountsError,
    popularGenresError,
    recentMoviesError,
  } = useSelector(state => state.dashboard);

  useEffect(() => {
    dispatch(loadTotalCountsThunk());
    dispatch(loadRecentMoviesThunk());
    dispatch(loadPopularGenresThunk());
  }, [dispatch]);

  return (
    <article className={styles.dashboard}>
      <h2 className={styles.dashboardHeading}>Welcome to the Cinema Manager</h2>
      <TotalCountList
        totalCountData={getTotalCountData(totalCounts)}
        isFetching={isFetchingTotalCounts}
        error={totalCountsError}
      />
      <h3 className={styles.dashboardListHeading}>Recently added movies</h3>
      <RecentMoviesList
        movies={recentMovies}
        isFetching={isFetchingRecentMovies}
        error={recentMoviesError}
      />
      <h3 className={styles.dashboardListHeading}>Popular genres</h3>
      <PopularGenresList
        genres={popularGenres}
        isFetching={isFetchingPopularGenres}
        error={popularGenresError}
      />
    </article>
  );
}

export default Dashboard;
