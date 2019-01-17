import * as OperatorsAPI from "../../../redux/operators";
import * as Notifications from "../../../redux/notification";
import { push } from "react-router-redux";

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
        : dispatch(push({ pathname: `/operators/` }));
    }
  );
};
