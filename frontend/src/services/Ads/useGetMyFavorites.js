import { useCallback, useState } from "react";
import useWretch from "../useWretch";

const useGetMyFavorites = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const wretch = useWretch();

  const getMyFavorites = useCallback(async () => {
    setLoading(true);
    try {
      const data = await wretch
        .url("/me/favorite")
        .get()
        .json();
      setData(data);
      return data;
    } catch (error) {
      setData(null);
      setError(error);
      throw error;
    } finally {
      setLoading(false);
    }
  }, [wretch]);

  return [getMyFavorites, { data, error, loading }];
};

export default useGetMyFavorites;
