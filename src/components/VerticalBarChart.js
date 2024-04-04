// components/VerticalBarChart.js
import { useMemo } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const VerticalBarChart = ({ questionData, answerData }) => {
  // Find the question with questionIndex 3

  const question = questionData.find((q) => q.questionIndex === 3);

  const chartData = useMemo(() => {
    console.log("Question:", question);

    // Filter answers related to the question with questionIndex 3
    const relatedAnswers = answerData.filter(
      (a) => a.questionIndex === 3 && a.answer.trim() !== ""
    );
    console.log("Related Answers:", relatedAnswers);

    // Count the occurrences of each non-empty answer
    const answerCounts = relatedAnswers.reduce((acc, answer) => {
      const answerText = answer.answer.trim();
      if (answerText) {
        acc[answerText] = (acc[answerText] || 0) + 1;
      }
      return acc;
    }, {});
    console.log("Answer Counts:", answerCounts);

    // Prepare the data for the chart
    const labels = Object.keys(answerCounts);
    const data = Object.values(answerCounts);

    return {
      labels,
      datasets: [
        {
          label: question ? question.question : "Answers",
          data: data,
          backgroundColor: "rgba(54, 162, 235, 0.5)",
          borderColor: "rgb(54, 162, 235)",
          borderWidth: 1,
        },
      ],
    };
  }, [questionData, answerData, question]); // Include question as a dependency

  // const chartOptions = {
  //   responsive: true,
  //   plugins: {
  //     legend: {
  //       display: false,
  //     },
  //     title: {
  //       display: true,
  //       text: question ? question.question : "Chart",
  //     },
  //   },
  //   scales: {
  //     y: {
  //       beginAtZero: true,
  //     },
  //   },
  // };

  // const chartOptions = {
  //   responsive: true,
  //   plugins: {
  //     legend: {
  //       display: false,
  //     },
  //     title: {
  //       display: true,
  //       text: question ? question.question : "Chart",
  //     },
  //     tooltip: {
  //       callbacks: {
  //         label: (context) => {
  //           const label = context.label || "";
  //           const value = context.parsed.y || 0;
  //           return `${label}: ${value}`;
  //         },
  //       },
  //     },
  //   },
  //   scales: {
  //     x: {
  //       ticks: {
  //         callback: (value, index, values) => {
  //           const label = chartData.labels[index];
  //           return label.split(" ");
  //         },
          
  //         autoSkip: false,
  //         maxRotation: 0,
  //         minRotation: 0,
  //       },
  //     },
  //     y: {
  //       beginAtZero: true,
  //       ticks: {
  //         precision: 0,
  //       },
  //     },
  //   },

    
  //   layout: {
  //     padding: {
  //       top: 20,
  //       bottom: 150, // Increase the bottom padding to make room for labels
  //     },
  //   },
  // };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: true,
        text: question ? question.question : "Chart",
      },
      tooltip: {
        callbacks: {
          label: (context) => {
            const label = context.label || "";
            const value = context.parsed.y || 0;
            return `${label}: ${value}`;
          },
        },
      },
    },
    scales: {
      x: {
        ticks: {
          callback: (value, index, values) => {
            const label = chartData.labels[index];
            return label.split(" ");
          },
          
          autoSkip: false,
          maxRotation: 0,
          minRotation: 0,
        },
      },
      y: {
        beginAtZero: true,
        ticks: {
          precision: 0,
        },
      },
    },
    layout: {
      padding: {
        top: 20,
        bottom: 150, // Increase the bottom padding to make room for labels
      },
    },
  };


  return (
    <div style={{ height: "1000px" }}>
      <Bar data={chartData} options={chartOptions} />;
    </div>
  );
};

export default VerticalBarChart;
