import Logo from '../Logo';
import SettingsIcon from '@mui/icons-material/Settings';
import styles from './Header.module.sass';

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
          src='/public/staticImages/avatar.jpg'
          alt='avatar'
        />
      </div>
    </header>
  );
}

export default Header;
