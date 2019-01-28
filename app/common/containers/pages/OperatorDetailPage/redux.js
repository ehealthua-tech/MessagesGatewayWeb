import { combineReducers } from "redux";
import { createAction, handleAction } from "redux-actions";
import * as OperatorsAPI from "../../../redux/operators";
import * as Notifications from "../../../redux/notification";
import { push } from "react-router-redux";

export const showOperatorDetails = createAction(
  "operatorsPage/SHOW_OPERATOR_DETAILS"
);

/**
 * Receives operator configuration from server
 * @returns {function}
 */

export const fetchOperator = id => dispatch =>
  dispatch(OperatorsAPI.fetchOperatorDetail(id)).then(action => {
    return action.error
      ? dispatch(push({ pathname: `/operators/` }))
      : dispatch(showOperatorDetails(action.payload));
  });

/**
 * Updating operator configuration ,and sending that to server
 * @param {Object} values
 * @returns {function}
 */

export const updateOperator = values => dispatch =>
  dispatch(OperatorsAPI.updateOperatorDetail(values)).then(action => {
    action.error
      ? dispatch(
          Notifications.showNotification({
            showing: true,
            message: action.payload.message,
            type: "warning"
          })
        )
      : dispatch(
          Notifications.showNotification({
            showing: true,
            message: action.payload.status,
            type: "success"
          })
        );
  });

const operatorDetails = handleAction(
  showOperatorDetails,
  (state, action) => action.payload,
  {}
);

export default combineReducers({
  operatorDetails
});
