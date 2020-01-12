import { useCallback, useState } from "react";
import useWretch from "./useWretch";

const useLogin = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const wretch = useWretch(false);

  const verify = useCallback(({ message }) => {
    if (message.startsWith("Logged in as ")) {
      return true;
    }
    throw new Error(`Unsuccessful login: ${message}`);
  }, []);

  const login = useCallback(
    async ({ email, password }) => {
      setLoading(true);
      try {
        const data = await wretch
          .url("/login")
          .post({ email, password })
          .json();
        verify(data);
        setData(data);
        return data;
      } catch (error) {
        setError(error);
        throw error;
      } finally {
        setLoading(false);
      }
    },
    [verify, wretch],
  );

  return [login, { data, error, loading }];
};

export default useLogin;
