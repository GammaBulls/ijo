import { useCallback, useState } from "react";
import useWretch from "./useWretch";

const useUpdateMe = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const wretch = useWretch();

  const updateMe = useCallback(
    async ({ name, email, phone, showPhone }) => {
      setLoading(true);
      try {
        const data = await wretch
          .url("/me")
          .put({ name, email, phone, showPhone })
          .json();
        // verify(data);
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

  return [updateMe, { data, error, loading }];
};

export default useUpdateMe;
