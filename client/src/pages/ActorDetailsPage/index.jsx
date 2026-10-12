import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import defaultPhoto from './../../assets/defaultImages/defaultPhoto.png';
import { selectCountriesById } from '../../store/slices/countriesSlice';
import { loadActorByIdThunk } from '../../store/slices/actorsSlice';
import NotFoundPage from '../NotFoundPage';
import EntityDetailsPage from '../EntityDetailsPage';
import DetailsListItem from '../../components/DetailsListItem';
import EntityLinks from '../../components/EntityLinks';
import NoItems from '../../components/NoItems';

function ActorDetailsPage () {
  const { actorId } = useParams();
  const dispatch = useDispatch();

  const { currentActor, isFetching, error } = useSelector(
    state => state.actors
  );

  const countriesById = useSelector(selectCountriesById);

  useEffect(() => {
    dispatch(loadActorByIdThunk(actorId));
  }, [dispatch, actorId]);

  if (isFetching) {
    return <NoItems message={'Loading...'} />;
  }

  if (error || !currentActor) {
    return <NotFoundPage />;
  }

  const {
    Person: { firstName, lastName, birthDate, countryId, photo, biography },
    Movies: actorMovies,
  } = currentActor;

  const actorCountry = countriesById[countryId];
  const formattedDate = birthDate?.split('-').reverse().join('.');

  return (
    <EntityDetailsPage
      heading={`${firstName} ${lastName}`}
      imgSrc={photo}
      defaultImage={defaultPhoto}
      sectionTitle={'Actor Information'}
    >
      <DetailsListItem title={'Country'} body={actorCountry || '—'} />
      <DetailsListItem title={'Birth date'} body={formattedDate || '—'} />
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
