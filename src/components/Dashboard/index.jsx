import PopularGenresList from './PopularGenresList';
import RecentFilmsList from './RecentFilmsList';
import TotalCountList from './TotalCountList';
import styles from './Dashboard.module.sass';

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
    imgSrc: `https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRN6MBU9VxzNxqU0gzzOsgDR0Mpxn4_6BDHIzD-Xc8YaQ&s=10`,
  },
  {
    id: 2,
    name: 'Joker',
    imgSrc: `https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRPOXFFZpg7J8ka6L6mvKWbczd0RSi6cewOp5cssjDsAg&s`,
  },
  {
    id: 3,
    name: 'Oppenheimer',
    imgSrc: `https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR3gsJAEwsM9Y3lIK2f6M24jtsae8ljoF2kFvC03Qn7Tw&s`,
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
