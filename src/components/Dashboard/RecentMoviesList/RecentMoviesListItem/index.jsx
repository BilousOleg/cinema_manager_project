import Image from '../../../Image';
import styles from './RecentMoviesListItem.module.sass';

function RecentMoviesListItem ({ title, poster, fallback }) {
  return (
    <li className={styles.recentFilmListItem}>
      <Image src={poster} fallback={fallback} alt={title} />
      <h4>{title}</h4>
    </li>
  );
}

export default RecentMoviesListItem;
