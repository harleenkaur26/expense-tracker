import React from "react";
// Styles
import styles from "./expenseList.module.css";
import { BsListOl } from "react-icons/bs";

const pageCount = [5, 10, 20, 50];

export function PageNumberList({ perPage, onClick }) {
  return (
    <div className={styles.buttonList}>
      <BsListOl />
      {pageCount.map((number) => (
        <button
          key={number}
          className={`${styles.button} ${
            perPage === number ? styles.current : ""
          }`}
          onClick={() => onClick(number)}
        >
          {number}
        </button>
      ))}
    </div>
  );
}
