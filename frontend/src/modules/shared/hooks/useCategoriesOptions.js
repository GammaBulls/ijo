import useGetCategories from "../../../services/useGetCategories";

const useCategoriesOptions = (...args) => {
  const { data, loading } = useGetCategories(...args);

  return [
    (data || []).map(({ id, category_name }) => ({
      label: category_name,
      value: id,
    })),
    loading,
  ];
};

export default useCategoriesOptions;
