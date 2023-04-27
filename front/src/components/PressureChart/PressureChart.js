import { Chart as ChartJS, LinearScale } from 'chart.js/auto'
import { Line } from "react-chartjs-2";

function PressureChart(props) {

  const { readings } = props;

  const pressureData = {
    labels: readings.map((data) => data.time.substr(0,5)),
    datasets: [{
      label: "Atmospheric Pressure",
      data: readings.map((data) => data.pressure),
      fill: true,
      tension: 0.5,
      backgroundColor: [
        'rgba(36, 85, 199, 0.5)'
      ]
    }],
  };

  return (
    <div className='pressure-chart'>
      <Line data={pressureData} />
    </div>
  )
}

export default PressureChart;

