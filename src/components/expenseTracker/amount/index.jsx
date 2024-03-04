import React from "react";
// Libs
import { useSelector } from "react-redux";
import { Spinner } from "../ui/spinner";
// Styles
import styles from "./amount.module.css";

export function ExpenseAmount({}) {
  const { amount, fetching } = useSelector((state) => state.expenses);

  const formatAmount = amount.toFixed(2);
  return (
    <div className={styles.container}>
      <h3 className={styles.title}>Amount Spent: ₹ </h3>
      {!fetching && (
        <h2 className={styles.amount}>
          {formatAmount} &nbsp;
          {process.env.REACT_APP_CURRENCY}
        </h2>
      )}
      {fetching && <Spinner className={styles.spinner} />}
    </div>
  );
}
