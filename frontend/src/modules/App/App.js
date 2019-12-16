import React, { Suspense } from "react";
import { Route, Switch } from "react-router";
import routes from "../Routing/routes";
import GlobalStyle from "../shared/styles/globalStyle";
import Loading from "./Loading";

const App = () => {
  // const token = "";
  // const currentUser = {};

  return (
    <>
      <GlobalStyle />
      <Suspense fallback={<Loading />}>
        <Switch>
          {routes}
          <Route>404 page not found</Route>
        </Switch>
      </Suspense>
    </>
  );
};

export default App;
