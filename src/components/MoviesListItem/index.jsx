import { NavLink } from 'react-router-dom';
import EditIcon from '@mui/icons-material/Edit';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import styles from './MoviesListItem.module.sass';

function MoviesListItem ({ id, title, year, poster }) {
  return (
    <li>
      <NavLink to={`/movies/${id}`}>
        <article className={styles.movieCard}>
          <div className={styles.cardBlock}>
            <img src={poster} alt={title} />
            <p>
              {title}, {year}
            </p>
          </div>
          <div className={styles.cardBlock}>
            <button
              onClick={e => {
                e.preventDefault();
                e.stopPropagation();
              }}
            >
              <EditIcon />
            </button>
            <button
              onClick={e => {
                e.preventDefault();
                e.stopPropagation();
              }}
            >
              <HighlightOffIcon />
            </button>
          </div>
        </article>
      </NavLink>
    </li>
  );
}

export default MoviesListItem;
