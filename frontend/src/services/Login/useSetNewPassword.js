import { useCallback, useState } from "react";
import useWretch from "../useWretch";

const useSetNewPassword = () => {
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

  const setNewPassword = useCallback(
    async ({ resetToken, newPassword }) => {
      setLoading(true);
      try {
        const data = await wretch
          .url("/set-new-password")
          .post({ token: resetToken, password: newPassword })
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

  return [setNewPassword, { data, error, loading }];
};

export default useSetNewPassword;
