import PopularGenresList from './PopularGenresList';
import RecentFilmsList from './RecentFilmsList';
import TotalCountList from './TotalCountList';
import styles from './Dashboard.module.sass';
import CONSTANTS from '../../constants';

const { STATIC_IMAGES_PATH } = CONSTANTS;

const genres = [
  {
    id: 1,
    name: 'Action',
  },
  {
    id: 2,
    name: 'Drama',
  },
  {
    id: 3,
    name: 'Comedy',
  },
  {
    id: 4,
    name: 'Fantasy',
  },
];

const films = [
  {
    id: 1,
    name: 'Interstellar',
    imgSrc: `${STATIC_IMAGES_PATH}posters/interstellar.jpg`,
  },
  {
    id: 2,
    name: 'Joker',
    imgSrc: `${STATIC_IMAGES_PATH}posters/joker.jpg`,
  },
  {
    id: 3,
    name: 'Oppenheimer',
    imgSrc: `${STATIC_IMAGES_PATH}posters/oppenheimer.jpg`,
  },
];

function Dashboard () {
  return (
    <article className={styles.dashboard}>
      <h2 className={styles.dashboardHeading}>Welcome to the Cinema Manager</h2>
      <TotalCountList />
      <h3 className={styles.dashboardListHeading}>Recently added movies</h3>
      <RecentFilmsList films={films} />
      <h3 className={styles.dashboardListHeading}>Popular genres</h3>
      <PopularGenresList genres={genres} />
    </article>
  );
}

export default Dashboard;
