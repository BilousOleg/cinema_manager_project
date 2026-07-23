import { useRef } from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../../components/Header';
import Navigation from '../../components/Navigation';
import CinemaService from '../../components/CinemaService';
import Footer from '../../components/Footer';
import styles from './BasePage.module.sass';

function BasePage () {
  const contentRef = useRef(null);

  return (
    <div className={styles.appWrapper}>
      <Header />

      <div ref={contentRef} className={styles.content}>
        <Navigation />
        <main className={styles.main}>
          <Outlet />
        </main>
        <CinemaService contentRef={contentRef} />
      </div>

      <Footer />
    </div>
  );
}

export default BasePage;
