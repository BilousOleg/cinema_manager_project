import SettingsIcon from '@mui/icons-material/Settings';
import Logo from '../Logo';
import styles from './Header.module.sass';
import CONSTANTS from '../../constants';

const { STATIC_IMAGES_PATH } = CONSTANTS;

function Header () {
  return (
    <header className={styles.header}>
      <div className={styles.headerGroup}>
        <Logo />
        <h1 className={styles.headerText}>Cinema Manager</h1>
      </div>
      <div className={styles.headerGroup}>
        <SettingsIcon />
        <img
          className={styles.avatar}
          src={`${STATIC_IMAGES_PATH}avatar.jpg`}
          alt='avatar'
        />
      </div>
    </header>
  );
}

export default Header;
