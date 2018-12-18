import { handleAction, combineActions } from "redux-actions";
import { API_URL } from "config";
import { createUrl } from "helpers/url";
import { invoke } from "./api";

export const fetchPriority = options =>
  invoke({
    endpoint: createUrl(`${API_URL}/operators`, options),
    method: "GET",
    headers: {
      "content-type": "application/json"
    },
    types: [
      "priority_requests/FETCH_PRIORITY_REQUEST",
      {
        type: "priority_requests/FETCH_PRIORITY_SUCCESS",
        payload: (action, state, res) => res.json().then(resp => resp.data)
      },
      "priority_requests/FETCH_PRIORITY_FAILURE"
    ]
  });

export const updatePriority = (body) =>
  invoke({
    endpoint: `${API_URL}/operators/update_priority`,
    method: "POST",
    headers: {
      "content-type": "application/json"
    },
    types: [
      "priority_requests/UPDATE_PRIORITY_REQUEST",
      {
        type: "priority_requests/UPDATE_PRIORITY_SUCCESS",
        payload: (action, state, res) => res.json().then(resp => resp.data)
      },
      "priority_requests/UPDATE_PRIORITY_FAILURE"
    ],
    body
  });

export default handleAction(
  combineActions(
    "dictionaries/FETCH_PRIORITY_SUCCESS",
    "dictionaries/UPDATE_PRIORITY_SUCCESS"
  ),
  (state, action) => ({
    ...state,
    ...action.payload
  }),
  []
);
