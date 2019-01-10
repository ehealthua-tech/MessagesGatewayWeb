import * as OperatorsTypesAPI from "../../../redux/operators-types";
import * as Notifications from "../../../redux/notification";

export const addOperatorType = values => dispatch =>
  dispatch(OperatorsTypesAPI.addOperatorTypeDetail(values)).then(action => {
    if (action.error) throw action;
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
