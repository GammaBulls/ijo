import { useCallback, useState } from "react";
import useWretch from "../useWretch";

const useGetUsers = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const wretch = useWretch();

  const getUsers = useCallback(async () => {
    setLoading(true);
    try {
      const data = await wretch
        .url("/admin/users")
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

  return [getUsers, { data, error, loading }];
};

export default useGetUsers;
