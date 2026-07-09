import { useSelector } from 'react-redux';
import { NavLink, useParams } from 'react-router-dom';
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

  const { title, poster, genre, country, year, description } = movie;

  const movieActors = movie.actorIds.map(id => actors.find(a => a.id === id));
  const movieDirector = directors.find(d => d.id === movie.directorId);
  const movieStudio = studios.find(s => s.id === movie.studioId);

  return (
    <article className={styles.movieDetailsCard}>
      <h2>{title}</h2>
      <section className={styles.descriptionSection}>
        <img src={poster} alt={title} />
        <div className={styles.movieInfo}>
          <h3>Movie Definition</h3>
          <ul className={styles.movieDefinitionList}>
            <li>
              <p>
                Genre: <span className={styles.infoContainer}>{genre}</span>
              </p>
            </li>
            <li>
              <p>
                Country: <span className={styles.infoContainer}>{country}</span>
              </p>
            </li>
            <li>
              <p>
                Release year:{' '}
                <span className={styles.infoContainer}>{year}</span>
              </p>
            </li>
            <li>
              <p>
                Actors:{' '}
                <span className={styles.infoContainer}>
                  {movieActors.map(actor => actor.fullName).join(', ')}
                </span>
              </p>
            </li>
            <li>
              <p>
                Director:{' '}
                <span className={styles.infoContainer}>
                  {movieDirector?.fullName}
                </span>
              </p>
            </li>
            <li>
              <p>
                Studio:{' '}
                <span className={styles.infoContainer}>
                  {movieStudio?.name}
                </span>
              </p>
            </li>
            <li>
              <p>
                Description:{' '}
                <span className={styles.infoContainer}>{description}</span>
              </p>
            </li>
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
