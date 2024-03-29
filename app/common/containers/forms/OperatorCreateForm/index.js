import React from 'react';
import withStyles from 'withStyles';
import { reduxForm, Field, FormSection } from 'redux-form';
import FieldInput from '../../../components/reduxForm/FieldInput';
import FieldCheckbox from '../../../components/reduxForm/FieldCheckbox';
import Button from '../../../components/Button';
import styles from './styles.scss';
import isNumber from '../../../helpers/validators/number';
import requiredValidate from '../../../helpers/validators/required-validate';
import numberValidate from '../../../helpers/validators/number-validate';

@withStyles(styles)
@reduxForm({
  form: 'operator-create-form',
})
export default class OperatorCreateForm extends React.Component {
  render() {
    const { initialValues, handleSubmit, onSubmit, pristine, submitting } = this.props;

    return (
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <Field name="active" labelText="active" component={FieldCheckbox} />
          <Field
            name="limit"
            labelText="limit"
            parse={isNumber}
            component={FieldInput}
            validate={[requiredValidate, numberValidate]}
          />
          <Field name="name" labelText="name" component={FieldInput} validate={requiredValidate} />
          <Field
            name="price"
            labelText="price"
            parse={isNumber}
            component={FieldInput}
            validate={[requiredValidate, numberValidate]}
          />
        </div>
        <div>
          <FormSection name="config">
            {Object.entries(initialValues.config)
              .filter(([key]) => key !== 'method_name' && key !== 'module_name')
              .map(([key], index) => {
                switch (key) {
                  case 'code':
                    return <Field name={key} key={index} labelText={key} component={FieldInput} />;
                  case 'password':
                    return <Field name={key} key={index} labelText={key} component={FieldInput} />;
                  default:
                    return (
                      <Field
                        name={key}
                        key={index}
                        labelText={key}
                        component={FieldInput}
                        validate={requiredValidate}
                      />
                    );
                }
              })}
          </FormSection>
        </div>

        <Button type="submit" disabled={pristine || submitting}>
          {submitting ? 'Збереження...' : 'Зберегти'}
        </Button>
      </form>
    );
  }
}
