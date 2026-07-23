import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
import classNames from 'classnames';
import { closeService } from '../../store/slices/serviceSlice';
import MovieForm from '../forms/MovieForm';
import ActorForm from '../forms/ActorForm';
import DirectorForm from '../forms/DirectorForm';
import StudioForm from '../forms/StudioForm';
import styles from './CinemaService.module.sass';

function CinemaService ({ contentRef }) {
  const dispatch = useDispatch();
  const location = useLocation();

  const { isOpen, entity, selectedId } = useSelector(state => state.service);
  const [contentHeight, setContentHeight] = useState(0);

  const serviceClassNames = classNames(styles.serviceSection, {
    [styles.isOpen]: isOpen,
  });

  useEffect(() => {
    dispatch(closeService());
  }, [location.pathname, dispatch]);

  useEffect(() => {
    if (!contentRef.current) return;

    const updateContentHeight = () => {
      setContentHeight(contentRef.current.clientHeight);
    };

    updateContentHeight();
    const observer = new ResizeObserver(updateContentHeight);
    observer.observe(contentRef.current);

    return () => {
      observer.disconnect();
    };
  }, [contentRef]);

  const handleBackgroundClick = event => {
    if (event.target === event.currentTarget) {
      dispatch(closeService());
    }
  };

  return (
    <aside
      className={serviceClassNames}
      style={{
        '--content-height': `${contentHeight}px`,
      }}
      onClick={handleBackgroundClick}
    >
      <div className={styles.serviceModal}>
        <h2 className={styles.serviceHeading}>Cinema service</h2>
        <div className={styles.serviceBody}>
          {!entity && (
            <div className={styles.selectAction}>Select action...</div>
          )}
          {entity === 'movies' && <MovieForm selectedId={selectedId} />}
          {entity === 'actors' && <ActorForm selectedId={selectedId} />}
          {entity === 'directors' && <DirectorForm selectedId={selectedId} />}
          {entity === 'studios' && <StudioForm selectedId={selectedId} />}
        </div>
      </div>
    </aside>
  );
}

export default CinemaService;
