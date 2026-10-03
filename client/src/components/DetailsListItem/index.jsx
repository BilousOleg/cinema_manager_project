import styles from './DetailsListItem.module.sass';

function DetailsListItem ({ title, body }) {
  return (
    <li>
      <p>
        {title}: <span className={styles.infoContainer}>{body ?? ''}</span>
      </p>
    </li>
  );
}

export default DetailsListItem;
