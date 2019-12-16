import React from "react";
import DefaultLayout from "../shared/layouts/DefaultLayout/DefaultLayout";
import { routesConfig } from "../Routing/routes";
import { Link } from "react-router-dom";

const Homepage = () => {
  return (
    <DefaultLayout>
      <h1>Homepage</h1>
      {routesConfig.map(route => (
        <Link to={route.path}>{route.path}</Link>
      ))}
    </DefaultLayout>
  );
};

export default Homepage;
