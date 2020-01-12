import { createContext, useContext } from "react";

const AppContext = createContext({ userInfo: null, userToken: null });

export const useAppContext = () => useContext(AppContext);

export default AppContext;
