import React from "react";
// Styles
import styles from "./title.module.css";
// React Icons
import { BiShow, BiHide } from "react-icons/bi";

export function Title({ title, hidden = true, onClick }) {
  return (
    <div className={styles.title} onClick={onClick}>
      <h3>{title}</h3>
      {onClick ? (
        <button title='Show/Hide'>{hidden ? <BiShow /> : <BiHide />}</button>
      ) : undefined}
    </div>
  );
}
