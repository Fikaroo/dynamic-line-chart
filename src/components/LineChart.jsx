import React, { useEffect, useState } from "react";
import {
  Chart as ChartJS,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  TimeScale,
} from "chart.js";
import "chartjs-adapter-date-fns";
import { Line } from "react-chartjs-2";
ChartJS.register(
  TimeScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const LineChart = () => {
  const [date, setDate] = useState("");
  const [value, setValue] = useState(0);

  const options = {
    responsive: true,
    scales: {
      x: {
        type: "time",
        time: {
          unit: "month",
        },
      },
      y: {
        min: 0,
        max: 100,
      },
    },
  };

  const labels = [
    "2023-01-01",
    "2023-02-01",
    "2023-03-01",
    "2023-04-01",
    "2023-05-01",
  ];

  const [skills, setSkills] = useState([]);

  const data = {
    labels: labels,
    datasets: [
      {
        label: "My Dataset",
        data: skills,
        fill: false,
        borderColor: "rgba(75,192,192,1)",
      },
    ],
  };

  const handleTime = (e) => setDate(e.target.value);
  const handleValue = (e) => setValue(Number(e.target.value));

  const handleSet = (e) => {
    if (skills.find(({ x }) => x === date)) {
      const newSkill = skills.map((skill) =>
        skill.x === date ? { x: date, y: value } : skill
      );
      return setSkills(
        newSkill.sort(
          (a, b) => new Date(...a.x.split("-")) - new Date(...b.x.split("-"))
        )
      );
    }
    return setSkills(
      [...skills, { x: date, y: value }].sort(
        (a, b) => new Date(...a.x.split("-")) - new Date(...b.x.split("-"))
      )
    );
  };
  return (
    <div>
      <Line data={data} options={options} />
      <div className="flex gap-4 justify-center">
        <input
          type="date"
          className="border px-4 py-1.5 rounded"
          onChange={handleTime}
        />
        <input
          type="value"
          className="border px-4 py-1.5 rounded"
          onChange={handleValue}
        />
        <button
          className="border px-4 py-1.5 rounded bg-slate-400"
          onClick={handleSet}
        >
          Set
        </button>
      </div>
    </div>
  );
};

export default LineChart;
