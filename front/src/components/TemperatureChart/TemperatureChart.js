import { Chart as ChartJS, LinearScale } from 'chart.js/auto'
import { Line } from "react-chartjs-2";

function TemperatureChart(props) {

  const { readings } = props;

  const temperatureData = {
    labels: readings.map((data) => {
      const time = new Date(data.timestamp);
      return time.getHours() + ':' + time.getMinutes();
    }),
    datasets: [{
      label: "Temperature",
      data: readings.map((data) => data.temperature),
      fill: true,
      tension: 0.5,
      backgroundColor: [
        'rgba(36, 85, 199, 0.5'
      ]
    }]
  };

  return (
    <div className='temp-chart'>
      <Line data={temperatureData} />
    </div>
  )
}

export default TemperatureChart;