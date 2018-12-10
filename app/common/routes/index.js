import React from "react";

import { Route, IndexRoute, IndexRedirect } from "react-router";

import App from "../containers/layouts/App";
import Main from "../containers/layouts/Main";
import PreloadData from "../containers/layouts/PreloadData";

import SignInPage from "../containers/pages/SignInPage";

import DashboardPage from "../containers/pages/DashboardPage";
import SystemConfigurationPage from '../containers/pages/ConfigurationFormPage'

import NotFoundPage from "../containers/pages/NotFoundPage";
import AccessDeniedPage from "../containers/pages/AccessDeniedPage";

import { isAuthorized, getScope } from "../reducers";

import { PUBLIC_INDEX_ROUTE } from "../config";

import { hasScope } from "../helpers/scope";
import { getToken, verifyToken } from "../redux/session";
import InternalErrorPage from "../containers/pages/InternalErrorPage";

export const configureRoutes = ({ store }) => {
  const requireAuth = async (nextState, replace, next) => {
    if (__CLIENT__) {
      if (!isAuthorized(store.getState())) {
        replace({ pathname: PUBLIC_INDEX_ROUTE });
      }
    } else {

      const token = await store.dispatch(getToken());
      const { error } = await store.dispatch(verifyToken(token));
      if (error) {
        replace({ pathname: PUBLIC_INDEX_ROUTE });
      }
    }

    return next();
  };

  const requireScope = requiredScope => (nextState, replace, next) => {
    if (!hasScope(requiredScope, getScope(store.getState()))) {
      replace({ pathname: "/401" });
    }
    return next();
  };

  return (
    <Route component={App}>
      <Route component={Main} >
        <Route path="/" component={PreloadData}>
          <IndexRedirect to="dashboard"/>
          <Route path="dashboard" component={DashboardPage}/>
          <Route
            path="configuration"
            component={SystemConfigurationPage}
            // onEnter={requireScope(["global_parameters:read"])}
          />
        </Route>
        <Route path="401" component={AccessDeniedPage}/>
      </Route>
      <Route path="sign-in" component={SignInPage}/>
      <Route path="internal-error" component={InternalErrorPage}/>
      <Route path="*" component={NotFoundPage}/>
    </Route>
  );
};
