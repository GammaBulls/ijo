import { useCallback, useState } from "react";
import useWretch from "../useWretch";

const useGetConv = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const wretch = useWretch();

  const getConv = useCallback(
    async ({ id }) => {
      setLoading(true);
      try {
        const data = await wretch
          .url(`/chat/${id}`)
          .get()
          .json();
        setData(data.reverse());
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

  return [getConv, { data, error, loading }];
};

export default useGetConv;
