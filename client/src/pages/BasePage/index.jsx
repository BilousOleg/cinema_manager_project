import { Outlet } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { hideNotification } from '../../store/slices/notificationSlice';
import Header from '../../components/Header';
import Notification from '../../components/Notification';
import Navigation from '../../components/Navigation';
import CinemaService from '../../components/CinemaService';
import Footer from '../../components/Footer';
import styles from './BasePage.module.sass';

function BasePage () {
  const dispatch = useDispatch();

  const { message, type } = useSelector(state => state.notification);

  return (
    <div className={styles.appWrapper}>
      <Header />

      <Notification
        message={message}
        type={type}
        onClose={() => dispatch(hideNotification())}
      />

      <div className={styles.content}>
        <Navigation />
        <main className={styles.main}>
          <Outlet />
        </main>
        <CinemaService />
      </div>

      <Footer />
    </div>
  );
}

export default BasePage;
