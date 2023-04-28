import './App.css';
import { Routes, Route } from "react-router-dom";
import { useState, useEffect } from 'react';

import Header from '../Header/Header';
import Main from '../Main/Main';
import Footer from '../Footer/Footer';

import { getReadingsFromDb, getForecast } from '../../utils/api';

function App() {

  const [readings, setReadings] = useState([]);
  const [forecast, setForecast] = useState('');

  useEffect(() => {
    (async () => {
      try {
        const readingsFromDb = await getReadingsFromDb();
        if (readingsFromDb) {
          setReadings(readingsFromDb);
        }
        const forecastFromBe = await getForecast();
        if (forecastFromBe) {
          setForecast(forecastFromBe);
        }
      }
      catch {
        console.log('ERROR in useEffect');
        return;
      }
    }
    )();
  }, []);

  return (
    <div className="App">
      <Header
        forecast={forecast}
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
