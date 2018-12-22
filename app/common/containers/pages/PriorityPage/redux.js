import { combineReducers } from "redux";
import { arrayMove } from "react-sortable-hoc";
import { combineActions, createAction, handleAction } from "redux-actions";
import * as fromPriority from "../../../redux/priority";
import * as fromNotifications from "../../../redux/notification";


export const showPriority = createAction(
  "PriorityPage/SHOW_PRIORITY"
);

export const changePriorityState = createAction(
  "PriorityPage/CHANGE_PRIORITY_STATE"
);


export const fetchPriority = () => dispatch =>
  dispatch(fromPriority.fetchPriority()).then(action => {
    if (action.error) throw action;
    const sortedPayload = action.payload.sort(sortPrioritybyId);

    return dispatch(showPriority(sortedPayload));
  });


export const showChangedPriority = ({ priorityState, oldIndex, newIndex }) => dispatch => {
  const newPriorityState = arrayMove(priorityState, oldIndex, newIndex)
    .map((operator, index) => {
      return {
        ...operator,
        priority: index + 1
      };
    });
  dispatch(changePriorityState(newPriorityState));
};

export const updatePriorityState = ({ priorityState, values }) => dispatch => {
  console.log(values);
  const newUpdatedState = priorityState.map((operator) => {
    for (let [key, value] of Object.entries(values)) {
      if (key === operator.name) {
        return {
          ...operator,
          active: value
        };
      }
    }

  });

  dispatch(fromPriority.updatePriority(newUpdatedState)).then(action => {
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


    dispatch(fromPriority.fetchPriority()).then(action => {
      if (action.error) throw action;
      const sortedPayload = action.payload.sort(sortPrioritybyId);
      return dispatch(showPriority(sortedPayload));
    });
  });
};

const sortPrioritybyId = (a, b) => {
  if (a.priority < b.priority) return -1;
  if (a.priority > b.priority) return 1;
  return 0;
};


const priority = handleAction(
  combineActions(
    showPriority,
    changePriorityState
  ),
  (state, action) => action.payload,
  []
);


export default combineReducers({
  priority
});

