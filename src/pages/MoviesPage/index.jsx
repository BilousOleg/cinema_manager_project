import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Pagination, PaginationItem } from '@mui/material';
import VideoCallIcon from '@mui/icons-material/VideoCall';
import MoviesList from '../../components/MoviesList';
import styles from './MoviesPage.module.sass';

function MoviesPage () {
  const dispatch = useDispatch();

  const { movies } = useSelector(state => state.movies);
  const [searchParams, setSearchParams] = useSearchParams();

  const MOVIES_PER_PAGE = 9;
  const pageCount = Math.ceil(movies.length / MOVIES_PER_PAGE);

  const pageFromUrl = Number(searchParams.get('page')) || 1;
  const currentPage = Math.min(Math.max(pageFromUrl, 1), pageCount);

  useEffect(() => {
    if (!searchParams.has('page')) {
      const params = new URLSearchParams(searchParams);
      params.set('page', '1');
      setSearchParams(params, { replace: true });
    }
  }, [searchParams, setSearchParams]);

  const start = (currentPage - 1) * MOVIES_PER_PAGE;
  const currentMovies = movies.slice(start, start + MOVIES_PER_PAGE);

  return (
    <article className={styles.movies}>
      <section className={styles.headingSection}>
        <h2>Movies List</h2>
        <button className={styles.addMovieBtn}>
          <VideoCallIcon />
          <span>ADD MOVIE</span>
        </button>
      </section>

      <section className={styles.moviesListSection}>
        <MoviesList
          movies={currentMovies}
          currentPage={currentPage}
          maxPerPage={MOVIES_PER_PAGE}
        />
      </section>

      <section className={styles.moviesPaginationSection}>
        <Pagination
          page={currentPage}
          count={pageCount}
          onChange={(event, value) =>
            setSearchParams({ page: value.toString() })
          }
          siblingCount={2}
          boundaryCount={1}
          renderItem={item => (
            <PaginationItem {...item} className={styles.pageItem} />
          )}
        />
      </section>
    </article>
  );
}

export default MoviesPage;
