import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, LineElement, PointElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, LineElement, PointElement, Title, Tooltip, Legend);

const Charts = ({ data }) => {
  const transformData = (data) => {
    if (!data || !Array.isArray(data.intervals)) {
      console.warn('Données invalides:', data);
      return {
        labels: [],
        datasets: [
          {
            label: 'Valeur du patrimoine',
            data: [],
            borderColor: 'rgba(75,192,192,1)',
            backgroundColor: 'rgba(75,192,192,0.2)',
            fill: false,
          }
        ]
      };
    }

    const labels = data.intervals.map(interval => {
      const date = new Date(interval.date);
      return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`; // Format année-mois-jour
    });

    const values = data.intervals.map(interval => {
      const value = Number(interval.value);
      if (isNaN(value)) {
        console.error('Valeur non numérique:', interval.value);
      }
      return value;
    });

    return {
      labels: labels,
      datasets: [
        {
          label: 'Valeur du patrimoine',
          data: values,
          borderColor: 'rgba(75,192,192,1)',
          backgroundColor: 'rgba(75,192,192,0.2)',
          fill: false,
        }
      ]
    };
  };

  const chartData = transformData(data);

  return (
    <Line 
      data={chartData} 
      options={{
        responsive: true,
        plugins: {
          legend: {
            position: 'top',
          },
          tooltip: {
            callbacks: {
              label: (context) => `${context.dataset.label}: ${context.raw}`,
            },
          },
        },
        scales: {
          x: {
            title: {
              display: true,
              text: 'Dates'
            }
          },
          y: {
            title: {
              display: true,
              text: 'Valeur'
            },
            ticks: {
              beginAtZero: true,
            }
          }
        }
      }} 
    />
  );
};

export default Charts;
