import { useCallback, useState } from "react";
import useWretch from "../useWretch";

const usePostReport = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const wretch = useWretch();

  const postReport = useCallback(
    async ({ id, isOk, banUser }) => {
      setLoading(true);
      try {
        const data = await wretch
          .url(`/mod/reports/${id}`)
          .post({ is_ok: isOk, banUser })
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

  return [postReport, { data, error, loading }];
};

export default usePostReport;
