import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const FollowersGraph = ({ graph_data }) => {
  if (!graph_data) {
    return;
  }

  const weekDailyFollowersGraph = {
    data_points: [
      { label: "Wed", value: 38805935 },
      { label: "Thu", value: 38837460 },
      { label: "Fri", value: 38863253 },
      { label: "Sat", value: 38804052 },
      { label: "Sun", value: 38774545 },
      { label: "Mon", value: 38731273 },
      { label: "Tue", value: 38684673 },
    ],
  };

  // Prepare labels and data
  const labels = weekDailyFollowersGraph.data_points.map(
    (point) => point.label
  );
  const data = weekDailyFollowersGraph.data_points.map((point) => point.value);

  const chartData = {
    labels: labels,
    datasets: [
      {
        label: "Followers",
        data: data,
        borderColor: "rgba(75, 192, 192, 1)",
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        borderWidth: 2,
        tension: 0.4,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Daily Followers Trend (Weekly)",
      },
    },
  };

  return <Line data={chartData} options={options} />;
};

export default FollowersGraph;
