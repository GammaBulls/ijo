import useWretch from "./useWretch";
import { useState, useEffect } from "react";

const useGetMe = ({ skip }) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(!skip);
  const wretch = useWretch();

  useEffect(() => {
    const execute = async () => {
      setLoading(true);
      try {
        const data = await wretch
          .url("/me")
          .get()
          .json();
        setData(data);
      } catch (error) {
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

export default useGetMe;
