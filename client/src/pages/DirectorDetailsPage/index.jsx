import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import defaultPhoto from './../../assets/defaultImages/defaultPhoto.png';
import { loadDirectorByIdThunk } from '../../store/slices/directorsSlice';
import NotFoundPage from '../NotFoundPage';
import EntityDetailsPage from '../EntityDetailsPage';
import DetailsListItem from '../../components/DetailsListItem';
import EntityLinks from '../../components/EntityLinks';
import NoItems from '../../components/NoItems';

function DirectorDetailsPage () {
  const { directorId } = useParams();
  const dispatch = useDispatch();

  const { currentDirector, isFetching, error } = useSelector(
    state => state.directors
  );

  useEffect(() => {
    dispatch(loadDirectorByIdThunk(directorId));
  }, [dispatch, directorId]);

  if (isFetching) {
    return <NoItems message={'Loading...'} />;
  }

  if (error || !currentDirector) {
    return <NotFoundPage />;
  }

  const {
    Person: {
      firstName,
      lastName,
      birthDate,
      photo,
      biography,
      Country: { countryName },
    },
    Movies: directorMovies,
  } = currentDirector;

  const formattedDate = birthDate.split('-').reverse().join('.');

  return (
    <EntityDetailsPage
      heading={`${firstName} ${lastName}`}
      imgSrc={photo}
      defaultImage={defaultPhoto}
      sectionTitle={'Director Information'}
    >
      <DetailsListItem title={'Country'} body={countryName} />
      <DetailsListItem title={'Birth date'} body={formattedDate} />
      <DetailsListItem
        title={'Movies'}
        body={
          <EntityLinks
            items={directorMovies}
            basePath='movies'
            getLabel={movie => movie.title}
          />
        }
      />
      <DetailsListItem title={'Biography'} body={biography || '—'} />
    </EntityDetailsPage>
  );
}

export default DirectorDetailsPage;
