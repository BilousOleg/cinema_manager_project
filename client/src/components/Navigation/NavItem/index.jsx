import { NavLink } from 'react-router-dom';
import classNames from 'classnames';
import styles from './NavItem.module.sass';

function NavItem ({ to, Icon, label }) {
  return (
    <li className={styles.navItem}>
      <NavLink
        to={to}
        className={({ isActive }) =>
          classNames(styles.navLink, {
            [styles.active]: isActive,
          })
        }
      >
        <Icon />
        <span>{label}</span>
      </NavLink>
    </li>
  );
}

export default NavItem;
