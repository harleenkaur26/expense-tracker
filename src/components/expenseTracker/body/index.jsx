import React from "react";
import { ExpensePieChart } from "../expensePieChart";
import { ExpenseLineChart } from "../expenseLineChart";
import { AddExpense } from "../expenseAdd";
import { ExpenseList } from "../expenseList";
// Styles
import styles from "./body.module.css";

export function ExpenseBody() {
  return (
    <div className={styles.layout}>
      <AddExpense />
      <ExpenseList />
      <ExpensePieChart />
      <ExpenseLineChart />
    </div>
  );
}
