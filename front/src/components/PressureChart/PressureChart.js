import { Chart as ChartJS, LinearScale } from 'chart.js/auto'
import { Line } from "react-chartjs-2";
import { ReadingsData } from "../../utils/ReadingsData"; //need to pass as props or Redux


function PressureChart(props) {

  const pressureData = {}
  //   labels: props.map((data) => data.time),
  //   datasets: [{
  //     label: "Pressure",
  //     data: props.map((data) => data.pressure)
  //   }]
  // };

  return (
    <Line data={pressureData} />
  )
}

export default PressureChart;

