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
  form: "operator-create-form",
  validate: reduxFormValidate({
    form: {
      required: true
    },
    limit: {
      required: true
    },
    name: {
      required: true
    },
    price: {
      required: true
    },
    priority: {
      required: true
    },
    config: {
      required: true
    }
  })
})
export default class OperatorCreateForm extends React.Component {
  render() {
    const { fields, handleSubmit, onSubmit, pristine, submitting } = this.props;

    return (
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <Field name="active" labelText="active" component={FieldCheckbox} />
          <Field
            name="limit"
            labelText="limit"
            parse={isNumber}
            component={FieldInput}
          />
          <Field name="name" labelText="name" component={FieldInput} />
          <Field
            name="price"
            labelText="price"
            parse={isNumber}
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
          <FormSection name="config">
            {fields.map((field, index) => {
              return (
                <Field
                  name={field}
                  key={index}
                  labelText={field}
                  component={FieldInput}
                />
              );
            })}
          </FormSection>
        </div>

        <Button type="submit" disabled={pristine || submitting}>
          {submitting ? "Збереження..." : "Зберегти"}
        </Button>
      </form>
    );
  }
}
