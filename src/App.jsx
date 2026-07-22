import { useEffect, useLayoutEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { loadMoviesThunk } from './store/slices/moviesSlice';
import { loadActorsThunk } from './store/slices/actorsSlice';
import { loadDirectorsThunk } from './store/slices/directorsSlice';
import { loadStudiosThunk } from './store/slices/studiosSlice';
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
import BasePage from './pages/BasePage';
import CONSTANTS from './constants';

const {
  ROUTES: { HOME, MOVIES, ACTORS, DIRECTORS, STUDIOS },
} = CONSTANTS;

function App () {
  const { theme } = useSelector(state => state.theme);
  const dispatch = useDispatch();

  useLayoutEffect(() => {
    document.documentElement.dataset.theme = theme;
  }, [theme]);

  useEffect(() => {
    dispatch(loadMoviesThunk());
    dispatch(loadActorsThunk());
    dispatch(loadDirectorsThunk());
    dispatch(loadStudiosThunk());
  }, [dispatch]);

  return (
    <Router>
      <Routes>
        <Route element={<BasePage />}>
          <Route index path={HOME} element={<Home />} />
          <Route path={MOVIES}>
            <Route index element={<MoviesPage />} />
            <Route path=':movieId' element={<MovieDetailsPage />} />
            <Route path=':movieId/trailer' element={<MovieTrailerPage />} />
          </Route>
          <Route path={ACTORS}>
            <Route index element={<ActorsPage />} />
            <Route path=':actorId' element={<ActorDetailsPage />} />
          </Route>
          <Route path={DIRECTORS}>
            <Route index element={<DirectorsPage />} />
            <Route path=':directorId' element={<DirectorDetailsPage />} />
          </Route>
          <Route path={STUDIOS}>
            <Route index element={<StudiosPage />} />
            <Route path=':studioId' element={<StudioDetailsPage />} />
          </Route>
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
