import React, { useState, useEffect } from "react";
import { PieChart } from "react-minimal-pie-chart";
import { useSelector } from "react-redux";
import { groupByAndSum } from "util/helpers";
import { useMemo } from "react";
import { PiLegend, MemoizedLegend } from "./PiLegend";
// Component
import { Container } from "components/expenseTracker/Container";
// Styles
import styles from "./expenseChart.module.css";
import { Spinner } from "../ui/spinner";

export function ExpensePieChart({ className }) {
  const [isHidden, setIsHidden] = useState(false);
  const { expenseList, fetching } = useSelector((state) => state.expenses);
  const { printMode } = useSelector((state) => state.ui);

  //OPTIMIZE
  const grouped = useMemo(() => {
    if (expenseList.length > 0)
      return groupByAndSum(expenseList, "category").sort(
        (a, b) => b.value - a.value
      );
    return [];
  }, [expenseList]);

  useEffect(() => {
    if (printMode) {
      setIsHidden(false);
    }
  }, [printMode]);

  return (
    <Container className={className} title='Expense Chart'>
      {!fetching && (
        <div className={`${styles.chart} ${isHidden ? styles.hidden : ""}`}>
          <PieChart
            className={styles.pychart}
            label={({ dataEntry }) => `${Math.round(dataEntry.percentage)}% `}
            labelStyle={{
              fontSize: "0.5rem",
            }}
            lineWidth={60}
            labelPosition={112}
            data={grouped}
            text='aleksa'
          />
          <MemoizedLegend data={grouped} />
        </div>
      )}
      {fetching && <Spinner />}
    </Container>
  );
}
