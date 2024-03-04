import React, { useState } from "react";
import { Title } from "../ui/title";
import styles from "./container.module.css";
import { useSelector } from "react-redux";

function Container({ title, hidePrint = true, children, className }) {
  const [isHidden, setIsHidden] = useState(false);

  return (
    <>
      <div className={`${className} ${styles.container}`}>
        <Title
          title={title}
          hidden={isHidden}
          onClick={() => {
            setIsHidden((prev) => !prev);
          }}
        />
        <div className={styles.content}>{!isHidden && children}</div>
      </div>
    </>
  );
}

export { Container };
