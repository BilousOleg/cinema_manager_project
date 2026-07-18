import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import defaultPhoto from './../../assets/defaultImages/defaultPhoto.png';
import EntityDetailsPage from '../EntityDetailsPage';
import DetailsListItem from '../../components/DetailsListItem';
import EntityLinks from '../../components/EntityLinks';

function DirectorDetailsPage () {
  const { directorId } = useParams();

  const { directors } = useSelector(state => state.directors);
  const { movies } = useSelector(state => state.movies);

  const director = directors.find(d => d.id === directorId);

  if (!director) {
    // NotFoundPage needed
    return <div>ERROR</div>;
  }

  const { firstName, lastName, birthDate, country, photo, biography } =
    director;
  const directorMovies = movies.filter(m => m.directorId === directorId);

  const formattedDate = birthDate.split('-').reverse().join('.');

  return (
    <EntityDetailsPage
      heading={`${firstName} ${lastName}`}
      imgSrc={photo}
      defaultImage={defaultPhoto}
      sectionTitle={'Director Information'}
    >
      <DetailsListItem title={'Country'} body={country} />
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
      <DetailsListItem title={'Biography'} body={biography} />
    </EntityDetailsPage>
  );
}

export default DirectorDetailsPage;
