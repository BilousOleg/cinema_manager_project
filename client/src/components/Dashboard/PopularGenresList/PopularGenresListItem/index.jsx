import styles from './PopularGenresListItem.module.sass';

function PopularGenresListItem ({ genre }) {
  return (
    <li className={styles.popularGenresListItem}>
      <h4>{genre}</h4>
    </li>
  );
}

export default PopularGenresListItem;
