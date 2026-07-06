import EditIcon from '@mui/icons-material/Edit';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import styles from './MoviesListItem.module.sass';

function MoviesListItem ({ title, year, imgSrc }) {
  return (
    <li>
      <article className={styles.movieCard}>
        <div className={styles.cardBlock}>
          <img src={imgSrc} alt={title} />
          <p>
            {title}, {year}
          </p>
        </div>
        <div className={styles.cardBlock}>
          <button>
            <EditIcon />
          </button>
          <button>
            <HighlightOffIcon />
          </button>
        </div>
      </article>
    </li>
  );
}

export default MoviesListItem;
