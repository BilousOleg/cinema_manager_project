import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import DetailsListItem from '../../components/DetailsListItem';
import styles from './StudioDetailsPage.module.sass';

function StudioDetailsPage () {
  const { studioId } = useParams();

  const { studios } = useSelector(state => state.studios);
  const { movies } = useSelector(state => state.movies);

  const studio = studios.find(a => a.id === Number(studioId));

  if (!studio) {
    // NotFoundPage needed
    return <div>ERROR</div>;
  }

  const { name, founded, country, logo, movieIds } = studio;

  const studioMovies = movieIds.map(id => movies.find(m => m.id === id));

  return (
    <article className={styles.studioDetailsCard}>
      <h2>{name}</h2>
      <section className={styles.descriptionSection}>
        <img src={logo} alt={name} />
        <div className={styles.studioInfo}>
          <h3>Studio Information</h3>
          <ul className={styles.studioInformationList}>
            <DetailsListItem title={'Foundation year'} body={founded} />
            <DetailsListItem title={'Country'} body={country} />
            <DetailsListItem
              title={'Movies'}
              body={studioMovies.map(m => m.title).join(', ')}
            />
          </ul>
        </div>
      </section>
    </article>
  );
}

export default StudioDetailsPage;
