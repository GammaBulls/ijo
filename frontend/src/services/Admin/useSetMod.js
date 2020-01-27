import { useCallback, useState } from "react";
import useWretch from "../useWretch";

const useSetMod = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const wretch = useWretch();

  const setMod = useCallback(
    async ({ id, isMod }) => {
      setLoading(true);
      try {
        const data = await wretch
          .url(`/admin/users/${id}`)
          .json({ isModerator: isMod })
          .put()
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

  return [setMod, { data, error, loading }];
};

export default useSetMod;
