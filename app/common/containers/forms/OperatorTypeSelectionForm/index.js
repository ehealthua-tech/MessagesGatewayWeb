import React from "react";
import withStyles from "withStyles";
import { reduxForm, Field } from "redux-form";
import Button from "../../../components/Button";
import styles from "./styles.scss";
import { reduxFormValidate } from "react-nebo15-validate";
import { SelectUniversal } from "../../../components/SelectUniversal";

@withStyles(styles)
@reduxForm({
  form: "operator-type-selection-form",
  validate: reduxFormValidate({
    operator_type: {
      required: true
    },
    protocol: {
      required: true
    }
  })
})
export default class OperatorTypeSelectionForm extends React.Component {
  render() {
    const {
      operatorsTypes,
      protocols,
      handleSubmit,
      onSubmit,
      pristine,
      submitting
    } = this.props;

    return (
      <form onSubmit={handleSubmit(onSubmit)}>
        <Field
          name="operator_type"
          placeholder="Виберіть тип оператора"
          component={SelectUniversal}
          options={operatorsTypes.map(operatorType => {
            const { name, id } = operatorType;
            return {
              name,
              title: name,
              id
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
          <Button type="submit" disabled={pristine || submitting}>
            {submitting ? "Додавання..." : "Додати"}
          </Button>
        </div>
      </form>
    );
  }
}
