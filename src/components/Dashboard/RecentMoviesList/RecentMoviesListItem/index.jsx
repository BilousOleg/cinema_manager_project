import { NavLink } from 'react-router-dom';
import Image from '../../../Image';
import styles from './RecentMoviesListItem.module.sass';

function RecentMoviesListItem ({ id, title, poster, fallback }) {
  return (
    <li>
      <NavLink to={`/movies/${id}`} className={styles.movieLink}>
        <figure className={styles.recentMoviesListItem}>
          <Image src={poster} fallback={fallback} alt={title} />
          <figcaption>{title}</figcaption>
        </figure>
      </NavLink>
    </li>
  );
}

export default RecentMoviesListItem;
