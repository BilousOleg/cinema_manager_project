import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Header from './components/Header';
import Navigation from './components/Navigation';
import Home from './pages/Home';
import MoviesPage from './pages/MoviesPage';
import CinemaService from './components/CinemaService';
import Footer from './components/Footer';
import styles from './App.module.sass';

function App () {
  return (
    <div className={styles.appWrapper}>
      <Router>
        <Header />
        <Navigation />
        <main className={styles.main}>
          <Routes>
            <Route index path='/' element={<Home />} />
            <Route index path='/movies' element={<MoviesPage />} />
          </Routes>
        </main>
        <CinemaService />
        <Footer />
      </Router>
    </div>
  );
}

export default App;
