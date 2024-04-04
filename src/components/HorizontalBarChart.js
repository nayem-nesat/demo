// components/HorizontalBarChart.js
import { useMemo } from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const HorizontalBarChart = ({ questionData, answerData }) => {
  // Find the question with questionIndex 3
  const question = questionData.find((q) => q.questionIndex === 3);

  const chartData = useMemo(() => {
    const relatedAnswers = answerData.filter(
      (a) => a.questionIndex === 3 && a.answer.trim() !== ""
    );

    const answerCounts = relatedAnswers.reduce((acc, answer) => {
      const answerText = answer.answer.trim();
      if (answerText) {
        acc[answerText] = (acc[answerText] || 0) + 1;
      }
      return acc;
    }, {});

    const labels = Object.keys(answerCounts);
    const data = Object.values(answerCounts);

    return {
      labels,
      datasets: [
        {
          label: question ? question.question : "Answers",
          data: data,
          backgroundColor: "rgba(255, 99, 132, 0.5)",
          borderColor: "rgb(255, 99, 132)",
          borderWidth: 1,
        },
      ],
    };
  }, [questionData, answerData]); // Removed question from dependencies

  const chartOptions = {
    indexAxis: 'y', // This will make the bar chart horizontal
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: true,
        text: question ? question.question : "Horizontal Bar Chart",
      },
    },
    scales: {
      x: {
        beginAtZero: true,
      },
    },
  };

  return <Bar data={chartData} options={chartOptions} />;
};

export default HorizontalBarChart;
