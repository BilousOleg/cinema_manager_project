import { useSelector } from 'react-redux';
import { NavLink, useParams } from 'react-router-dom';
import styles from './MovieDetailsPage.module.sass';

function MovieDetailsPage () {
  const { movieId } = useParams();

  const { movies } = useSelector(state => state.movies);
  const movie = movies.find(m => m.id === Number(movieId));

  if (!movie) {
    // NotFoundPage needed
    return <div>ERROR</div>;
  }

  const { title, poster, genre, country, year, description } = movie;

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

/* <section className={styles.trailerSection}>
        <iframe
          width='560'
          height='360'
          src={getYoutubeEmbed(trailer)}
          title='YouTube video player'
          allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'
          referrerPolicy='strict-origin-when-cross-origin'
          allowFullScreen
        ></iframe>
      </section> */

export default MovieDetailsPage;
