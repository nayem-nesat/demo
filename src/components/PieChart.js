
import { useMemo } from 'react';
import { Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend
);

const PieChart = ({ questionData, answerData }) => {
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
          backgroundColor: [
            'rgba(255, 99, 132, 0.5)',
            'rgba(54, 162, 235, 0.5)',
            'rgba(255, 206, 86, 0.5)',
            'rgba(75, 192, 192, 0.5)',
            'rgba(153, 102, 255, 0.5)',
            'rgba(255, 159, 64, 0.5)'
          ],
          borderColor: [
            'rgb(255, 99, 132)',
            'rgb(54, 162, 235)',
            'rgb(255, 206, 86)',
            'rgb(75, 192, 192)',
            'rgb(153, 102, 255)',
            'rgb(255, 159, 64)'
          ],
          borderWidth: 1,
        },
      ],
    };
  }, [questionData, answerData]); // Removed question from dependencies

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: question ? question.question : "Pie Chart",
      },
    },
  };

  return <Pie data={chartData} options={chartOptions} />;
};

export default PieChart;
