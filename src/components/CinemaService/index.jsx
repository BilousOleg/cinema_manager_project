import { useSelector } from 'react-redux';
import classNames from 'classnames';
import styles from './CinemaService.module.sass';

function CinemaService () {
  const { isOpen, entity } = useSelector(state => state.service);

  const serviceClassNames = classNames(styles.serviceSection, {
    [styles.isOpen]: isOpen,
  });

  return (
    <aside className={serviceClassNames}>
      <section>
        <h2 className={styles.serviceHeading}>Cinema service</h2>
      </section>

      <section>
        <div className={styles.serviceBody}>
          {!entity && (
            <div className={styles.selectAction}>Select action...</div>
          )}
        </div>
      </section>
    </aside>
  );
}

export default CinemaService;
