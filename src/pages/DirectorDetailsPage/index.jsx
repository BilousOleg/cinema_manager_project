import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import DetailsListItem from '../../components/DetailsListItem';
import styles from './DirectorDetailsPage.module.sass';

function DirectorDetailsPage () {
  const { directorId } = useParams();

  const { directors } = useSelector(state => state.directors);
  const { movies } = useSelector(state => state.movies);

  const director = directors.find(d => d.id === Number(directorId));

  if (!director) {
    // NotFoundPage needed
    return <div>ERROR</div>;
  }

  const { fullName, birthDate, country, photo, biography, movieIds } = director;

  const directorMovies = movieIds.map(id => movies.find(m => m.id === id));

  return (
    <article className={styles.directorDetailsCard}>
      <h2>{fullName}</h2>
      <section className={styles.descriptionSection}>
        <img src={photo} alt={fullName} />
        <div className={styles.directorInfo}>
          <h3>Actor Information</h3>
          <ul className={styles.directorInformationList}>
            <DetailsListItem title={'Country'} body={country} />
            <DetailsListItem
              title={'Birth date'}
              body={birthDate.replace('/', '.')}
            />
            <DetailsListItem
              title={'Movies'}
              body={directorMovies.map(m => m.title).join(', ')}
            />
            <DetailsListItem title={'Biography'} body={biography} />
          </ul>
        </div>
      </section>
    </article>
  );
}

export default DirectorDetailsPage;
