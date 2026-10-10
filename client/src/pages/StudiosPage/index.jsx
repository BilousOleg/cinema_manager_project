import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import {
  deleteStudioThunk,
  loadStudiosThunk,
} from '../../store/slices/studiosSlice';
import { openEntityForm } from '../../store/slices/serviceSlice';
import { showNotification } from '../../store/slices/notificationSlice';
import defaultLogo from './../../assets/defaultImages/defaultLogo.png';
import EntityPage from '../EntityPage';
import CONSTANTS from '../../constants';

const {
  ENTITIES: { STUDIOS },
  DEFAULT_PAGE,
  DEFAULT_RESULTS,
} = CONSTANTS;

function StudiosPage () {
  const [searchParams, setSearchParams] = useSearchParams();

  const dispatch = useDispatch();

  const page = Math.max(1, Number(searchParams.get('page')) || DEFAULT_PAGE);
  const results = Math.max(
    1,
    Number(searchParams.get('results')) || DEFAULT_RESULTS
  );

  const {
    studios,
    pagination: { totalPages },
  } = useSelector(state => state.studios);

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

    dispatch(loadStudiosThunk({ page, results }));
  }, [searchParams, setSearchParams, dispatch, page, results]);

  const handlePageChange = newPage => {
    setSearchParams({
      page: String(newPage),
      results: String(results),
    });
  };

  const handleDelete = async id => {
    try {
      await dispatch(deleteStudioThunk(id)).unwrap();
      dispatch(
        showNotification({
          message: 'Studio deleted successfully',
          type: 'success',
        })
      );

      if (studios.length === 1 && page > 1) {
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
            'Failed to delete studio',
          type: 'error',
        })
      );
    }
  };

  const handleAdd = () => {
    dispatch(openEntityForm({ entity: STUDIOS }));
  };

  const handleEdit = id => {
    dispatch(openEntityForm({ entity: STUDIOS, selectedId: id }));
  };

  return (
    <EntityPage
      title='Studios List'
      defaultImage={defaultLogo}
      items={studios}
      entity={STUDIOS}
      page={page}
      totalPages={totalPages}
      onPageChange={handlePageChange}
      onAdd={handleAdd}
      onEdit={handleEdit}
      onDelete={handleDelete}
      getImage={s => s.logo}
      getPrimaryText={s => s.studioName}
      getSecondaryText={s => s.founded}
    />
  );
}

export default StudiosPage;
