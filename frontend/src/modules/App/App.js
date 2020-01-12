import React, { Suspense, useEffect, useState } from "react";
import { Route, Switch } from "react-router";
import { ToastContainer } from "react-toastify";
import useUserToken from "../../common/helpers/useUserToken";
import useLazyGetMe from "../../services/useLazyGetMe";
import routes from "../Routing/routes";
import GlobalStyle from "../shared/styles/globalStyle";
import AppContext from "./AppContext";
import Loading from "./Loading";

const App = () => {
  const [appData, setAppData] = useState({ userInfo: null });
  const [userToken] = useUserToken();
  const [getMe, { loading }] = useLazyGetMe();

  useEffect(() => {
    const handler = async () => {
      if (!userToken) {
        return setAppData({ userInfo: null });
      }
      const data = await getMe();
      setAppData({ userInfo: data });
    };
    handler();
  }, [getMe, userToken]);

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
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnVisibilityChange
        draggable={false}
        pauseOnHover
      />
    </AppContext.Provider>
  );
};

export default App;
