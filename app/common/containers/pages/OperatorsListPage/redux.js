import { combineReducers } from "redux";
import { combineActions, createAction, handleAction } from "redux-actions";
import * as OperatorsAPI from "../../../redux/operators";
import * as ProtocolsAPI from "../../../redux/protocols";

export const showOperators = createAction("operatorsPage/SHOW_OPERATORS");

export const changeOperators = createAction("operatorsPage/CHANGE_OPERATORS");

export const showProtocols = createAction("operatorsPage/SHOW_PROTOCOLS");

export const fetchOperators = () => dispatch =>
  dispatch(OperatorsAPI.fetchOperators()).then(action => {
    if (action.error) throw action;

    return dispatch(showOperators(action.payload));
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
