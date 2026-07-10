import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import DetailsListItem from '../../components/DetailsListItem';
import styles from './ActorDetailsPage.module.sass';

function ActorDetailsPage () {
  const { actorId } = useParams();

  const { actors } = useSelector(state => state.actors);
  const { movies } = useSelector(state => state.movies);

  const actor = actors.find(a => a.id === Number(actorId));

  if (!actor) {
    // NotFoundPage needed
    return <div>ERROR</div>;
  }

  const { fullName, birthDate, country, photo, biography, movieIds } = actor;

  const actorMovies = movieIds.map(id => movies.find(m => m.id === id));

  return (
    <article className={styles.actorDetailsCard}>
      <h2>{fullName}</h2>
      <section className={styles.descriptionSection}>
        <img src={photo} alt={fullName} />
        <div className={styles.actorInfo}>
          <h3>Actor Information</h3>
          <ul className={styles.actorInformationList}>
            <DetailsListItem title={'Country'} body={country} />
            <DetailsListItem
              title={'Birth date'}
              body={birthDate.replace('/', '.')}
            />
            <DetailsListItem
              title={'Movies'}
              body={actorMovies.map(m => m.title).join(', ')}
            />
            <DetailsListItem title={'Biography'} body={biography} />
          </ul>
        </div>
      </section>
    </article>
  );
}

export default ActorDetailsPage;
