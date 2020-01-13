import { useMemo } from "react";
import { toast } from "react-toastify";
import Wretch from "wretch";
import useUserToken from "../common/helpers/useUserToken";

const API_URL = "http://localhost:8000/api";

const useWretch = (authorized = true) => {
  const [userToken, setUserToken] = useUserToken();
  let wretch = useMemo(() => {
    let w = Wretch()
      .url(API_URL)
      .catcher(401, () => {
        toast.warn("Nastąpiło wylogowanie.");
        setUserToken(null);
      })
      .catcher(422, () => {
        toast.warn("Nastąpiło wylogowanie.");
        setUserToken(null);
      })
      .catcher(500, err => {
        toast.error(err);
      });

    if (authorized && userToken) {
      w = w.auth(`Bearer ${userToken}`);
    }

    return w;
  }, [authorized, setUserToken, userToken]);
  return wretch;
};

export default useWretch;
