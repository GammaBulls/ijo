import useLocalStorage from "./useLocalStorage";

const USER_TOKEN_KEY = "token";

const useUserToken = () => useLocalStorage(USER_TOKEN_KEY, null);

export default useUserToken;
