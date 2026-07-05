import PopularGenresListItem from './PopularGenresListItem';
import styles from './PopularGenresList.module.sass';

function PopularGenresList ({ genres }) {
  return (
    <ul className={styles.popularGenresList}>
      {genres.map(g => (
        <PopularGenresListItem key={g.id} genre={g.name} />
      ))}
    </ul>
  );
}

export default PopularGenresList;
