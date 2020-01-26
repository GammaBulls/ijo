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

  const shouldRedirect =
    !userInfo ||
    (requireAdmin && !userInfo.is_admin) ||
    (requireModerator && !userInfo.is_moderator);

  useEffect(() => {
    console.log(userInfo);
    if (shouldRedirect) {
      history.push(routesPaths.LOGIN);
    }
  }, [history, requireAdmin, requireModerator, shouldRedirect, userInfo]);

  return shouldRedirect;
};

export default useAuthorizedOnly;
