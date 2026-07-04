import Header from './components/Header';
import styles from './App.module.sass';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Home from './pages/Home';

function App () {
  return (
    <div className={styles.appWrapper}>
      <Router>
        <Header />
        <main className={styles.main}>
          <Routes>
            <Route index path='/' element={<Home />} />
          </Routes>
        </main>
      </Router>
    </div>
  );
}

export default App;
