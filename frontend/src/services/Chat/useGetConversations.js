import { useEffect, useState } from "react";
import useWretch from "../useWretch";

const useGetConversations = ({ skip } = {}) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(!skip);
  const wretch = useWretch();

  useEffect(() => {
    const execute = async () => {
      setLoading(true);
      try {
        const data = await wretch
          .url("/chat")
          .get()
          .json();
        setData(data);
      } catch (error) {
        setData(null);
        setError(error);
      } finally {
        setLoading(false);
      }
    };
    if (!skip) {
      execute();
    }
  }, [skip, wretch]);

  return { data, error, loading };
};

export default useGetConversations;
