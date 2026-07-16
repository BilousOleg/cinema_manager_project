import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
import classNames from 'classnames';
import { closeService } from '../../store/slices/serviceSlice';
import MovieForm from '../forms/MovieForm';
import ActorForm from '../forms/ActorForm';
import DirectorForm from '../forms/DirectorForm';
import StudioForm from '../forms/StudioForm';
import styles from './CinemaService.module.sass';

function CinemaService () {
  const dispatch = useDispatch();
  const location = useLocation();

  const { isOpen, entity } = useSelector(state => state.service);

  const serviceClassNames = classNames(styles.serviceSection, {
    [styles.isOpen]: isOpen,
  });

  useEffect(() => {
    dispatch(closeService());
  }, [location.pathname, dispatch]);

  return (
    <aside className={serviceClassNames}>
      <h2 className={styles.serviceHeading}>Cinema service</h2>
      <div className={styles.serviceBody}>
        {!entity && <div className={styles.selectAction}>Select action...</div>}
        {entity === 'movies' && <MovieForm />}
        {entity === 'actors' && <ActorForm />}
        {entity === 'directors' && <DirectorForm />}
        {entity === 'studios' && <StudioForm />}
      </div>
    </aside>
  );
}

export default CinemaService;
