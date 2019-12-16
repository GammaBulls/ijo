import React from "react";
import { Link } from "react-router-dom";
import { routesConfig } from "../Routing/routes";
import DefaultLayout from "../shared/layouts/DefaultLayout/DefaultLayout";
import { ContentSection, SearchSection } from "./Homepage.components";

const Homepage = () => {
  return (
    <DefaultLayout>
      <SearchSection>
        todo search
        <br />
        todo category select
      </SearchSection>
      <ContentSection>
        <h1>Homepage</h1>
        {routesConfig.map(route => (
          <Link to={route.path}>{route.path}</Link>
        ))}
      </ContentSection>
    </DefaultLayout>
  );
};

export default Homepage;
