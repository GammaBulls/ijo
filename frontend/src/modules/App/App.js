import React, { lazy, Suspense, useEffect, useState } from "react";
import { Route, Switch } from "react-router";
import { ToastContainer } from "react-toastify";
import useUserToken from "../../common/helpers/useUserToken";
import useLazyGetMe from "../../services/Me/useLazyGetMe";
import routes from "../Routing/routes";
import GlobalStyle from "../shared/styles/globalStyle";
import AppContext from "./AppContext";
import Loading from "./Loading";

const App = () => {
  const [appData, setAppData] = useState({ userInfo: null, update: () => {} });
  const [userToken] = useUserToken();
  const [getMe] = useLazyGetMe();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const updateHandler = async () => {
      setReady(false);
      if (!userToken) {
        setReady(true);
        return setAppData({ userInfo: null, update: updateHandler });
      }
      const data = await getMe();
      setAppData({ userInfo: data, update: updateHandler });
      setReady(true);
    };
    updateHandler();
  }, [getMe, userToken]);

  const showDelete = !!(appData.userInfo && appData.userInfo.delete_date);

  return (
    <AppContext.Provider value={appData}>
      <GlobalStyle />
      {!ready && <Loading />}
      {ready && (
        <Suspense fallback={<Loading />}>
          <Switch>
            {showDelete && (
              <Route component={lazy(() => import("../DeletedUser"))} />
            )}
            {!showDelete && routes}
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
