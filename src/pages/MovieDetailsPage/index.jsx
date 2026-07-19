import { useSelector } from 'react-redux';
import { NavLink, useParams } from 'react-router-dom';
import EntityDetailsPage from '../EntityDetailsPage';
import DetailsListItem from '../../components/DetailsListItem';
import EntityLinks from '../../components/EntityLinks';
import defaultPoster from './../../assets/defaultImages/defaultPoster.png';
import styles from './MovieDetailsPage.module.sass';
import CONSTANTS from '../../constants';

const { GENRES_BY_ID } = CONSTANTS;

function MovieDetailsPage () {
  const { movieId } = useParams();

  const { movies } = useSelector(state => state.movies);
  const { actors } = useSelector(state => state.actors);
  const { directors } = useSelector(state => state.directors);
  const { studios } = useSelector(state => state.studios);

  const movie = movies.find(m => m.id === movieId);

  if (!movie) {
    // NotFoundPage needed
    return <div>ERROR</div>;
  }

  const {
    title,
    poster,
    genreId,
    year,
    description,
    actorIds,
    directorId,
    studioId,
  } = movie;

  const movieActors = actorIds
    .map(id => actors.find(a => a.id === id))
    .filter(item => !!item);
  const movieDirector = directors.find(d => d.id === directorId);
  const movieStudio = studios.find(s => s.id === studioId);

  return (
    <>
      <EntityDetailsPage
        heading={title}
        imgSrc={poster}
        defaultImage={defaultPoster}
        sectionTitle={'Movie Definition'}
        actions={
          <NavLink
            to={`/movies/${movieId}/trailer`}
            className={styles.watchTrailerLink}
          >
            Watch Trailer
          </NavLink>
        }
      >
        <DetailsListItem
          title={'Genre'}
          body={GENRES_BY_ID[genreId].name ?? '—'}
        />
        <DetailsListItem title={'Release year'} body={year} />
        <DetailsListItem
          title={'Actors'}
          body={
            <EntityLinks
              items={movieActors}
              basePath='actors'
              getLabel={a => `${a.firstName} ${a.lastName}`}
            />
          }
        />
        <DetailsListItem
          title={'Director'}
          body={
            movieDirector ? (
              <NavLink to={`/directors/${movieDirector.id}`}>
                {`${movieDirector.firstName} ${movieDirector.lastName}`}
              </NavLink>
            ) : (
              <span>—</span>
            )
          }
        />
        <DetailsListItem
          title={'Studio'}
          body={
            movieStudio ? (
              <NavLink to={`/studios/${movieStudio.id}`}>
                {movieStudio.name}
              </NavLink>
            ) : (
              <span>—</span>
            )
          }
        />
        <DetailsListItem title={'Description'} body={description || '—'} />
      </EntityDetailsPage>
    </>
  );
}

export default MovieDetailsPage;
