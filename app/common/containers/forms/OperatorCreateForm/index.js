import React from "react";
import withStyles from "withStyles";
import { reduxForm, Field, FormSection } from "redux-form";
import FieldInput from "../../../components/reduxForm/FieldInput";
import FieldCheckbox from "../../../components/reduxForm/FieldCheckbox";
import Button from "../../../components/Button";
import styles from "./styles.scss";
import isNumber from "../../../helpers/validators/number";

@withStyles(styles)
@reduxForm({
  form: "operator-create-form"
})
export default class OperatorCreateForm extends React.Component {
  render() {
    const {
      fields,
      initialValues,
      router,
      handleSubmit,
      onSubmit,
      submitting
    } = this.props;
    return (
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <Field
            name="active"
            labelText="active"
            value={initialValues.active}
            component={FieldCheckbox}
          />
          <Field
            name="limit"
            labelText="limit"
            value={initialValues.limit}
            parse={isNumber}
            component={FieldInput}
          />
          <Field name="name" labelText="name" component={FieldInput} />
          <Field
            name="operator_type_id"
            labelText="operator_type_id"
            component={FieldInput}
          />
          <Field
            name="price"
            labelText="price"
            parse={isNumber}
            component={FieldInput}
          />
          <Field name="priority" labelText="priority" component={FieldInput} />
        </div>
        <div>
          <FormSection name="config">
            {fields
              ? fields.map((field, index) => {
                  return (
                    <Field
                      name={field}
                      key={index}
                      labelText={field}
                      component={FieldInput}
                    />
                  );
                })
              : router.push({
                  pathname: `/operators/`
                })}
          </FormSection>
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
