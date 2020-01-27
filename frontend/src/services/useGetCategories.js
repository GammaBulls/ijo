import useWretch from "./useWretch";
import { useState, useEffect } from "react";

const useGetCategories = ({ skip, random } = {}) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(!skip);
  const wretch = useWretch(); //TODO: useWretch(false);

  useEffect(() => {
    console.log(random);
    const execute = async () => {
      setLoading(true);
      try {
        const data = await wretch
          .url("/categories")
          .get()
          .json();
        setData(data);
      } catch (error) {
        setData(null);
        setError(error);
      } finally {
        setLoading(false);
      }
    };
    if (!skip) {
      execute();
    }
  }, [random, skip, wretch]);

  return { data, error, loading };
};

export default useGetCategories;
