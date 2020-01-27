import { useCallback, useState } from "react";
import useWretch from "../useWretch";

const useAddCategory = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const wretch = useWretch();

  const addCategory = useCallback(
    async ({ name: category_name }) => {
      setLoading(true);
      try {
        const data = await wretch
          .url("/admin/categories")
          .post({ category_name })
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

  return [addCategory, { data, error, loading }];
};

export default useAddCategory;
