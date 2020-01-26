import { useCallback, useState } from "react";
import useWretch from "../useWretch";

const useGetAuthor = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const wretch = useWretch();

  const getAuthor = useCallback(
    async ({ id }) => {
      setLoading(true);
      try {
        const data = await wretch
          .url(`/public/${id}`)
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

  return [getAuthor, { data, error, loading }];
};

export default useGetAuthor;
