import { createContext, useContext } from "react";

const CategoriesContext = createContext([]);

export const useCategoriesContext = () => useContext(CategoriesContext);

export default CategoriesContext;
