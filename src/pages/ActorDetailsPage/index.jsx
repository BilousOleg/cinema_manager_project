import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import useCinemaService from '../../hooks/useCinemaService';
import EntityDetailsPage from '../EntityDetailsPage';
import DetailsListItem from '../../components/DetailsListItem';
import EntityLinks from '../../components/EntityLinks';

function ActorDetailsPage () {
  const { actorId } = useParams();

  useCinemaService('actors', 'edit', actorId);

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
    <EntityDetailsPage
      heading={fullName}
      imgSrc={photo}
      sectionTitle={'Actor Information'}
    >
      <DetailsListItem title={'Country'} body={country} />
      <DetailsListItem
        title={'Birth date'}
        body={birthDate.replaceAll('-', '.')}
      />
      <DetailsListItem
        title={'Movies'}
        body={
          <EntityLinks
            items={actorMovies}
            basePath='movies'
            getLabel={movie => movie.title}
          />
        }
      />
      <DetailsListItem title={'Biography'} body={biography} />
    </EntityDetailsPage>
  );
}

export default ActorDetailsPage;
