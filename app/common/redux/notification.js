import { combineActions, createAction, handleAction } from "redux-actions";

export const showNotification = createAction("toast/SHOW_NOTIFICATION");
export const hideNotification = createAction("toast/HIDE_NOTIFICATION");

export default handleAction(
  combineActions(
    showNotification,
    hideNotification
  ),
  (state, action) => ({
    ...state,
    ...action.payload
  }),
  {}
);