import React from "react";
import { SortableElement } from "react-sortable-hoc";
import Handle from "../SortableHandle";
import { Field } from "redux-form";
import FieldCheckbox from "../reduxForm/FieldCheckbox";
import withStyles from "nebo15-isomorphic-style-loader/lib/withStyles";
import styles from "../Input/styles.scss";



const SortableItem = SortableElement(({ value,handleChange, sortIndex }) =>
  <li>
    <div>
      <Handle title="Handle"/>
    </div>
    <Field
      name={value.name}
      labelText={value.name}
      component={FieldCheckbox}
      onChange={e => handleChange(e)}
    />
    <div>{sortIndex + 1}</div>
  </li>
);

export default withStyles(styles)(SortableItem);

