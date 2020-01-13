import React, { lazy } from "react";
import { Route } from "react-router";
import { routesPaths } from "./routesPaths";

export const routesConfig = [
  {
    path: routesPaths.HOMEPAGE,
    exact: true,
    importComponent: () => import("../Homepage"),
  },
  {
    path: routesPaths.LOGIN,
    exact: true,
    importComponent: () => import("../Login"),
  },
  {
    path: routesPaths.LOGOUT,
    exact: true,
    importComponent: () => import("../Logout"),
  },
  {
    path: routesPaths.REGISTER,
    exact: true,
    importComponent: () => import("../Register"),
  },
  {
    path: routesPaths.RESET_PASSWORD,
    exact: true,
    importComponent: () => import("../ResetPassword"),
  },
  {
    path: routesPaths.MY_PROFILE,
    exact: true,
    importComponent: () => import("../MyProfile"),
  },
  {
    path: routesPaths.NEW_AD,
    exact: true,
    importComponent: () => import("../NewAd"),
  },
  {
    path: routesPaths.AD,
    exact: true,
    importComponent: () => import("../Ad"),
  },
  {
    path: routesPaths.CHAT,
    exact: true,
    importComponent: () => import("../Chat"),
  },
];

const routes = routesConfig.map(({ importComponent, ...routeConfig }) => {
  const component = lazy(importComponent);

  return (
    <Route key={routeConfig.path} component={component} {...routeConfig} />
  );
});

export default routes;
