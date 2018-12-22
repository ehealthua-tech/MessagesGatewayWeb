import { handleAction, combineActions } from "redux-actions";
import { API_URL } from "config";
import { createUrl } from "helpers/url";
import { invoke } from "./api";

export const fetchOperatorsTypes = options =>
  invoke({
    endpoint: createUrl(`${API_URL}/operator_type`, options),
    method: "GET",
    headers: {
      "content-type": "application/json"
    },
    types: [
      "operators/FETCH_OPERATORS_TYPES_REQUEST",
      {
        type: "operators/FETCH_OPERATORS_TYPES_SUCCESS",
        payload: (action, state, res) => res.json().then(resp => resp.data)
      },
      "operators/FETCH_OPERATORS_TYPES_FAILURE"
    ]
  });


export default handleAction(
  combineActions(
    "dictionaries/FETCH_PRIORITY_SUCCESS",
  ),
  (state, action) => ({
    ...state,
    ...action.payload
  }),
  []
);
