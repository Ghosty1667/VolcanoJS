import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';


ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
);

export const options = {
  responsive: true,
  aspectRatio: 3,
  maintainAspectRatio: true,
  plugins: {
    title: {
      display: true,
      text: 'Volcano Population',
    },
  },
};

const labels = ['5km', '10km', '30km', '100km'];

export default function VolcanoBar(volancoes) {
  const data = {
    labels,
    datasets: [
      {
        label: volancoes.country,
        data: [volancoes.population_5km, volancoes.population_10km, volancoes.population_30km, volancoes.population_100km],
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
    ],
  };
  return <Bar options={options} data={data} />;
}
