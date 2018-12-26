import React from "react";
import { SortableHandle } from "react-sortable-hoc";
import withStyles from "nebo15-isomorphic-style-loader/lib/withStyles";
import styles from "./styles.scss";

const Handle = SortableHandle(({ title }) => (
  <div className={styles.handle} title={title}>
    <div/>
    <div/>
    <div/>
  </div>
));

export default withStyles(styles)(Handle);