import { combineReducers } from 'redux';
import { arrayMove } from 'react-sortable-hoc';
import { combineActions, createAction, handleAction } from 'redux-actions';
import * as OperatorsTypesAPI from '../../../redux/operators-types';
import * as Notifications from '../../../redux/notification';

export const showOperatorsTypes = createAction('operatorsTypesPage/SHOW_OPERATORS_TYPES');

export const changeOperatorsTypes = createAction(
  'operatorsTypesPage/CHANGE_OPERATORS_TYPES_PRIORITY'
);

/**
 * Receives operators types from server
 * @returns {function}
 */

export const fetchOperatorsTypes = () => dispatch =>
  dispatch(OperatorsTypesAPI.fetchOperatorsTypes()).then((action) => {
    if (action.error) throw action;
    const sortedOperatorsTypes = action.payload.sort(sortOperatorsTypesById);

    return dispatch(showOperatorsTypes(sortedOperatorsTypes));
  });

/**
 * Deletes operator type from server
 * @returns {function}
 */

export const deleteOperatorType = id => dispatch =>
  dispatch(OperatorsTypesAPI.deleteOperatorTypeDetail(id)).then((action) => {
    action.error
      ? dispatch(
          Notifications.showNotification({
            showing: true,
            message: action.payload.response.error.message,
            type: 'warning',
          })
        )
      : dispatch(
          Notifications.showNotification({
            showing: true,
            message: action.payload.status,
            type: 'success',
          })
        );

    /**
     * Receives operators types from server
     * @returns {function}
     */

    dispatch(OperatorsTypesAPI.fetchOperatorsTypes()).then((action) => {
      const sortedOperatorsTypes = action.payload.sort(sortOperatorsTypesById);
      return dispatch(showOperatorsTypes(sortedOperatorsTypes));
    });
  });

/**
 * Changes operator types priority
 * @param {Array} operatorsTypes
 * @param {number} oldIndex
 * @param {number} newIndex
 * @returns {function}
 */

export const showChangedOperatorsTypes = ({ operatorsTypes, oldIndex, newIndex }) => (dispatch) => {
  const changedOperatorsTypesPriority = arrayMove(operatorsTypes, oldIndex, newIndex).map(
    (operatorType, index) => ({
      ...operatorType,
      priority: index + 1,
    })
  );
  return dispatch(changeOperatorsTypes(changedOperatorsTypesPriority));
};

/**
 * Combines values from form with operator type Object
 * @param {Array} operatorsTypes
 * @param {Object} values
 * @returns {function}
 */

export const combineOperatorsTypes = ({ operatorsTypes, values }) => (dispatch) => {
  const changedOperatorsTypesState = operatorsTypes.map((operator) => {
    for (const [key, value] of Object.entries(values)) {
      if (key === operator.name) {
        return {
          ...operator,
          active: value,
        };
      }
    }
  });

  /**
   * Updating operator types configuration ,and sending that to server
   * @param {Array} changedOperatorsTypesState
   * @returns {function}
   */

  return dispatch(OperatorsTypesAPI.updateOperatorsTypes(changedOperatorsTypesState)).then(
    (action) => {
      action.error
        ? dispatch(
            Notifications.showNotification({
              showing: true,
              message: action.payload.message,
              type: 'warning',
            })
          )
        : dispatch(
            Notifications.showNotification({
              showing: true,
              message: action.payload.status,
              type: 'success',
            })
          );

      /**
       * Receives operators types from server
       * @returns {function}
       */

      return dispatch(OperatorsTypesAPI.fetchOperatorsTypes()).then((action) => {
        if (action.error) throw action;
        const sortedOperatorsTypes = action.payload.sort(sortOperatorsTypesById);
        return dispatch(showOperatorsTypes(sortedOperatorsTypes));
      });
    }
  );
};

export const sortOperatorsTypesById = (a, b) => {
  if (a.priority < b.priority) return -1;
  if (a.priority > b.priority) return 1;
  return 0;
};

const operatorsTypes = handleAction(
  combineActions(showOperatorsTypes, changeOperatorsTypes),
  (state, action) => action.payload,
  []
);

export default combineReducers({
  operatorsTypes,
});
