import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

// Styles
import styles from "./tracker.module.css";

// Components
import { ExpenseAmount } from "components/expenseTracker/amount";
import { ExpenseBody } from "components/expenseTracker/body";
import { ExpenseNavbar } from "components/expenseTracker/navbar";
import { DatePicker } from "components/expenseTracker/ui/datePicker";
import { useAuth } from "hooks/useAuth";

export function Tracker() {
  const {
    authState: { user },
    checkRedirect,
  } = useAuth("/login");

  return (
    <div className={styles.container}>
      <div>
        <ExpenseNavbar />
        <DatePicker />
        <ExpenseAmount />
      </div>
      <ExpenseBody />
    </div>
  );
}
