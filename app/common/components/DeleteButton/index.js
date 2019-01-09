import React from "react";
import withStyles from "nebo15-isomorphic-style-loader/lib/withStyles";
import styles from "./styles.scss";

const DeleteButton = ({ onClick }) => (
  <div onClick={onClick} className={styles.delete_button}>
    <div />
    <div />
  </div>
);

export default withStyles(styles)(DeleteButton);
