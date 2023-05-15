import './App.css';
import { Routes, Route } from "react-router-dom";
import { useState, useEffect } from 'react';

import Header from '../Header/Header';
import Main from '../Main/Main';
import Footer from '../Footer/Footer';

import { getReadingsFromDb, getForecast } from '../../utils/api';
import { lookupTable } from '../../utils/consts';

function App() {

  const [pollingState, setPollingState] = useState(false);
  const [readings, setReadings] = useState([]);
  const [forecast, setForecast] = useState('');
  const [currentDate, setCurrentDate] = useState(new Date());

  useEffect(() => {
    pollDataAtServer();
    setCurrentDate(new Date());
  }, [pollingState]);
  
  function pollDataAtServer() {
    (async () => {
      try {
        const readingsFromDb = await getReadingsFromDb();
        if (readingsFromDb) {
          setReadings(readingsFromDb);
        }
        const forecastCode = await getForecast();
        if (forecastCode) {
            setForecast(lookupTable.get(forecastCode));
        }
      }
      catch {
        console.log('ERROR in useEffect');
        return;
      }
    }
    )();
  };
  
  setInterval(() => {
    const time = new Date()
    if (time.getMinutes() === 1) {
      setPollingState(!pollingState);
    }
  }, 1000 * 60)

  return (
    <div className="App">
      <Header
        forecast={forecast}
        currentDate={currentDate}
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
