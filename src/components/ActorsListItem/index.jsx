import { NavLink } from 'react-router-dom';
import EditIcon from '@mui/icons-material/Edit';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import styles from './ActorsListItem.module.sass';

function ActorsListItem ({ id, fullName, photo }) {
  return (
    <li>
      <NavLink to={`/actors/${id}`}>
        <article className={styles.actorCard}>
          <div className={styles.cardBlock}>
            <img src={photo} alt={fullName} />
            <p>{fullName}</p>
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

export default ActorsListItem;
