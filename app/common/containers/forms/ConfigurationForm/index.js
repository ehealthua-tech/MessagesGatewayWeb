import React from 'react';
import { connect } from 'react-redux';
import withStyles from 'withStyles';
import { reduxForm, Field, getFormValues } from 'redux-form';
import Button from 'components/Button';
import FieldInput from '../../../components/reduxForm/FieldInput';
import styles from './styles.scss';
import requiredValidate from '../../../helpers/validators/required-validate';

@withStyles(styles)
@reduxForm({
  form: 'system-configuration-form',
})
@connect(state => ({
  values: getFormValues('system-configuration-form')(state),
}))
export default class ConfigurationForm extends React.Component {
  render() {
    const { handleSubmit, initialValues, onSubmit, pristine, submitting } = this.props;
    return (
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          {Object.entries(initialValues).map(([key], index) => (
            <Field
              name={key}
              key={index}
              labelText={key}
              component={FieldInput}
              validate={requiredValidate}
            />
          ))}
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
