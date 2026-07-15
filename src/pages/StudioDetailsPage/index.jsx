import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import useCinemaService from '../../hooks/useCinemaService';
import DetailsListItem from '../../components/DetailsListItem';
import EntityDetailsPage from '../EntityDetailsPage';
import EntityLinks from '../../components/EntityLinks';

function StudioDetailsPage () {
  const { studioId } = useParams();

  useCinemaService('studios', 'edit', studioId);

  const { studios } = useSelector(state => state.studios);
  const { movies } = useSelector(state => state.movies);

  const studio = studios.find(a => a.id === Number(studioId));

  if (!studio) {
    // NotFoundPage needed
    return <div>ERROR</div>;
  }

  const { name, founded, country, logo, movieIds } = studio;

  const studioMovies = movieIds.map(id => movies.find(m => m.id === id));

  return (
    <EntityDetailsPage
      heading={name}
      imgSrc={logo}
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
    </EntityDetailsPage>
  );
}

export default StudioDetailsPage;
