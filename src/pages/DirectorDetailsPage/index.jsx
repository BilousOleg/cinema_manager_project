import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import useService from '../../hooks/useService';
import EntityDetailsPage from '../EntityDetailsPage';
import DetailsListItem from '../../components/DetailsListItem';
import EntityLinks from '../../components/EntityLinks';

function DirectorDetailsPage () {
  const { directorId } = useParams();

  useService('directors', 'edit', directorId);

  const { directors } = useSelector(state => state.directors);
  const { movies } = useSelector(state => state.movies);

  const director = directors.find(d => d.id === Number(directorId));

  if (!director) {
    // NotFoundPage needed
    return <div>ERROR</div>;
  }

  const { fullName, birthDate, country, photo, biography, movieIds } = director;

  const directorMovies = movieIds.map(id => movies.find(m => m.id === id));

  return (
    <EntityDetailsPage
      heading={fullName}
      imgSrc={photo}
      sectionTitle={'Director Information'}
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
