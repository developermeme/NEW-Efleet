import React from "react";
import useRiders from "../../useRiders";
import BarChart from "./BarChart/BarChart";
import { month } from "./BarChart/Constant";
import "./Style.scss";

export const ChartView = () => {
  const { earningDetails } = useRiders();

  const chartData = month.map((x: string) => {
    return {
      week: x,
      Total: (earningDetails && earningDetails[x]) || 0,
    };
  });

  return (
    <div className="chart-wrapper">
      <div className="card">
        <div className="card-title">Riders Earnings</div>
        <div className="card-body">
          <div className="chart-container">
            {earningDetails && <BarChart chartData={chartData} />}
          </div>
        </div>
      </div>
    </div>
  );
};
