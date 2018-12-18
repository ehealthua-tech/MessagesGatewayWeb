import React from "react";
import { SortableHandle } from "react-sortable-hoc";
import withStyles from "nebo15-isomorphic-style-loader/lib/withStyles";
import styles from "../Input/styles.scss";

const Handle = SortableHandle(({title}) => (
  <div className="handle" title={title}>Handle</div>
));

export default withStyles(styles)(Handle);