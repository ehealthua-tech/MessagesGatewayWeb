import { combineReducers } from "redux";
import { reducer as form } from "redux-form";
import { routerReducer as routing } from "react-router-redux";
import labels from "../redux/labels";
import Aside from "../containers/blocks/Aside/redux";
import session from "../redux/session";
import loading from "../redux/loading";

const blocks = combineReducers({
  Aside
});

const data = combineReducers({
  labels
});

export default combineReducers({
  blocks,
  session,
  data,
  // external libraries
  form,
  routing,
  loading
});

export const isAuthorized = state => state.session.authorized;
export const getScope = state => state.session.scope;

