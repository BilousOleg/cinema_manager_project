import { Outlet } from 'react-router-dom';
import Header from '../../components/Header';
import Navigation from '../../components/Navigation';
import CinemaService from '../../components/CinemaService';
import Footer from '../../components/Footer';
import styles from './BasePage.module.sass';

function BasePage () {
  return (
    <div className={styles.appWrapper}>
      <Header />
      <Navigation />

      <main className={styles.main}>
        <Outlet />
      </main>

      <CinemaService />
      <Footer />
    </div>
  );
}

export default BasePage;
