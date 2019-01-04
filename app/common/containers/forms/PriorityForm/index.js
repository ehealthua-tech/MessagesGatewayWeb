import React from "react";
import withStyles from "withStyles";
import styles from "./styles.scss";
import { SortableContainer } from "react-sortable-hoc";
import SortableItem from "../../../components/SortableElement";
import Button from "components/Button";
import { Field, reduxForm } from "redux-form";
import { compose } from "redux";
import { connect } from "react-redux";
import { getOperatorsFormFields } from "../../../reducers";
import FieldCheckbox from "../../../components/reduxForm/FieldCheckbox";

const SortableList = SortableContainer(
  ({ items, initialValues, submitting, handleSubmit, openPopup, onSubmit }) => {
    return (
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          {items.map((value, index) => (
            <SortableItem
              key={index}
              index={index}
              value={value}
              sortIndex={index}
            />
          ))}
          <Field
            name="automatic_prioritization"
            labelText="Автоматична пріоритизація"
            component={FieldCheckbox}
          />
        </div>
        <div className={styles.buttons_block}>
          <Button type="submit" disabled={submitting}>
            {submitting ? "Збереження..." : "Зберегти"}
          </Button>
          <Button to={"operators-types/create/"}>Додати тип оператора</Button>
        </div>
      </form>
    );
  }
);

export default compose(
  connect(state => {
    return {
      initialValues: getOperatorsFormFields(state)
    };
  }),
  reduxForm({
    form: "priorityForm",
    enableReinitialize: true
  }),
  withStyles(styles)
)(SortableList);
