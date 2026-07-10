import { useSelector } from 'react-redux';
import { NavLink, useParams } from 'react-router-dom';
import DetailsListItem from '../../components/DetailsListItem';
import styles from './MovieDetailsPage.module.sass';

function MovieDetailsPage () {
  const { movieId } = useParams();

  const { movies } = useSelector(state => state.movies);
  const { actors } = useSelector(state => state.actors);
  const { directors } = useSelector(state => state.directors);
  const { studios } = useSelector(state => state.studios);

  const movie = movies.find(m => m.id === Number(movieId));

  if (!movie) {
    // NotFoundPage needed
    return <div>ERROR</div>;
  }

  const {
    title,
    poster,
    genre,
    country,
    year,
    description,
    actorIds,
    directorId,
    studioId,
  } = movie;

  const movieActors = actorIds.map(id => actors.find(a => a.id === id));
  const movieDirector = directors.find(d => d.id === directorId);
  const movieStudio = studios.find(s => s.id === studioId);

  return (
    <article className={styles.movieDetailsCard}>
      <h2>{title}</h2>
      <section className={styles.descriptionSection}>
        <img src={poster} alt={title} />
        <div className={styles.movieInfo}>
          <h3>Movie Definition</h3>
          <ul className={styles.movieDefinitionList}>
            <DetailsListItem title={'Genre'} body={genre} />
            <DetailsListItem title={'Country'} body={country} />
            <DetailsListItem title={'Release year'} body={year} />
            <DetailsListItem
              title={'Actors'}
              body={movieActors.map(a => a.fullName).join(', ')}
            />
            <DetailsListItem
              title={'Director'}
              body={movieDirector?.fullName}
            />
            <DetailsListItem title={'Studio'} body={movieStudio?.name} />
            <DetailsListItem title={'Description'} body={description} />
          </ul>
        </div>
      </section>
      <NavLink
        to={`/movies/${movieId}/trailer`}
        className={styles.watchTrailerLink}
      >
        Watch Trailer
      </NavLink>
    </article>
  );
}

export default MovieDetailsPage;
