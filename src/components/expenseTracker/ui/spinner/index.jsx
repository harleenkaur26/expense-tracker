import React from "react";
// Styles
import styles from "./spinner.module.css";

export function Spinner({ className = "" }) {
  return <div className={`${styles.loader} ${className}`} />;
}
