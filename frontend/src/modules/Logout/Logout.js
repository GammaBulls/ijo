import { useEffect, useState } from "react";
import { useHistory } from "react-router";
import { toast } from "react-toastify";
import useUserToken from "../../common/helpers/useUserToken";
import { routesPaths } from "../Routing/routesPaths";

const Logout = () => {
  const [userToken, setUserToken] = useUserToken();
  const [showNotification] = useState(!!userToken);
  const history = useHistory();

  useEffect(() => {
    setUserToken(null);
  });

  useEffect(() => {
    if (!userToken) {
      history.replace(routesPaths.HOMEPAGE);
      if (showNotification) {
        toast.info("Pomyślnie wylogowano.");
      }
    }
  }, [history, showNotification, userToken]);

  return null;
};

export default Logout;
