import { createContext, useContext } from "react";

const AppContext = createContext({ userInfo: null, update: () => {} });

export const useAppContext = () => useContext(AppContext);

export default AppContext;
