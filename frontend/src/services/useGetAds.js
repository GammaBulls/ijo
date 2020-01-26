import { useCallback, useState } from "react";
import useWretch from "./useWretch";

const useGetAds = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const wretch = useWretch();

  const getAds = useCallback(
    async ({ categoryId, name, priceMax, priceMin }) => {
      setLoading(true);
      try {
        const data = await wretch
          .url("/ad")
          .query({
            ...(categoryId && { categoryId }),
            ...(name && { name }),
            ...(priceMax && { priceMax }),
            ...(priceMin && { priceMin }),
          })
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
