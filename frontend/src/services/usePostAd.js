import { useCallback, useState } from "react";
import useWretch from "./useWretch";

const usePostAd = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const wretch = useWretch(false);

  const postAd = useCallback(
    async ({ price, title, categoryId, pictureUrl, description }) => {
      setLoading(true);
      try {
        const data = await wretch
          .url("/ad")
          .post({
            price,
            title,
            categoryId,
            pictureUrl,
            description,
          })
          .json();
        setData(data);
        return data;
      } catch (error) {
        setError(error);
        throw error;
      } finally {
        setLoading(false);
      }
    },
    [wretch],
  );

  return [postAd, { data, error, loading }];
};

export default usePostAd;
