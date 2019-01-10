import { combineReducers } from "redux";
import { combineActions, createAction, handleAction } from "redux-actions";
import * as OperatorsAPI from "../../../redux/operators";
import * as Notifications from "../../../redux/notification";

export const showOperatorDetails = createAction(
  "operatorsPage/SHOW_OPERATOR_DETAILS"
);

export const addOperator = ({ values, id, name }) => dispatch => {
  const newOperatorDetail = {
    ...values,
    operator_type_id: id,
    protocol_name: name
  };

  return dispatch(OperatorsAPI.addOperatorDetail(newOperatorDetail)).then(
    action => {
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
    }
  );
};

const operatorDetails = handleAction(
  combineActions(showOperatorDetails),
  (state, action) => action.payload,
  {}
);

export default combineReducers({
  operatorDetails
});
