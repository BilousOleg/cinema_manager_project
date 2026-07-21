import Logo from '../Logo';
import ThemeSwitcher from '../ThemeSwitcher';
import styles from './Header.module.sass';
import CONSTANTS from '../../constants';

const { STATIC_IMAGES_PATH } = CONSTANTS;

function Header () {
  return (
    <header className={styles.header}>
      <div className={styles.headingGroup}>
        <Logo />
        <h1 className={styles.headerText}>Cinema Manager</h1>
      </div>
      <div className={styles.settingsGroup}>
        <ThemeSwitcher />
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
