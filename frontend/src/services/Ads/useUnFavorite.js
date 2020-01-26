import { useCallback, useState } from "react";
import useWretch from "../useWretch";

const useUnFavorite = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const wretch = useWretch();

  const unfavorite = useCallback(
    async ({ id }) => {
      setLoading(true);
      try {
        const data = await wretch
          .url(`/ad/${id}/favorite`)
          .delete()
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

  return [unfavorite, { data, error, loading }];
};

export default useUnFavorite;
