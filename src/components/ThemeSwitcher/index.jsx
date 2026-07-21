import { useDispatch, useSelector } from 'react-redux';
import IconButton from '@mui/material/IconButton';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import classNames from 'classnames';
import { toggleTheme } from '../../store/slices/themeSlice';
import styles from './ThemeSwitcher.module.sass';

function ThemeSwitcher () {
  const theme = useSelector(state => state.theme.theme);
  const dispatch = useDispatch();

  return (
    <IconButton
      onClick={() => dispatch(toggleTheme())}
      className={classNames(styles.themeSwitcherBtn, {
        [styles.dark]: theme === 'dark',
        [styles.light]: theme === 'light',
      })}
    >
      {theme === 'dark' ? <LightModeIcon /> : <DarkModeIcon />}
    </IconButton>
  );
}

export default ThemeSwitcher;
