import createPersistedState from "use-persisted-state";

const USER_TOKEN_KEY = "token";
const usePersistedToken = createPersistedState(USER_TOKEN_KEY);

const useUserToken = () => usePersistedToken(null);

export default useUserToken;
