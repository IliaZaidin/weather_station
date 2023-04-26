import './App.css';
import { Routes, Route } from "react-router-dom";
import { useState, useEffect } from 'react';

import Header from '../Header/Header';
import Main from '../Main/Main';
import Footer from '../Footer/Footer';

import { getReadingsFromDb } from '../../utils/api';

function App() {

  const [readings, setReadings] = useState([{}]);
  const [isModalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const readingsFromDb = await getReadingsFromDb();
        console.log(readingsFromDb)
        if (readingsFromDb) {
          setReadings(readingsFromDb);
          console.log(readings);
        }
      } catch {
        console.log('ERROR: failed to get data from DB')
        return;
      }
    })();
  }, []);

  return (
    <div className="App">
      <Header
        element={<Header />}
      />
      <Routes>
        <Route
          path='/'
          element={<Main
            readings={readings}
          />}
        />
      </Routes>
      <Footer
        element={<Footer />}
      />
    </div>
  );
}

export default App;
