import React from "react";
// Styles
import styles from "./pagination.module.css";
import { IoMdArrowDropleft, IoMdArrowDropright } from "react-icons/io";

export function Pagination({ currentPage = 1, numberOfPages, changePage }) {
  //   const numberOfPages = Math.ceil(length / perPage);
  const handlePageChange = (type) => {
    if (type === "+") {
      if (currentPage + 1 <= numberOfPages) changePage((prev) => prev + 1);
    } else if (type === "-") {
      if (currentPage - 1 > 0) changePage((prev) => prev - 1);
    }
  };

  return (
    <div className={styles.container}>
      <IoMdArrowDropleft
        className={styles.button}
        onClick={() => handlePageChange("-")}
      />
      {currentPage}&nbsp;/&nbsp;{numberOfPages}
      <IoMdArrowDropright
        className={styles.button}
        onClick={() => handlePageChange("+")}
      />
    </div>
  );
}
