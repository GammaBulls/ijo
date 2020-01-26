import { useCallback, useState } from "react";
import useWretch from "../useWretch";

const useCancelDelete = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const wretch = useWretch();

  const cancelDelete = useCallback(async () => {
    setLoading(true);
    try {
      const data = await wretch
        .url("/me/cancel-delete")
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
  }, [wretch]);

  return [cancelDelete, { data, error, loading }];
};

export default useCancelDelete;
