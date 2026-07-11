import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Header from './components/Header';
import Navigation from './components/Navigation';
import Home from './pages/Home';
import MoviesPage from './pages/MoviesPage';
import MovieDetailsPage from './pages/MovieDetailsPage';
import MovieTrailerPage from './pages/MovieTrailerPage';
import ActorsPage from './pages/ActorsPage';
import ActorDetailsPage from './pages/ActorDetailsPage';
import DirectorsPage from './pages/DirectorsPage';
import DirectorDetailsPage from './pages/DirectorDetailsPage';
import StudiosPage from './pages/StudiosPage';
import StudioDetailsPage from './pages/StudioDetailsPage';
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
            <Route path='/movies' element={<MoviesPage />} />
            <Route path='/movies/:movieId' element={<MovieDetailsPage />} />
            <Route
              path='/movies/:movieId/trailer'
              element={<MovieTrailerPage />}
            />
            <Route path='/actors' element={<ActorsPage />} />
            <Route path='/actors/:actorId' element={<ActorDetailsPage />} />
            <Route path='/directors' element={<DirectorsPage />} />
            <Route
              path='/directors/:directorId'
              element={<DirectorDetailsPage />}
            />
            <Route path='/studios' element={<StudiosPage />} />
            <Route path='/studios/:studioId' element={<StudioDetailsPage />} />
          </Routes>
        </main>
        <CinemaService />
        <Footer />
      </Router>
    </div>
  );
}

export default App;
