import { NavLink } from 'react-router-dom';
import EditIcon from '@mui/icons-material/Edit';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import styles from './EntityListItem.module.sass';

function EntityListItem ({
  entity,
  id,
  image,
  primaryText,
  secondaryText,
  onEdit,
  onDelete,
}) {
  return (
    <li>
      <NavLink to={`/${entity}/${id}`}>
        <article className={styles.entityCard}>
          <div className={styles.cardBlock}>
            <img src={image} alt={primaryText} />
            <p>
              {primaryText}
              {secondaryText && `, ${secondaryText}`}
            </p>
          </div>

          <div className={styles.cardBlock}>
            <button
              onClick={e => {
                e.preventDefault();
                e.stopPropagation();
                onEdit?.(id);
              }}
            >
              <EditIcon />
            </button>
            <button
              onClick={e => {
                e.preventDefault();
                e.stopPropagation();
                onDelete?.(id);
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

export default EntityListItem;
