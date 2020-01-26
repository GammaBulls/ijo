import { useCallback, useState } from "react";
import useWretch from "../useWretch";

const useRegister = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const wretch = useWretch(false);

  const register = useCallback(
    async ({ name, email, phone, password }) => {
      setLoading(true);
      try {
        const data = await wretch
          .url("/user")
          .post({ name, email, phone, password, showPhone: true })
          .json();
        //TODO: verify(data);
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

  return [register, { data, error, loading }];
};

export default useRegister;
