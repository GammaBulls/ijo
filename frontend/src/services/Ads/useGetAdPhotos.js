import { useEffect, useState } from "react";
import useWretch from "../useWretch";

const useGetAdPhotos = ({ skip, id } = {}) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(!skip);
  const wretch = useWretch();

  useEffect(() => {
    const execute = async () => {
      setLoading(true);
      try {
        const data = await wretch
          .url(`/ad/${id}/photos`)
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
  }, [id, skip, wretch]);

  return { data, error, loading };
};

export default useGetAdPhotos;
