import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import EntityDetailsPage from '../EntityDetailsPage';
import DetailsListItem from '../../components/DetailsListItem';

function ActorDetailsPage () {
  const { actorId } = useParams();

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
        body={actorMovies.map(m => m.title).join(', ')}
      />
      <DetailsListItem title={'Biography'} body={biography} />
    </EntityDetailsPage>
  );
}

export default ActorDetailsPage;
