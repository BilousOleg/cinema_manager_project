import { NavLink } from 'react-router-dom';
import EditIcon from '@mui/icons-material/Edit';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import styles from './StudiosListItem.module.sass';

function StudiosListItem ({ id, name, founded, logo }) {
  return (
    <li>
      <NavLink to={`/studios/${id}`}>
        <article className={styles.studioCard}>
          <div className={styles.cardBlock}>
            <img src={logo} alt={name} />
            <p>
              {name}, {founded}
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

export default StudiosListItem;
