import styles from './RecentFilmsListItem.module.sass';

function RecentFilmsListItem ({ name, imgSrc }) {
  return (
    <li className={styles.recentFilmListItem}>
      <img src={imgSrc} alt={name} />
      <h4>{name}</h4>
    </li>
  );
}

export default RecentFilmsListItem;
