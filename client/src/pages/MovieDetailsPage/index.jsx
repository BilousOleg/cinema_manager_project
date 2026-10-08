import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import defaultPoster from './../../assets/defaultImages/defaultPoster.png';
import { loadMovieByIdThunk } from '../../store/slices/moviesSlice';
import NotFoundPage from '../NotFoundPage';
import EntityDetailsPage from '../EntityDetailsPage';
import DetailsListItem from '../../components/DetailsListItem';
import EntityList from '../../components/EntityList';
import EntityLinks from '../../components/EntityLinks';
import NoItems from '../../components/NoItems';
import styles from './MovieDetailsPage.module.sass';

function MovieDetailsPage () {
  const { movieId } = useParams();
  const dispatch = useDispatch();

  const { currentMovie, isFetching, error } = useSelector(
    state => state.movies
  );

  useEffect(() => {
    dispatch(loadMovieByIdThunk(movieId));
  }, [dispatch, movieId]);

  if (isFetching) {
    <NoItems message='Loading...' />;
  }

  if (error || !currentMovie) {
    return <NotFoundPage />;
  }

  const {
    title,
    trailer,
    poster,
    Genres: movieGenres,
    year,
    description,
    Actors: movieActors,
    Directors: movieDirectors,
    Studios: movieStudios,
  } = currentMovie;

  return (
    <>
      <EntityDetailsPage
        heading={title}
        imgSrc={poster}
        defaultImage={defaultPoster}
        sectionTitle={'Movie Definition'}
        actions={
          trailer ? (
            <Link
              to={`/movies/${movieId}/trailer`}
              className={styles.watchTrailerLink}
            >
              Watch Trailer
            </Link>
          ) : null
        }
      >
        <DetailsListItem
          title={'Genre'}
          body={<EntityList items={movieGenres} getLabel={g => g.genreName} />}
        />
        <DetailsListItem title={'Release year'} body={year} />
        <DetailsListItem
          title={'Actors'}
          body={
            <EntityLinks
              items={movieActors}
              basePath='actors'
              getLabel={({ Person }) =>
                `${Person.firstName} ${Person.lastName}`
              }
            />
          }
        />
        <DetailsListItem
          title={'Directors'}
          body={
            <EntityLinks
              items={movieDirectors}
              basePath='directors'
              getLabel={({ Person }) =>
                `${Person.firstName} ${Person.lastName}`
              }
            />
          }
        />
        <DetailsListItem
          title={'Studios'}
          body={
            <EntityLinks
              items={movieStudios}
              basePath='studios'
              getLabel={s => s.studioName}
            />
          }
        />
        <DetailsListItem title={'Description'} body={description || '—'} />
      </EntityDetailsPage>
    </>
  );
}

export default MovieDetailsPage;
