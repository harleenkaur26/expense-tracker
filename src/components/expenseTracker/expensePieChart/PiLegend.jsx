import React from "react";
// Styles
import styles from "./expenseChart.module.css";

export function PiLegend({ data }) {
  const currency = process.env.REACT_APP_CURRENCY;
  return (
    <div className={styles.legends}>
      {data.map((category) => (
        <div className={styles.legend} key={category.title}>
          <span>
            <span
              className={styles.legendColor}
              style={{ backgroundColor: category.color }}
            />
            <span>{category.title}</span>
          </span>
          <span>
            {category.value} {currency}
          </span>
        </div>
      ))}
    </div>
  );
}

export const MemoizedLegend = React.memo(PiLegend);
