import { useCallback, useState } from "react";
import useWretch from "./useWretch";

const useGetAds = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const wretch = useWretch();

  const getAds = useCallback(
    async ({ categoryId, name, price }) => {
      setLoading(true);
      try {
        const data = await wretch
          .url("/ad")
          .query({ categoryId, name, price })
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
    },
    [wretch],
  );

  return [getAds, { data, error, loading }];
};

export default useGetAds;
