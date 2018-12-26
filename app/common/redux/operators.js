import { handleAction, combineActions } from "redux-actions";
import { API_URL } from "../config";
import { createUrl } from "helpers/url";
import { invoke } from "./api";

export const fetchOperators = options =>
  invoke({
    endpoint: createUrl(`${API_URL}/operators`, options),
    method: "GET",
    headers: {
      "content-type": "application/json"
    },
    types: [
      "operators/FETCH_OPERATORS_REQUEST",
      {
        type: "operators/FETCH_OPERATORS_SUCCESS",
        payload: (action, state, res) => res.json().then(resp => resp.data)
      },
      "operators/FETCH_OPERATORS_FAILURE"
    ]
  });


export default handleAction(
  combineActions(
    "operators/FETCH_PRIORITY_SUCCESS",
  ),
  (state, action) => ({
    ...state,
    ...action.payload
  }),
  []
);
