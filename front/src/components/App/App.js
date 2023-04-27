import './App.css';
import { Routes, Route } from "react-router-dom";
import { useState, useEffect } from 'react';

import Header from '../Header/Header';
import Main from '../Main/Main';
import Footer from '../Footer/Footer';

import { getReadingsFromDb } from '../../utils/api';

function App() {

  const [isModalOpen, setModalOpen] = useState(false);
  const [readings, setReadings] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const readingsFromDb = await getReadingsFromDb();
        if (readingsFromDb) {
          setReadings(readingsFromDb);
        }
      }
      catch {
        console.log('ERROR: failed to get data from DB');
        return;
      }
    }
    )();
  }, []);

  return (
    <div className="App">
      <Header
        element={<Header
          readings={"readings"}
        />}
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
