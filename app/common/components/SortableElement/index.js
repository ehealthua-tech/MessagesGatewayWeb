import React from "react";
import { SortableElement } from "react-sortable-hoc";
import Handle from "../SortableHandle";
import { Field } from "redux-form";
import FieldCheckbox from "../reduxForm/FieldCheckbox";
import withStyles from "nebo15-isomorphic-style-loader/lib/withStyles";
import styles from "./styles.scss";


const SortableItem = SortableElement(({ value, handleChange, sortIndex }) =>
  <div className={styles.item}>
    <Handle title="Handle"/>
    <div className={styles.text}>
      <span>Активніть типу оператора</span>
      <Field
        name={value.name}
        labelText={value.name}
        component={FieldCheckbox}
      />
    </div>
    <div className={styles.text}>
      <span>Пріорітет</span>
      {sortIndex + 1}
    </div>
  </div>
);

export default withStyles(styles)(SortableItem);

