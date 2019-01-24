import { combineReducers } from "redux";
import { combineActions, createAction, handleAction } from "redux-actions";
import * as OperatorsAPI from "../../../redux/operators";
import * as ProtocolsAPI from "../../../redux/protocols";
import * as OperatorsTypesAPI from "../../../redux/operators-types";
import * as Notifications from "../../../redux/notification";
import { sortOperatorsTypesById } from "../OperatorsTypesListPage/redux";
import { push } from "react-router-redux";

export const showOperators = createAction("operatorsPage/SHOW_OPERATORS");

export const showOperatorsTypes = createAction(
  "operatorsTypesPage/SHOW_OPERATORS_TYPES"
);

export const changeOperators = createAction("operatorsPage/CHANGE_OPERATORS");

export const showProtocols = createAction("operatorsPage/SHOW_PROTOCOLS");

/**
 * Receives operators from server
 * @returns {function}
 */

export const fetchOperators = () => dispatch =>
  dispatch(OperatorsAPI.fetchOperators()).then(action => {
    if (action.error) throw action;

    return dispatch(showOperators(action.payload));
  });

/**
 * Receives operators types from server
 * @returns {function}
 */

export const fetchOperatorsTypes = () => dispatch =>
  dispatch(OperatorsTypesAPI.fetchOperatorsTypes()).then(action => {
    if (action.error) throw action;
    const sortedOperatorsTypes = action.payload.sort(sortOperatorsTypesById);

    return dispatch(showOperatorsTypes(sortedOperatorsTypes));
  });

/**
 * Receives operators fields from server
 * @param {Object} values
 * @returns {function}
 */

export const fetchOperatorFields = values => dispatch => {
  const { id } = values.operator_type || null;
  const { name } = values.protocol || null;

  return dispatch(OperatorsAPI.fetchOperatorFieldsDetail(name)).then(action => {
    action.error
      ? dispatch(
          Notifications.showNotification({
            showing: true,
            message: action.payload.message,
            type: "warning"
          })
        )
      : dispatch(
          push({
            pathname: `/operators/create/${id}/`,
            state: {
              fields: action.payload.fields,
              name,
              id
            }
          })
        );
  });
};

/**
 * Deletes operator from server
 * @param {string} id
 * @returns {function}
 */

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

    /**
     * Receives operators from server
     * @returns {function}
     */

    dispatch(OperatorsAPI.fetchOperators()).then(action => {
      if (action.error) throw action;
      return dispatch(showOperators(action.payload));
    });
  });

/**
 * Receives protocols from server
 * @returns {function}
 */

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
  showProtocols,
  (state, action) => action.payload,
  []
);

export default combineReducers({
  operators,
  protocols
});
