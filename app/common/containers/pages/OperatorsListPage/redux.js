import { combineReducers } from "redux";
import { combineActions, createAction, handleAction } from "redux-actions";
import * as OperatorsAPI from "../../../redux/operators";


export const showOperators = createAction(
  "operatorsPage/SHOW_OPERATORS"
);

export const changeOperators = createAction(
  "operatorsPage/CHANGE_OPERATORS"
);

export const fetchOperators = () => dispatch =>
  dispatch(OperatorsAPI.fetchOperators()).then(action => {
    if (action.error) throw action;

    return dispatch(showOperators(action.payload));
  });


const operators = handleAction(
  combineActions(
    showOperators,
    changeOperators
  ),
  (state, action) => action.payload,
  []
);

export default combineReducers({
  operators
});

