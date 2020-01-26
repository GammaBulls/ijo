import { createContext, useContext } from "react";

const AppContext = createContext({ userInfo: null, update: async () => {} });
export const useAppContext = () => useContext(AppContext);

export default AppContext;
