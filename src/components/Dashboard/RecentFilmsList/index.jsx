import RecentFilmsListItem from './RecentFilmsListItem';
import styles from './RecentFilmsList.module.sass';

function RecentFilmsList ({ films }) {
  return (
    <ul className={styles.recentFilmList}>
      {films.map(f => (
        <RecentFilmsListItem key={f.id} name={f.name} imgSrc={f.imgSrc} />
      ))}
    </ul>
  );
}

export default RecentFilmsList;
