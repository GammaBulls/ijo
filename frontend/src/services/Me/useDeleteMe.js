import { useCallback, useState } from "react";
import useWretch from "../useWretch";

const useDeleteMe = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const wretch = useWretch();

  const deleteMe = useCallback(async () => {
    setLoading(true);
    try {
      const data = await wretch
        .url("/me")
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
  }, [wretch]);

  return [deleteMe, { data, error, loading }];
};

export default useDeleteMe;
