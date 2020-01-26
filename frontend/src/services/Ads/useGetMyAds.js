import { useCallback, useState } from "react";
import useWretch from "../useWretch";

const useGetMyAds = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const wretch = useWretch();

  const getMyAds = useCallback(async () => {
    setLoading(true);
    try {
      const data = await wretch
        .url("/me/ads")
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

  return [getMyAds, { data, error, loading }];
};

export default useGetMyAds;
