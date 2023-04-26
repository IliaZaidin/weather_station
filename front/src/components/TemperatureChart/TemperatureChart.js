import {Chart as ChartJS, LinearScale} from 'chart.js/auto'
import { Line } from "react-chartjs-2";
import { ReadingsData } from "../../utils/ReadingsData"; //need to pass as props or Redux


function TemperatureChart(props) {

  const temperatureData = { }
  //     labels: props.map((data) => data.time),
  //     datasets: [{
  //       label: "Temperature",
  //       data: props.map((data) => data.temperature)
  //     }]
  // };

  return (
    <Line data={temperatureData} />
  )
}

export default TemperatureChart;