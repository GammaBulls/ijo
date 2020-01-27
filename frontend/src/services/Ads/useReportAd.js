import { useCallback, useState } from "react";
import useWretch from "../useWretch";

const useReportAd = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const wretch = useWretch();

  const reportAd = useCallback(
    async ({ id, scam }) => {
      setLoading(true);
      try {
        const data = await wretch
          .url(`/ad/${id}/report`)
          .json({
            reason: scam ? "scam" : "bad language",
          })
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

  return [reportAd, { data, error, loading }];
};

export default useReportAd;
