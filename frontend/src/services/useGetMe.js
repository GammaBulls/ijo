import useWretch from "./useWretch";
import { useState, useEffect } from "react";

const useGetMe = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const wretch = useWretch();

  useEffect(() => {
    const execute = async () => {
      try {
        const data = await wretch
          .url("/me")
          .get()
          .json();
        setData(data);
      } catch (error) {
        console.error(error);
        setError(error);
      } finally {
        setLoading(false);
      }
    };
    execute();
  }, [wretch]);

  return { data, error, loading };
};

export default useGetMe;
