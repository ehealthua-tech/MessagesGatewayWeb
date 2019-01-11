import * as OperatorsTypesAPI from "../../../redux/operators-types";
import * as Notifications from "../../../redux/notification";

export const addOperatorType = (values, router) => dispatch =>
  dispatch(OperatorsTypesAPI.addOperatorTypeDetail(values)).then(action => {
    action.error
      ? dispatch(
          Notifications.showNotification({
            showing: true,
            message: action.payload.message,
            type: "warning"
          })
        )
      : router.push({ pathname: `/operators-types/` });
  });
