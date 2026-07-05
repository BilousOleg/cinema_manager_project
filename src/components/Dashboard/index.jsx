import styles from './Dashboard.module.sass';
import PopularGenresList from './PopularGenresList';
import RecentFilmsList from './RecentFilmsList';
import TotalCountList from './TotalCountList';

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
    imgSrc:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRN6MBU9VxzNxqU0gzzOsgDR0Mpxn4_6BDHIzD-Xc8YaQ&s=10',
  },
  {
    id: 2,
    name: 'Joker',
    imgSrc:
      'https://m.media-amazon.com/images/M/MV5BNzY3OWQ5NDktNWQ2OC00ZjdlLThkMmItMDhhNDk3NTFiZGU4XkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg',
  },
  {
    id: 3,
    name: 'Oppenheimer',
    imgSrc:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRtHcEp4CGmgOhHGVGqDMZUfC_9z7xDnn9HMNj2fuq7yQ&s=10',
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
