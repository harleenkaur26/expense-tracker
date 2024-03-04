import React, { useEffect, useState } from "react";
import { Container } from "components/expenseTracker/Container";
import { useSelector } from "react-redux";
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
import { Line } from "react-chartjs-2";
import styles from "./lineChart.module.css";
import { getDataByDate as getDataByDateFirebase } from "config/firebase";
import dayjs from "dayjs";
import { filterDatasetForLineChart } from "util/helpers";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);
const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top",
    },
    title: {
      text: "Expenses By Months",
      display: true,
    },
  },
};

export function ExpenseLineChart({ className }) {
  const { expenseList, fetching } = useSelector((state) => state.expenses);
  console.log("Expense list",expenseList)
  const [dataSets, setDatasets] = useState([]);

  const labels = Array.from({ length: dayjs().daysInMonth() }, (_, i) => i + 1);
  useEffect(() => {
    if (expenseList[0]) {
      const month = dayjs(expenseList[0].date).month();
      const year = dayjs(expenseList[0].date).year();
      getDataByDateFirebase(month, year).then((res) => {
        
        const prev = filterDatasetForLineChart(res.expenseList, labels);
        const current = filterDatasetForLineChart(expenseList, labels);
        setDatasets([prev, current]);
      });
    } else setDatasets([{}, {}]);
  }, [expenseList]);

  const data = {
    labels,
    datasets: dataSets,
  };

  return (
    <Container className={className} title='Expense Trends'>
      <Line options={options} data={data} />
    </Container>
  );
}
