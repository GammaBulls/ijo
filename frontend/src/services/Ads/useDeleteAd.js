import { useCallback, useState } from "react";
import useWretch from "../useWretch";

const useDeleteAd = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const wretch = useWretch();

  const deleteAd = useCallback(
    async ({ id, sold }) => {
      setLoading(true);
      try {
        const data = await wretch
          .url(`/ad/${id}`)
          .json({
            reason: sold ? "Sold" : "Not sold",
          })
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
    },
    [wretch],
  );

  return [deleteAd, { data, error, loading }];
};

export default useDeleteAd;
