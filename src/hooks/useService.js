import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { openService, closeService } from '../store/slices/serviceSlice';

function useService (entity, mode, selectedId = null) {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(openService({ entity, mode, selectedId }));

    return () => dispatch(closeService());
  }, [dispatch, entity, mode, selectedId]);
}

export default useService;
