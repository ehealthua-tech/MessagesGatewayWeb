import { push } from 'react-router-redux';
import * as OperatorsTypesAPI from '../../../redux/operators-types';
import * as Notifications from '../../../redux/notification';

/**
 * Creates new operator type and sending that to server
 * @param {Object} values
 * @returns {function}
 */
export const addOperatorType = values => dispatch =>
  dispatch(OperatorsTypesAPI.addOperatorTypeDetail(values)).then((action) => {
    action.error
      ? dispatch(
          Notifications.showNotification({
            showing: true,
            message: action.payload.message,
            type: 'warning',
          })
        )
      : dispatch(push({ pathname: '/operators-types/' }));
  });
