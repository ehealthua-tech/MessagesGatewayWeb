import { combineReducers } from "redux";
import { arrayMove } from "react-sortable-hoc";
import { combineActions, createAction, handleAction } from "redux-actions";
import * as fromPriority from "../../../redux/priority";
import * as fromNotifications from "../../../redux/notification";
// import * as fromOperators from "../../../redux/operators-types";


export const showOperatorsTypes = createAction(
  "operatorsTypesPage/SHOW_OPERATORS_TYPES"
);

export const changeOperatorsTypes = createAction(
  "operatorsTypesPage/CHANGE_OPERATORS_TYPES_PRIORITY"
);


// export const showOperatorsTypes = createAction(
//   "OperatorsTypePage/SHOW_OPERATORS_TYPES"
// );


export const fetchOperatorsTypes = () => dispatch =>
  dispatch(fromPriority.fetchOperatorsTypes()).then(action => {
    if (action.error) throw action;
    const sortedOperatorsTypes = action.payload.sort(sortOperatorsTypesById);

    return dispatch(showOperatorsTypes(sortedOperatorsTypes));
  });

// export const fetchOperatorsTypes = () => dispatch =>
//   dispatch(fromOperators.fetchOperatorsTypes()).then(action => {
//     if (action.error) throw action;
//
//     return dispatch(showOperatorsTypes(action.payload));
//   });


export const showChangedOperatorsTypes = ({ operatorsTypes, oldIndex, newIndex }) => dispatch => {
  const changedOperatorsTypesPriority = arrayMove(operatorsTypes, oldIndex, newIndex)
    .map((operatorType, index) => {
      return {
        ...operatorType,
        priority: index + 1
      };
    });
  dispatch(changeOperatorsTypes(changedOperatorsTypesPriority));
};

export const combineOperatorsTypes = ({ operatorsTypes, values }) => dispatch => {
  const changedOperatorsTypesState = operatorsTypes.map((operator) => {
    for (let [key, value] of Object.entries(values)) {
      if (key === operator.name) {
        return {
          ...operator,
          active: value
        };
      }
    }

  });

  dispatch(fromPriority.updateOperatorsTypes(changedOperatorsTypesState)).then(action => {
    action.error ?
      dispatch(fromNotifications.showNotification({
        showing: true,
        message: action.payload.message,
        type: "warning"
      }))
      :
      dispatch(fromNotifications.showNotification({
        showing: true,
        message: action.payload.status,
        type: "success"
      }));


    dispatch(fromPriority.fetchOperatorsTypes()).then(action => {
      if (action.error) throw action;
      const sortedOperatorsTypes = action.payload.sort(sortOperatorsTypesById);
      return dispatch(showOperatorsTypes(sortedOperatorsTypes));
    });
  });
};

const sortOperatorsTypesById = (a, b) => {
  if (a.priority < b.priority) return -1;
  if (a.priority > b.priority) return 1;
  return 0;
};


const operatorsTypes = handleAction(
  combineActions(
    showOperatorsTypes,
    changeOperatorsTypes
  ),
  (state, action) => action.payload,
  []
);

// const operatorsTypesList = handleAction(
//   combineActions(
//     showOperatorsTypes
//   ),
//   (state, action) => action.payload,
//   []
// );


export default combineReducers({
  operatorsTypes
  // operatorsTypesList
});

