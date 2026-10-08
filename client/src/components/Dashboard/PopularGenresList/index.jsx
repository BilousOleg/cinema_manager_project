import PopularGenresListItem from './PopularGenresListItem';
import NoItems from '../../NoItems';
import styles from './PopularGenresList.module.sass';

function PopularGenresList ({ genres, isFetching, error }) {
  if (isFetching) {
    return <NoItems message={'Loading...'} />;
  }

  if (error) {
    return <NoItems message={`${error.message}`} />;
  }

  return genres.length ? (
    <ul className={styles.popularGenresList}>
      {genres.map(g => (
        <PopularGenresListItem key={g.id} genre={g.genreName} />
      ))}
    </ul>
  ) : (
    <NoItems message={'Looks like there is no movies to watch...'} />
  );
}

export default PopularGenresList;
