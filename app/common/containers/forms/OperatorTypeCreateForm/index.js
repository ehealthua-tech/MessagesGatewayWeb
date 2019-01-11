import React from "react";
import withStyles from "withStyles";
import { reduxForm, Field, FormSection } from "redux-form";
import FieldInput from "../../../components/reduxForm/FieldInput";
import FieldCheckbox from "../../../components/reduxForm/FieldCheckbox";
import Button from "../../../components/Button";
import styles from "./styles.scss";
import isNumber from "../../../helpers/validators/number";
import { reduxFormValidate } from "react-nebo15-validate";

@withStyles(styles)
@reduxForm({
  form: "operator-type-create-form",
  validate: reduxFormValidate({
    form: {
      required: true
    },
    operator_type_name: {
      required: true
    },
    priority: {
      required: true
    }
  })
})
export default class OperatorTypeCreateForm extends React.Component {
  render() {
    const { handleSubmit, onSubmit, pristine, submitting } = this.props;
    return (
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <Field
            name="operator_type_name"
            labelText="operator_type_name"
            component={FieldInput}
          />
          <Field
            name="priority"
            labelText="priority"
            parse={isNumber}
            component={FieldInput}
          />
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
