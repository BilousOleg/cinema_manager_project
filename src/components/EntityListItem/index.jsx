import { NavLink } from 'react-router-dom';
import EditIcon from '@mui/icons-material/Edit';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import Image from '../Image';
import styles from './EntityListItem.module.sass';

function EntityListItem ({
  entity,
  id,
  image,
  defaultImage,
  primaryText,
  secondaryText,
  onEdit,
  onDelete,
}) {
  return (
    <li className={styles.entityListItem}>
      <NavLink to={`/${entity}/${id}`}>
        <article className={styles.entityCard}>
          <div className={styles.content}>
            <Image src={image} alt={primaryText} fallback={defaultImage} />
            <p className={styles.entityText}>
              {primaryText}
              {secondaryText && `, ${secondaryText}`}
            </p>
          </div>

          <div className={styles.actions}>
            <button
              onClick={e => {
                e.preventDefault();
                e.stopPropagation();
                onEdit(id);
              }}
            >
              <EditIcon />
            </button>
            <button
              onClick={e => {
                e.preventDefault();
                e.stopPropagation();
                onDelete(id);
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
