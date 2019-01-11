import React from "react";
import withStyles from "withStyles";
import { reduxForm, Field, FormSection } from "redux-form";
import FieldInput from "../../../components/reduxForm/FieldInput";
import Button from "../../../components/Button";
import styles from "./styles.scss";
import FieldCheckbox from "../../../components/reduxForm/FieldCheckbox";
import isNumber from "../../../helpers/validators/number";
import { reduxFormValidate, collectionOf } from "react-nebo15-validate";

@withStyles(styles)
@reduxForm({
  form: "operator-detail-form"
})
export default class OperatorDetailForm extends React.Component {
  render() {
    const {
      initialValues,
      handleSubmit,
      onSubmit,
      pristine,
      submitting
    } = this.props;

    return (
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          {Object.entries(initialValues).map(([key, value], index) => {
            if (typeof value === "boolean") {
              return (
                <Field
                  name={key}
                  key={index}
                  labelText={key}
                  component={FieldCheckbox}
                />
              );
            }
            if (typeof value === "number") {
              return (
                <Field
                  name={key}
                  key={index}
                  labelText={key}
                  parse={isNumber}
                  component={FieldInput}
                />
              );
            }
            if (key === "config") {
              return null;
            }
            return (
              <Field
                name={key}
                key={index}
                labelText={key}
                component={FieldInput}
              />
            );
          })}
          <FormSection name="config">
            {Object.entries(initialValues.config).map(([key, value], index) => {
              if (typeof value === "boolean") {
                return (
                  <Field
                    name={key}
                    key={index}
                    labelText={key}
                    component={FieldCheckbox}
                  />
                );
              }
              if (typeof value === "number") {
                return (
                  <Field
                    name={key}
                    key={index}
                    labelText={key}
                    parse={isNumber}
                    component={FieldInput}
                  />
                );
              }
              return (
                <Field
                  name={key}
                  key={index}
                  labelText={key}
                  component={FieldInput}
                />
              );
            })}
          </FormSection>
        </div>
        <div>
          <Button type="submit" disabled={pristine || submitting}>
            {submitting ? "Збереження..." : "Зберегти"}
          </Button>
        </div>
      </form>
    );
  }
}
