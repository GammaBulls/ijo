import { useCallback, useState } from "react";
import useWretch from "../useWretch";

const useSendMsg = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const wretch = useWretch();

  const sendMsg = useCallback(
    async ({ convId, msg }) => {
      setLoading(true);
      try {
        const data = await wretch
          .url(`/chat/${convId}`)
          .post({ message: msg })
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

  return [sendMsg, { data, error, loading }];
};

export default useSendMsg;
