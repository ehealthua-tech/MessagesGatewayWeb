import { handleAction, combineActions } from "redux-actions";
import { API_URL } from "config";
import { createUrl } from "helpers/url";
import { invoke } from "./api";

export const fetchConfiguration = options =>
  invoke({
    endpoint: createUrl(`${API_URL}/system_config`, options),
    method: "GET",
    headers: {
      "content-type": "application/json"
    },
    types: [
      "configuration/FETCH_CONFIGURATION_REQUEST",
      {
        type: "configuration/FETCH_CONFIGURATION_SUCCESS",
        payload: (action, state, res) => res.json().then(resp => resp.data)
      },
      "configuration/FETCH_CONFIGURATION_FAILURE"
    ]
  });

export const updateConfigurationDetail = body =>
  invoke({
    endpoint: `${API_URL}/system_config`,
    method: "POST",
    headers: {
      "content-type": "application/json"
    },
    types: [
      "configuration/UPDATE_CONFIGURATION_REQUEST",
      {
        type: "configuration/UPDATE_CONFIGURATION_SUCCESS",
        payload: (action, state, res) => res.json().then(resp => resp.data)
      },
      "configuration/UPDATE_CONFIGURATION_FAILURE"
    ],
    body
  });

export default handleAction(
  combineActions(
    "configuration/FETCH_CONFIGURATION_SUCCESS",
    "configuration/UPDATE_CONFIGURATION_SUCCESS"
  ),
  (state, action) => ({
    ...state,
    ...action.payload
  }),
  []
);
