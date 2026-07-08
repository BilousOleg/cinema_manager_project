import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import getYoutubeEmbed from '../../utils/getYoutubeEmbedURL';
import styles from './MovieTrailerPage.module.sass';

function MovieTrailerPage () {
  const { movieId } = useParams();

  const { movies } = useSelector(state => state.movies);
  const movie = movies.find(m => m.id === Number(movieId));

  if (!movie) {
    return <div>Movie not found</div>;
  }

  const { trailer } = movie;

  const embedTrailer = getYoutubeEmbed(trailer);

  return (
    <article className={styles.trailerPage}>
      <iframe
        src={embedTrailer}
        title={`${movie.title} trailer`}
        allowFullScreen
      />
    </article>
  );
}

export default MovieTrailerPage;
