import React, { useState } from "react";
import DefaultLayout from "../shared/layouts/DefaultLayout/DefaultLayout";
import Ads from "./Ads";
import { ContentSection, SearchSection } from "./Homepage.components";

const Homepage = () => {
  const [
    name,
    //  setName
  ] = useState();
  const [
    categoryId,
    //  setCategoryId
  ] = useState();
  const [
    price,
    // setPrice
  ] = useState();

  return (
    <DefaultLayout>
      <SearchSection>
        todo search
        <br />
        todo category select
      </SearchSection>
      <ContentSection>
        <h1>Homepage</h1>
        <Ads name={name} categoryId={categoryId} price={price} />
        {/* {routesConfig.map(route => (
          <Link key={route.path} to={route.path}>
            {route.path}
          </Link>
        ))} */}
      </ContentSection>
    </DefaultLayout>
  );
};

export default Homepage;
