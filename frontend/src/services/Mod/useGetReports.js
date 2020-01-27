import { useCallback, useState } from "react";
import useWretch from "../useWretch";

const useGetReports = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const wretch = useWretch();

  const getReports = useCallback(async () => {
    setLoading(true);
    try {
      const data = await wretch
        .url("/mod/reports")
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
  }, [wretch]);

  return [getReports, { data, error, loading }];
};

export default useGetReports;
