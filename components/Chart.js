import React from "react";
import { Doughnut } from "react-chartjs-2";

export default function Chart({ results }) {
  const data = {
    labels: [
      "Neutral",
      "Weakly positive",
      "Positive",
      "Strongly positive",
      "Weakly negative",
      "Negative",
      "Strongly negative",
    ],
    datasets: [
      {
        label: "# of Votes",
        data: [
          results.neutral,
          results.weakly_positive,
          results.positive,
          results.strongly_positive,
          results.weakly_negative,
          results.negative,
          results.strongly_negative,
        ],
        backgroundColor: [
          "#abb2bf",
          "#90ee90",
          "#32cd32",
          "#228b22",
          "#ffb6c1",
          "#f08080",
          "#cd5c5c",
        ],
        borderColor: ["#edf2f7"],
        borderWidth: 2,
      },
    ],
  };

  return (
    <Doughnut
      data={data}
      options={{
        legend: { display: false },
      }}
    />
  );
}
