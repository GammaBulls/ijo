import { useCallback, useState } from "react";
import useWretch from "../useWretch";

const usePromoteAd = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const wretch = useWretch();

  const extend = useCallback(
    async ({ id }) => {
      setLoading(true);
      try {
        const data = await wretch
          .url(`/ad/${id}/promote`)
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

  return [extend, { data, error, loading }];
};

export default usePromoteAd;
