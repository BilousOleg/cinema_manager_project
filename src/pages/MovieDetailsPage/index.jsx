import { useSelector } from 'react-redux';
import { NavLink, useParams } from 'react-router-dom';
import EntityDetailsPage from '../EntityDetailsPage';
import DetailsListItem from '../../components/DetailsListItem';
import EntityLinks from '../../components/EntityLinks';
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
    <>
      <EntityDetailsPage
        heading={title}
        imgSrc={poster}
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
        <DetailsListItem title={'Genre'} body={genre} />
        <DetailsListItem title={'Country'} body={country} />
        <DetailsListItem title={'Release year'} body={year} />
        <DetailsListItem
          title={'Actors'}
          body={
            <EntityLinks
              items={movieActors}
              basePath='actors'
              getLabel={a => a.fullName}
            />
          }
        />
        <DetailsListItem
          title={'Director'}
          body={
            <NavLink to={`/directors/${movieDirector.id}`}>
              {movieDirector.fullName}
            </NavLink>
          }
        />
        <DetailsListItem
          title={'Studio'}
          body={
            <NavLink to={`/studios/${movieStudio.id}`}>
              {movieStudio.name}
            </NavLink>
          }
        />
        <DetailsListItem title={'Description'} body={description} />
      </EntityDetailsPage>
    </>
  );
}

export default MovieDetailsPage;
