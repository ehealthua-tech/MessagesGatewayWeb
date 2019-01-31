import React from 'react';
import withStyles from 'withStyles';
import { reduxForm, Field } from 'redux-form';
import FieldInput from '../../../components/reduxForm/FieldInput';
import Button from '../../../components/Button';
import styles from './styles.scss';
import requiredValidate from '../../../helpers/validators/required-validate';

@withStyles(styles)
@reduxForm({
  form: 'operator-type-create-form',
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
            validate={requiredValidate}
          />
          <Field
            name="priority"
            labelText="priority"
            component={FieldInput}
            validate={requiredValidate}
          />
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
