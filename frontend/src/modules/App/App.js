import React, { Suspense, useEffect, useState } from "react";
import { Route, Switch } from "react-router";
import useGetMe from "../../services/useGetMe";
import routes from "../Routing/routes";
import GlobalStyle from "../shared/styles/globalStyle";
import AppContext from "./AppContext";
import Loading from "./Loading";

const App = () => {
  const [appData, setAppData] = useState({ userInfo: null });
  const { data, loading } = useGetMe();

  useEffect(() => {
    setAppData({ userInfo: data });
  }, [data]);

  return (
    <AppContext.Provider value={appData}>
      <GlobalStyle />
      {loading && <Loading />}
      {!loading && (
        <Suspense fallback={<Loading />}>
          <Switch>
            {routes}
            <Route>404 page not found</Route>
          </Switch>
        </Suspense>
      )}
    </AppContext.Provider>
  );
};

export default App;
