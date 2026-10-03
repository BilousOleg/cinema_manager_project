import HomeIcon from '@mui/icons-material/Home';
import MovieFilterIcon from '@mui/icons-material/MovieFilter';
import RecentActorsIcon from '@mui/icons-material/RecentActors';
import VideoCameraFrontIcon from '@mui/icons-material/VideoCameraFront';
import AssuredWorkloadIcon from '@mui/icons-material/AssuredWorkload';
import CONSTANTS from '../../constants';

const {
  ROUTES: { HOME, MOVIES, ACTORS, DIRECTORS, STUDIOS },
} = CONSTANTS;

const navItems = [
  {
    id: 'home',
    to: HOME,
    label: 'Home',
    icon: HomeIcon,
  },
  {
    id: 'movies',
    to: MOVIES,
    label: 'Movies',
    icon: MovieFilterIcon,
  },
  {
    id: 'actors',
    to: ACTORS,
    label: 'Actors',
    icon: RecentActorsIcon,
  },
  {
    id: 'directors',
    to: DIRECTORS,
    label: 'Directors',
    icon: VideoCameraFrontIcon,
  },
  {
    id: 'studios',
    to: STUDIOS,
    label: 'Studios',
    icon: AssuredWorkloadIcon,
  },
];

export default navItems;
