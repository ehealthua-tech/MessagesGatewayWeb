import { combineReducers } from "redux";
import { combineActions, createAction, handleAction } from "redux-actions";
import * as OperatorsAPI from "../../../redux/operators";
import * as ProtocolsAPI from "../../../redux/protocols";
import * as OperatorsTypesAPI from "../../../redux/operators-types";
import { sortOperatorsTypesById } from "../OperatorsTypesListPage/redux";
import * as Notifications from "../../../redux/notification";

export const showOperators = createAction("operatorsPage/SHOW_OPERATORS");

export const showOperatorsTypes = createAction(
  "operatorsTypesPage/SHOW_OPERATORS_TYPES"
);

export const changeOperators = createAction("operatorsPage/CHANGE_OPERATORS");

export const showProtocols = createAction("operatorsPage/SHOW_PROTOCOLS");

export const fetchOperators = () => dispatch =>
  dispatch(OperatorsAPI.fetchOperators()).then(action => {
    if (action.error) throw action;

    return dispatch(showOperators(action.payload));
  });

export const fetchOperatorsTypes = () => dispatch =>
  dispatch(OperatorsTypesAPI.fetchOperatorsTypes()).then(action => {
    if (action.error) throw action;
    const sortedOperatorsTypes = action.payload.sort(sortOperatorsTypesById);

    return dispatch(showOperatorsTypes(sortedOperatorsTypes));
  });

export const deleteOperator = id => dispatch =>
  dispatch(OperatorsAPI.deleteOperatorDetail(id)).then(action => {
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

    dispatch(OperatorsAPI.fetchOperators()).then(action => {
      if (action.error) throw action;
      return dispatch(showOperators(action.payload));
    });
  });

export const fetchProtocols = () => dispatch =>
  dispatch(ProtocolsAPI.fetchProtocols()).then(action => {
    if (action.error) throw action;

    return dispatch(showProtocols(action.payload));
  });

const operators = handleAction(
  combineActions(showOperators, changeOperators),
  (state, action) => action.payload,
  []
);

const protocols = handleAction(
  combineActions(showProtocols),
  (state, action) => action.payload,
  []
);

export default combineReducers({
  operators,
  protocols
});
