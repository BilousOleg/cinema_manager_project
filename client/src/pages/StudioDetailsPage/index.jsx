import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import defaultLogo from './../../assets/defaultImages/defaultLogo.png';
import { selectCountriesById } from '../../store/slices/countriesSlice';
import { loadStudioByIdThunk } from '../../store/slices/studiosSlice';
import NotFoundPage from '../NotFoundPage';
import DetailsListItem from '../../components/DetailsListItem';
import EntityDetailsPage from '../EntityDetailsPage';
import EntityLinks from '../../components/EntityLinks';
import NoItems from '../../components/NoItems';

function StudioDetailsPage () {
  const { studioId } = useParams();
  const dispatch = useDispatch();

  const { currentStudio, isFetching, error } = useSelector(
    state => state.studios
  );

  const countriesById = useSelector(selectCountriesById);

  useEffect(() => {
    dispatch(loadStudioByIdThunk(studioId));
  }, [dispatch, studioId]);

  if (isFetching) {
    return <NoItems message={'Loading...'} />;
  }

  if (error || !currentStudio) {
    return <NotFoundPage />;
  }

  const {
    name,
    founded,
    logo,
    countryId,
    description,
    Movies: studioMovies,
  } = currentStudio;

  const studioCountry = countriesById[countryId];

  return (
    <EntityDetailsPage
      heading={name}
      imgSrc={logo}
      defaultImage={defaultLogo}
      sectionTitle={'Studio Information'}
    >
      <DetailsListItem title={'Foundation year'} body={founded || '—'} />
      <DetailsListItem title={'Country'} body={studioCountry || '—'} />
      <DetailsListItem
        title={'Movies'}
        body={
          <EntityLinks
            items={studioMovies}
            basePath='movies'
            getLabel={movie => movie.title}
          />
        }
      />
      <DetailsListItem title={'Description'} body={description || '—'} />
    </EntityDetailsPage>
  );
}

export default StudioDetailsPage;
