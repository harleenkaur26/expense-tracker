import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { deleteExpense } from "store/slices/expenseSlice";
// Styles
import styles from "./expenseItem.module.css";
import { MdDelete } from "react-icons/md";
// Contstants
import { categories } from "constants/categories";

export function ExpenseItem({ expense }) {
  const dispatch = useDispatch();
  const [isHidden, setIsHidden] = useState(true);

  const deleteExpenseHandler = (expense) => {
    if (window.confirm("Are you sure you want to delete epxense?")) {
      dispatch(deleteExpense({ id: expense.id, date: expense.date }));
    }
  };

  return (
    <li className={styles.item}>
      <div
        className={styles.title}
        style={{ borderColor: expense.categoryColor }}
      >
        <div
          className={styles.text}
          onClick={() => setIsHidden((prev) => !prev)}
        >
          <span>{expense.title}</span>
          <span>
            {expense.amount}
            &nbsp;
            {process.env.REACT_APP_CURRENCY}
          </span>
        </div>
        <div
          className={`${styles.delete} ${
            isHidden ? styles.hidden : styles.show
          }`}
          onClick={() => deleteExpenseHandler(expense)}
        >
          <MdDelete />
        </div>
      </div>
      <div className={`${styles.info} ${isHidden ? styles.hidden : ""}`}>
        <p className={styles.date}>Date: {expense.date}</p>
        <p className={styles.category}>Category: {expense.category}</p>
        <p className={styles.description}>{expense.description}</p>
      </div>
    </li>
  );
}
