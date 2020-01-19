import { useCallback, useState } from "react";
import useWretch from "./useWretch";

const useUploadPhoto = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const wretch = useWretch();

  const uploadPhoto = useCallback(
    async ({ photo }) => {
      setLoading(true);
      try {
        const data = await wretch
          .url("/upload")
          .formData({ files: photo })
          .post()
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

  return [uploadPhoto, { data, error, loading }];
};

export default useUploadPhoto;
