import { useDispatch, useSelector } from 'react-redux';
import classNames from 'classnames';
import MiscellaneousServicesIcon from '@mui/icons-material/MiscellaneousServices';
import { closeService, openService } from '../../store/slices/serviceSlice';
import navItems from './navItems';
import NavItem from './NavItem';
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
        {navItems.map(item => (
          <NavItem
            key={item.id}
            to={item.to}
            Icon={item.icon}
            label={item.label}
          />
        ))}

        <li className={styles.serviceItem}>
          <button
            className={classNames(styles.serviceBtn, {
              [styles.isActive]: isOpen,
            })}
            onClick={toggleServiceMenu}
          >
            <MiscellaneousServicesIcon />
            <span>Service</span>
          </button>
        </li>
      </ul>
    </nav>
  );
}

export default Navigation;
