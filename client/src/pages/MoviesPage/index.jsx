import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  deleteMovieThunk,
  loadMoviesThunk,
} from '../../store/slices/moviesSlice';
import { openEntityForm } from '../../store/slices/serviceSlice';
import { showNotification } from '../../store/slices/notificationSlice';
import defaultPoster from './../../assets/defaultImages/defaultPoster.png';
import EntityPage from '../EntityPage';
import CONSTANTS from '../../constants';

const {
  ENTITIES: { MOVIES },
  DEFAULT_PAGE,
  DEFAULT_RESULTS,
} = CONSTANTS;

function MoviesPage () {
  const [searchParams, setSearchParams] = useSearchParams();

  const dispatch = useDispatch();

  const page = Math.max(1, Number(searchParams.get('page')) || DEFAULT_PAGE);
  const results = Math.max(
    1,
    Number(searchParams.get('results')) || DEFAULT_RESULTS
  );

  const {
    movies,
    pagination: { totalPages },
  } = useSelector(state => state.movies);

  useEffect(() => {
    const params = new URLSearchParams(searchParams);

    let shouldUpdateUrl = false;

    if (params.get('page') !== String(page)) {
      params.set('page', String(page));
      shouldUpdateUrl = true;
    }

    if (params.get('results') !== String(results)) {
      params.set('results', String(results));
      shouldUpdateUrl = true;
    }

    if (shouldUpdateUrl) {
      setSearchParams(params, { replace: true });
      return;
    }

    dispatch(loadMoviesThunk({ page, results }));
  }, [searchParams, setSearchParams, dispatch, page, results]);

  const handlePageChange = newPage => {
    setSearchParams({
      page: String(newPage),
      results: String(results),
    });
  };

  const handleDelete = async id => {
    try {
      await dispatch(deleteMovieThunk(id)).unwrap();
      dispatch(
        showNotification({
          message: 'Movie deleted successfully',
          type: 'success',
        })
      );

      if (movies.length === 1 && page > 1) {
        setSearchParams({
          page: String(page - 1),
          results: String(results),
        });
      }
    } catch (err) {
      dispatch(
        showNotification({
          message:
            err?.errors?.[0]?.title || err?.message || 'Failed to delete movie',
          type: 'error',
        })
      );
    }
  };

  const handleAdd = () => {
    dispatch(openEntityForm({ entity: MOVIES }));
  };

  const handleEdit = id => {
    dispatch(openEntityForm({ entity: MOVIES, selectedId: id }));
  };

  return (
    <EntityPage
      title='Movies List'
      defaultImage={defaultPoster}
      items={movies}
      entity={MOVIES}
      page={page}
      totalPages={totalPages}
      onPageChange={handlePageChange}
      onAdd={handleAdd}
      onEdit={handleEdit}
      onDelete={handleDelete}
      getImage={m => m.poster}
      getPrimaryText={m => m.title}
      getSecondaryText={m => m.year}
    />
  );
}

export default MoviesPage;
