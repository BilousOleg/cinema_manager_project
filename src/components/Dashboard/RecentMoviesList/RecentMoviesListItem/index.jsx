import styles from './RecentMoviesListItem.module.sass';

function RecentMoviesListItem ({ title, poster }) {
  return (
    <li className={styles.recentFilmListItem}>
      <img src={poster} alt={title} />
      <h4>{title}</h4>
    </li>
  );
}

export default RecentMoviesListItem;
