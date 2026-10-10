import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import {
  deleteActorThunk,
  loadActorsThunk,
} from '../../store/slices/actorsSlice';
import { openEntityForm } from '../../store/slices/serviceSlice';
import { showNotification } from '../../store/slices/notificationSlice';
import defaultPhoto from '../../assets/defaultImages/defaultPhoto.png';
import EntityPage from '../EntityPage';
import CONSTANTS from '../../constants';

const {
  ENTITIES: { ACTORS },
  DEFAULT_PAGE,
  DEFAULT_RESULTS,
} = CONSTANTS;

function ActorsPage () {
  const [searchParams, setSearchParams] = useSearchParams();

  const dispatch = useDispatch();

  const page = Math.max(1, Number(searchParams.get('page')) || DEFAULT_PAGE);
  const results = Math.max(
    1,
    Number(searchParams.get('results')) || DEFAULT_RESULTS
  );

  const {
    actors,
    pagination: { totalPages },
  } = useSelector(state => state.actors);

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

    dispatch(loadActorsThunk({ page, results }));
  }, [searchParams, setSearchParams, dispatch, page, results]);

  const handlePageChange = newPage => {
    setSearchParams({
      page: String(newPage),
      results: String(results),
    });
  };

  const handleDelete = async id => {
    try {
      await dispatch(deleteActorThunk(id)).unwrap();

      dispatch(
        showNotification({
          message: 'Actor deleted successfully',
          type: 'success',
        })
      );

      if (actors.length === 1 && page > 1) {
        setSearchParams({
          page: String(page - 1),
          results: String(results),
        });
      }
    } catch (err) {
      dispatch(
        showNotification({
          message:
            err?.errors?.[0]?.title || err?.message || 'Failed to delete actor',
          type: 'error',
        })
      );
    }
  };

  const handleAdd = () => {
    dispatch(openEntityForm({ entity: ACTORS }));
  };

  const handleEdit = id => {
    dispatch(openEntityForm({ entity: ACTORS, selectedId: id }));
  };

  return (
    <EntityPage
      title='Actors List'
      defaultImage={defaultPhoto}
      items={actors}
      entity={ACTORS}
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
export default ActorsPage;
