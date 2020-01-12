import { useMemo } from "react";
import Wretch from "wretch";
import useUserToken from "../common/helpers/useUserToken";

const API_URL = "http://localhost:8000/api";

const useWretch = (authorized = true) => {
  const [userToken] = useUserToken();
  let wretch = useMemo(() => {
    let w = Wretch().url(API_URL);

    if (authorized) {
      w = w.auth(`Bearer ${userToken}`);
    }

    return w;
  }, [authorized, userToken]);
  return wretch;
};

export default useWretch;
