import './Main.css';
import TemperatureChart from '../TemperatureChart/TemperatureChart';
import PressureChart from '../PressureChart/PressureChart';

function Main(props) {
  const { readings } = props;

  return (
    <main className='main'>
      <TemperatureChart
        readings={readings}
      />
      <PressureChart
        readings={readings}
      />
    </main>
  )
}

export default Main; 