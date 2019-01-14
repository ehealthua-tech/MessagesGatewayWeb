import { combineReducers } from "redux";
import { handleAction, createAction } from "redux-actions";
import * as fromConfiguration from "../../../redux/configuration";
import * as Notifications from "../../../redux/notification";

export const showConfiguration = createAction(
  "systemConfigurationListPage/SHOW_CONFIGURATION"
);

export const fetchConfiguration = () => dispatch =>
  dispatch(fromConfiguration.fetchConfiguration()).then(action => {
    if (action.error) throw action;
    return dispatch(showConfiguration(action.payload));
  });

export const updateConfiguration = ({ values }) => dispatch =>
  dispatch(fromConfiguration.updateConfigurationDetail(values)).then(action => {
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
    dispatch(fromConfiguration.fetchConfiguration()).then(action => {
      if (action.error) throw action;
      return dispatch(showConfiguration(action.payload));
    });
  });

const configuration = handleAction(
  showConfiguration,
  (state, action) => action.payload,
  []
);

export default combineReducers({
  configuration
});
