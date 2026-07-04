import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/Home';
import Footer from './components/Footer';
import styles from './App.module.sass';

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
        <Footer />
      </Router>
    </div>
  );
}

export default App;
