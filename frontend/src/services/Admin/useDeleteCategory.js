import { useCallback, useState } from "react";
import useWretch from "../useWretch";

const useDeleteCategory = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const wretch = useWretch();

  const deleteCategory = useCallback(
    async ({ id }) => {
      setLoading(true);
      try {
        const data = await wretch
          .url(`/admin/categories/${id}`)
          .delete()
          .json();
        if (data.message) throw data;
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

  return [deleteCategory, { data, error, loading }];
};

export default useDeleteCategory;
