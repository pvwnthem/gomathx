import React from 'react';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
  } from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
);

interface ChartProps {
  labels: number[];
  data: number[];
  label: string;
  borderColor: string;
}

function Chart({ labels, data, label, borderColor }: ChartProps) {
  const chartData = {
    labels,
    datasets: [
      {
        label,
        data,
        fill: false,
        borderColor,
        tension: 0.1,
      },
    ],
  };

  return (
    <div className='w-full h-full'>
      <Line data={chartData} />
    </div>
  );
}

export default Chart;