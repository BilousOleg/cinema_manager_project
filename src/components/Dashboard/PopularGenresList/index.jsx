import PopularGenresListItem from './PopularGenresListItem';
import NoItems from '../NoItems';
import styles from './PopularGenresList.module.sass';

function PopularGenresList ({ genres }) {
  return genres.length ? (
    <ul className={styles.popularGenresList}>
      {genres.map(g => (
        <PopularGenresListItem key={g.id} genre={g.name} />
      ))}
    </ul>
  ) : (
    <NoItems message={'Looks like there is no movies to watch...'} />
  );
}

export default PopularGenresList;
