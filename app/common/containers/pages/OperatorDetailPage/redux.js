import { combineReducers } from "redux";
import { combineActions, createAction, handleAction } from "redux-actions";
import * as OperatorsAPI from "../../../redux/operators";
import * as Notifications from "../../../redux/notification";

export const showOperatorDetails = createAction(
  "operatorsPage/SHOW_OPERATOR_DETAILS"
);

export const fetchOperator = id => dispatch =>
  dispatch(OperatorsAPI.fetchOperatorDetail(id)).then(action => {
    if (action.error) throw action;

    return dispatch(showOperatorDetails(action.payload));
  });

export const updateOperator = ({ values }) => dispatch =>
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
  combineActions(showOperatorDetails),
  (state, action) => action.payload,
  {}
);

export default combineReducers({
  operatorDetails
});
