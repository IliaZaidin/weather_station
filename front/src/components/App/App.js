import './App.css';
import { Routes, Route } from "react-router-dom";
import { useState, useEffect } from 'react';

import Header from '../Header/Header';
import Main from '../Main/Main';
import Footer from '../Footer/Footer';

function App() {
  return (
    <div className="App">
      <Header 
        element={<Header/>}
      />
      <Routes>
        <Route
          path='/'
          element={<Main
          />
          }
        />

      </Routes>
      <Footer 
        element={<Footer/>}
      />
    </div>
  );
}

export default App;
