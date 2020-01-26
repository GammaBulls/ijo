import { useCallback, useState } from "react";
import useWretch from "../useWretch";

const useStartConv = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const wretch = useWretch();

  const startConv = useCallback(
    async ({ id }) => {
      setLoading(true);
      try {
        const data = await wretch
          .url("/chat")
          .post({ id })
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

  return [startConv, { data, error, loading }];
};

export default useStartConv;
