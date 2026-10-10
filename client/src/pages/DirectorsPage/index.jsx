import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import {
  deleteDirectorThunk,
  loadDirectorsThunk,
} from '../../store/slices/directorsSlice';
import { openEntityForm } from '../../store/slices/serviceSlice';
import { showNotification } from '../../store/slices/notificationSlice';
import defaultPhoto from './../../assets/defaultImages/defaultPhoto.png';
import EntityPage from '../EntityPage';
import CONSTANTS from '../../constants';

const {
  ENTITIES: { DIRECTORS },
  DEFAULT_PAGE,
  DEFAULT_RESULTS,
} = CONSTANTS;

function DirectorsPage () {
  const [searchParams, setSearchParams] = useSearchParams();

  const dispatch = useDispatch();

  const page = Math.max(1, Number(searchParams.get('page')) || DEFAULT_PAGE);
  const results = Math.max(
    1,
    Number(searchParams.get('results')) || DEFAULT_RESULTS
  );

  const {
    directors,
    pagination: { totalPages },
  } = useSelector(state => state.directors);

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

    dispatch(loadDirectorsThunk({ page, results }));
  }, [searchParams, setSearchParams, dispatch, page, results]);

  const handlePageChange = newPage => {
    setSearchParams({
      page: String(newPage),
      results: String(results),
    });
  };

  const handleDelete = async id => {
    try {
      await dispatch(deleteDirectorThunk(id)).unwrap();

      dispatch(
        showNotification({
          message: 'Director deleted successfully',
          type: 'success',
        })
      );

      if (directors.length === 1 && page > 1) {
        setSearchParams({
          page: String(page - 1),
          results: String(results),
        });
      }
    } catch (err) {
      dispatch(
        showNotification({
          message:
            err?.errors?.[0]?.title ||
            err?.message ||
            'Failed to delete director',
          type: 'error',
        })
      );
    }
  };

  const handleAdd = () => {
    dispatch(openEntityForm({ entity: DIRECTORS }));
  };

  const handleEdit = id => {
    dispatch(openEntityForm({ entity: DIRECTORS, selectedId: id }));
  };

  return (
    <EntityPage
      title='Directors List'
      defaultImage={defaultPhoto}
      items={directors}
      entity={DIRECTORS}
      page={page}
      totalPages={totalPages}
      onPageChange={handlePageChange}
      onAdd={handleAdd}
      onEdit={handleEdit}
      onDelete={handleDelete}
      getImage={({ Person }) => Person.photo}
      getPrimaryText={({ Person }) => `${Person.firstName} ${Person.lastName}`}
    />
  );
}

export default DirectorsPage;
