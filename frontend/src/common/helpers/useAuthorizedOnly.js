import { useEffect } from "react";
import { useHistory } from "react-router";
import { useAppContext } from "../../modules/App/AppContext";
import { routesPaths } from "../../modules/Routing/routesPaths";

const useAuthorizedOnly = ({
  requireAdmin = false,
  requireModerator = false,
} = {}) => {
  const { userInfo } = useAppContext();
  const history = useHistory();

  useEffect(() => {
    console.log(userInfo);
    if (
      !userInfo ||
      (requireAdmin && !userInfo.is_admin) ||
      (requireModerator && !userInfo.is_moderator)
    ) {
      history.push(routesPaths.LOGIN);
    }
  }, [history, requireAdmin, requireModerator, userInfo]);
};

export default useAuthorizedOnly;
