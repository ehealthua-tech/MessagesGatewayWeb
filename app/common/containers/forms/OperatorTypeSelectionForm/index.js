import React from "react";
import withStyles from "withStyles";
import { reduxForm, Field, FormSection } from "redux-form";
import FieldInput from "../../../components/reduxForm/FieldInput";
import Button from "../../../components/Button";
import styles from "./styles.scss";
import FieldCheckbox from "../../../components/reduxForm/FieldCheckbox";
import { SelectUniversal } from "../../../components/SelectUniversal";

@withStyles(styles)
@reduxForm({
  form: "operator-type-selection-form"
})
export default class OperatorTypeSelectionForm extends React.Component {
  render() {
    const {
      operators,
      protocols,
      handleSubmit,
      onSubmit,
      submitting
    } = this.props;

    return (
      <form onSubmit={handleSubmit(onSubmit)}>
        <Field
          name="operator_type"
          placeholder="Виберіть тип оператора"
          component={SelectUniversal}
          options={operators.map(operator => {
            return {
              name: operator.name,
              title: operator.name,
              id: operator.id
            };
          })}
        />
        <Field
          name="protocol"
          placeholder="Виберіть протокол"
          component={SelectUniversal}
          options={protocols.protocols.map(protocol => {
            return {
              name: protocol,
              title: protocol
            };
          })}
        />
        <div>
          <Button type="submit">
            {submitting ? "Збереження..." : "Зберегти"}
          </Button>
        </div>
      </form>
    );
  }
}
