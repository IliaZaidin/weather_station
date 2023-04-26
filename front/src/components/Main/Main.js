import './Main.css';
import TemperatureChart from '../TemperatureChart/TemperatureChart';
import PressureChart from '../PressureChart/PressureChart';

// import { useState } from 'react';

function Main(props) {
  const { readings } = props;
  return (
    <main className='main'>
      {/* <TemperatureChart
        data={readings}
      />
      <PressureChart
        readings={readings}
      /> */}
    </main>
  )
}

export default Main; 