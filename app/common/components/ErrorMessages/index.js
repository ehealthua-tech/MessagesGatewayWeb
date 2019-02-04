import React from 'react';
import { addValidation, ErrorMessages, ErrorMessage } from 'react-nebo15-validate';

export default class ErrorMessagesTranslated extends React.Component {
  render() {
    const { children, ...rest } = this.props;
    return (
      <ErrorMessages {...rest}>
        {children}
        <ErrorMessage when="required">Обов&#700;язкове поле</ErrorMessage>
      </ErrorMessages>
    );
  }
}
