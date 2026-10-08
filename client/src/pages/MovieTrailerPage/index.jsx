import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { loadMovieByIdThunk } from '../../store/slices/moviesSlice';
import getYoutubeEmbed from '../../utils/getYoutubeEmbedURL';
import NotFoundPage from '../NotFoundPage';
import NoItems from '../../components/NoItems';
import styles from './MovieTrailerPage.module.sass';

function MovieTrailerPage () {
  const { movieId } = useParams();
  const dispatch = useDispatch();

  const { currentMovie, isFetching, error } = useSelector(
    state => state.movies
  );

  useEffect(() => {
    dispatch(loadMovieByIdThunk(movieId));
  }, [dispatch, movieId]);

  if (isFetching) {
    return <NoItems message='Loading' />;
  }

  if (error || !currentMovie || !currentMovie.trailer) {
    return <NotFoundPage />;
  }

  const { title, trailer } = currentMovie;

  const embedTrailer = getYoutubeEmbed(trailer);

  return (
    <article className={styles.trailerPage}>
      <iframe src={embedTrailer} title={`${title} trailer`} allowFullScreen />
    </article>
  );
}

export default MovieTrailerPage;
