import { useCallback, useState } from "react";
import useWretch from "../useWretch";

const useGetMe = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const wretch = useWretch();

  const getMe = useCallback(async () => {
    setLoading(true);
    try {
      const data = await wretch
        .url("/me")
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

  return [getMe, { data, error, loading }];
};

export default useGetMe;
