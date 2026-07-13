import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import HomeIcon from '@mui/icons-material/Home';
import MovieFilterIcon from '@mui/icons-material/MovieFilter';
import RecentActorsIcon from '@mui/icons-material/RecentActors';
import VideoCameraFrontIcon from '@mui/icons-material/VideoCameraFront';
import AssuredWorkloadIcon from '@mui/icons-material/AssuredWorkload';
import MiscellaneousServicesIcon from '@mui/icons-material/MiscellaneousServices';
import { closeService, openService } from '../../store/slices/serviceSlice';
import styles from './Navigation.module.sass';

function Navigation () {
  const dispatch = useDispatch();

  const { isOpen } = useSelector(state => state.service);

  const toggleServiceMenu = () => {
    dispatch(isOpen ? closeService() : openService());
  };

  return (
    <nav className={styles.navMenu}>
      <ul className={styles.navList}>
        <li>
          <NavLink to='/' className={styles.navLink}>
            <HomeIcon />
            <span>Home</span>
          </NavLink>
        </li>
        <li>
          <NavLink to='/movies' className={styles.navLink}>
            <MovieFilterIcon />
            <span>Movies</span>
          </NavLink>
        </li>
        <li>
          <NavLink to='/actors' className={styles.navLink}>
            <RecentActorsIcon />
            <span>Actors</span>
          </NavLink>
        </li>
        <li>
          <NavLink to='/directors' className={styles.navLink}>
            <VideoCameraFrontIcon />
            <span>Directors</span>
          </NavLink>
        </li>
        <li>
          <NavLink to='/studios' className={styles.navLink}>
            <AssuredWorkloadIcon />
            <span>Studios</span>
          </NavLink>
        </li>
        <li>
          <button className={styles.serviceBtn} onClick={toggleServiceMenu}>
            <MiscellaneousServicesIcon />
            <span>Service</span>
          </button>
        </li>
      </ul>
    </nav>
  );
}

export default Navigation;
