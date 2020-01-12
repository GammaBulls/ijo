import { useEffect } from "react";
import { useHistory } from "react-router";
import useUserToken from "../../common/helpers/useUserToken";
import { routesPaths } from "../Routing/routesPaths";

const Logout = () => {
  const [, setUserToken] = useUserToken();
  const history = useHistory();

  useEffect(() => {
    setUserToken(null);
    history.replace(routesPaths.HOMEPAGE);
    window.location.reload();
  }, [history, setUserToken]);

  return null;
};

export default Logout;
