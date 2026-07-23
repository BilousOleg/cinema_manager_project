import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import defaultPhoto from './../../assets/defaultImages/defaultPhoto.png';
import NotFoundPage from '../NotFoundPage';
import EntityDetailsPage from '../EntityDetailsPage';
import DetailsListItem from '../../components/DetailsListItem';
import EntityLinks from '../../components/EntityLinks';

function ActorDetailsPage () {
  const { actorId } = useParams();

  const { actors } = useSelector(state => state.actors);
  const { movies } = useSelector(state => state.movies);

  const actor = actors.find(a => a.id === actorId);

  if (!actor) {
    return <NotFoundPage />;
  }

  const { firstName, lastName, birthDate, country, photo, biography } = actor;
  const actorMovies = movies.filter(m => m.actorIds.includes(actorId));

  const formattedDate = birthDate.split('-').reverse().join('.');

  return (
    <EntityDetailsPage
      heading={`${firstName} ${lastName}`}
      imgSrc={photo}
      defaultImage={defaultPhoto}
      sectionTitle={'Actor Information'}
    >
      <DetailsListItem title={'Country'} body={country} />
      <DetailsListItem title={'Birth date'} body={formattedDate} />
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
      <DetailsListItem title={'Biography'} body={biography || '—'} />
    </EntityDetailsPage>
  );
}

export default ActorDetailsPage;
