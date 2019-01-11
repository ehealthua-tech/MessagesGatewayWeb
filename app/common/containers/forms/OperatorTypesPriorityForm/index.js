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
  ({
    items,
    onDeleteType,
    initialValues,
    submitting,
    handleSubmit,
    openPopup,
    pristine,
    onSubmit
  }) => {
    return (
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          {items.length ? (
            items.map((value, index) => (
              <SortableItem
                key={index}
                index={index}
                value={value}
                sortIndex={index}
                onDeleteType={onDeleteType}
              />
            ))
          ) : (
            <div className={styles.not_found}>
              <h2>Нажаль, жодного типу оператора не додано</h2>
            </div>
          )}
          <Field
            name="automatic_prioritization"
            labelText="Автоматична пріоритизація"
            component={FieldCheckbox}
          />
        </div>
        <div className={styles.buttons_block}>
          <Button type="submit" disabled={pristine || submitting}>
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
    form: "operator-type-form",
    enableReinitialize: true
  }),
  withStyles(styles)
)(SortableList);
