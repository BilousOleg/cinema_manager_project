import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import defaultLogo from './../../assets/defaultImages/defaultLogo.png';
import DetailsListItem from '../../components/DetailsListItem';
import EntityDetailsPage from '../EntityDetailsPage';
import EntityLinks from '../../components/EntityLinks';

function StudioDetailsPage () {
  const { studioId } = useParams();

  const { studios } = useSelector(state => state.studios);
  const { movies } = useSelector(state => state.movies);

  const studio = studios.find(a => a.id === studioId);

  if (!studio) {
    // NotFoundPage needed
    return <div>ERROR</div>;
  }

  const { name, founded, country, logo, description } = studio;

  const studioMovies = movies.filter(m => m.studioId === studioId);

  return (
    <EntityDetailsPage
      heading={name}
      imgSrc={logo}
      defaultImage={defaultLogo}
      sectionTitle={'Studio Information'}
    >
      <DetailsListItem title={'Foundation year'} body={founded} />
      <DetailsListItem title={'Country'} body={country} />
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
      <DetailsListItem title={'Description'} body={description} />
    </EntityDetailsPage>
  );
}

export default StudioDetailsPage;
