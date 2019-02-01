import React from 'react';
import withStyles from 'withStyles';
import { reduxForm, Field, FormSection } from 'redux-form';
import FieldInput from '../../../components/reduxForm/FieldInput';
import Button from '../../../components/Button';
import styles from './styles.scss';
import FieldCheckbox from '../../../components/reduxForm/FieldCheckbox';
import isNumber from '../../../helpers/validators/number';
import requiredValidate from '../../../helpers/validators/required-validate';
import numberValidate from '../../../helpers/validators/number-validate';

@withStyles(styles)
@reduxForm({
  form: 'operator-detail-form',
})
export default class OperatorDetailForm extends React.Component {
  render() {
    const { initialValues, handleSubmit, onSubmit, pristine, submitting } = this.props;

    return (
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          {Object.entries(initialValues)
            .filter(
              ([key]) =>
                key !== 'id' &&
                key !== 'last_update' &&
                key !== 'operator_type_id' &&
                key !== 'priority' &&
                key !== 'config'
            )
            .map(([key, value], index) => {
              switch (typeof value) {
                case 'boolean':
                  return <Field name={key} key={index} labelText={key} component={FieldCheckbox} />;
                case 'number':
                  return (
                    <Field
                      name={key}
                      key={index}
                      labelText={key}
                      parse={isNumber}
                      component={FieldInput}
                      validate={[requiredValidate, numberValidate]}
                    />
                  );
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
          <FormSection name="config">
            {Object.entries(initialValues.config).map(([key, value], index) => {
              switch (typeof value) {
                case 'boolean':
                  return <Field name={key} key={index} labelText={key} component={FieldCheckbox} />;
                case 'number':
                  return (
                    <Field
                      name={key}
                      key={index}
                      labelText={key}
                      parse={isNumber}
                      component={FieldInput}
                      validate={[requiredValidate, numberValidate]}
                    />
                  );
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
        <div>
          <Button type="submit" disabled={pristine || submitting}>
            {submitting ? 'Збереження...' : 'Зберегти'}
          </Button>
        </div>
      </form>
    );
  }
}
