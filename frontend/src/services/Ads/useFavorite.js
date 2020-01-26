import { useCallback, useState } from "react";
import useWretch from "../useWretch";

const useFavorite = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const wretch = useWretch();

  const favorite = useCallback(
    async ({ id }) => {
      setLoading(true);
      try {
        const data = await wretch
          .url(`/ad/${id}/favorite`)
          .post()
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

  return [favorite, { data, error, loading }];
};

export default useFavorite;
