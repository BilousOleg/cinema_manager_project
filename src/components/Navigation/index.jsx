import { NavLink } from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';
import MovieFilterIcon from '@mui/icons-material/MovieFilter';
import RecentActorsIcon from '@mui/icons-material/RecentActors';
import VideoCameraFrontIcon from '@mui/icons-material/VideoCameraFront';
import AssuredWorkloadIcon from '@mui/icons-material/AssuredWorkload';
import MiscellaneousServicesIcon from '@mui/icons-material/MiscellaneousServices';
import styles from './Navigation.module.sass';

function Navigation () {
  return (
    <nav className={styles.navMenu}>
      <ul className={styles.navList}>
        <li>
          <HomeIcon />
          <NavLink>Home</NavLink>
        </li>
        <li>
          <MovieFilterIcon />
          <NavLink>Movies</NavLink>
        </li>
        <li>
          <RecentActorsIcon />
          <NavLink>Actors</NavLink>
        </li>
        <li>
          <VideoCameraFrontIcon />
          <NavLink>Directors</NavLink>
        </li>
        <li>
          <AssuredWorkloadIcon />
          <NavLink>Studios</NavLink>
        </li>
        <li>
          <MiscellaneousServicesIcon />
          <NavLink>Service</NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default Navigation;
