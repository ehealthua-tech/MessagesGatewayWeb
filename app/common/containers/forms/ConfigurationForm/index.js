import React from "react";
import { connect } from "react-redux";
import withStyles from "withStyles";
import { reduxForm, Field, getFormValues } from "redux-form";

import FieldInput from "../../../components/reduxForm/FieldInput";
import Button from "components/Button";

import ShowWithScope from "../../../containers/blocks/ShowWithScope";

import { reduxFormValidate } from "react-nebo15-validate";

import styles from "./styles.scss";

@withStyles(styles)
@reduxForm({
  form: "system-configuration-form",
  validate: reduxFormValidate({
    config_item_one: {
      required: true
    },
    config_item_two: {
      required: true
    }
  })
})
@connect(state => ({
  values: getFormValues("system-configuration-form")(state)
}))
export default class ApiForm extends React.Component {
  get isChanged() {
    const { values = {}, initialValues = {} } = this.props;
    return JSON.stringify(values) !== JSON.stringify(initialValues);
  }

  render() {
    const { handleSubmit, initialValues, onSubmit, submitting } = this.props;
    return (
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.form}>
          <div>
            <Field
              name="config_item_one"
              labelText={initialValues.configuration.auth}
              placeholder={initialValues.configuration.auth}
              component={FieldInput}
            />
          </div>
          <div>
            <Field
              name="config_item_two"
              labelText=""
              component={FieldInput}
            />
          </div>

          <div>
            <Button type="submit" disabled={!this.isChanged || submitting}>
              {submitting ? "Збереження..." : "Зберегти конфігурацію"}
            </Button>
          </div>
        </div>
      </form>
    );
  }
}