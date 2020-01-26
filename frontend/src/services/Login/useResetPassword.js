import { useCallback, useState } from "react";
import useWretch from "../useWretch";

const useResetPassword = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const wretch = useWretch(false);

  // const verify = useCallback(({ message }) => {
  //   if (message.startsWith("Logged in as ")) {
  //     return true;
  //   }
  //   throw new Error(`Unsuccessful login: ${message}`);
  // }, []);

  const resetPassword = useCallback(
    async ({ email }) => {
      setLoading(true);
      try {
        const data = await wretch
          .url("/reset-password")
          .post({ email })
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

  return [resetPassword, { data, error, loading }];
};

export default useResetPassword;
