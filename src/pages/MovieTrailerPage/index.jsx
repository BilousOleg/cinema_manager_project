import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import getYoutubeEmbed from '../../utils/getYoutubeEmbedURL';
import NotFoundPage from '../NotFoundPage';
import styles from './MovieTrailerPage.module.sass';

function MovieTrailerPage () {
  const { movieId } = useParams();

  const { movies } = useSelector(state => state.movies);

  const movie = movies.find(m => m.id === movieId);

  if (!movie || !movie.trailer) {
    return <NotFoundPage />;
  }

  const embedTrailer = getYoutubeEmbed(movie.trailer);

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
