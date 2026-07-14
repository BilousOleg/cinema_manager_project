import { useSelector } from 'react-redux';
import classNames from 'classnames';
import MovieForm from '../forms/MovieForm';
import ActorForm from '../forms/ActorForm';
import DirectorForm from '../forms/DirectorForm';
import StudioForm from '../forms/StudioForm';
import styles from './CinemaService.module.sass';

function CinemaService () {
  const { isOpen, entity } = useSelector(state => state.service);

  const serviceClassNames = classNames(styles.serviceSection, {
    [styles.isOpen]: isOpen,
  });

  return (
    <aside className={serviceClassNames}>
      <h2 className={styles.serviceHeading}>Cinema service</h2>
      <div className={styles.serviceBody}>
        {/* <SelectAction /> */}
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
