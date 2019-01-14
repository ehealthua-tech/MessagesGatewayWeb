import React from "react";
import { connect } from "react-redux";
import withStyles from "withStyles";
import { reduxForm, Field, getFormValues, FormSection } from "redux-form";
import FieldInput from "../../../components/reduxForm/FieldInput";
import Button from "components/Button";
import styles from "./styles.scss";
import requiredValidate from "../../../helpers/validators/required-validate";
import isRequired from "../../../helpers/validators/required";

@withStyles(styles)
@reduxForm({
  form: "system-configuration-form"
})
@connect(state => ({
  values: getFormValues("system-configuration-form")(state)
}))
export default class ConfigurationForm extends React.Component {
  get isChanged() {
    const { values = {}, initialValues = {} } = this.props;
    return JSON.stringify(values) !== JSON.stringify(initialValues);
  }

  render() {
    const { handleSubmit, initialValues, onSubmit, submitting } = this.props;
    return (
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          {Object.entries(initialValues).map(([key], index) => {
            return (
              <Field
                name={key}
                key={index}
                labelText={key}
                component={FieldInput}
                validate={requiredValidate}
              />
            );
          })}
        </div>
        <div>
          <Button type="submit">
            {submitting ? "Збереження..." : "Зберегти"}
          </Button>
        </div>
      </form>
    );
  }
}
