import React, { useEffect, useMemo } from "react";
import useGetAds from "../../../services/useGetAds";
import Ad from "./Ad";
import CategoriesContext from "./CategoriesContext";
import useGetCategories from "../../../services/useGetCategories";

const Ads = ({ name, categoryId, price }) => {
  const [getAds, { data, error }] = useGetAds();
  const { data: categoiresData } = useGetCategories();

  useEffect(() => {
    getAds({ name, categoryId, price });
  }, [categoryId, getAds, name, price]);

  const innerAds = useMemo(
    () =>
      data &&
      data
        .map(a => ({ ...a, start_date: new Date(a.start_date) }))
        .sort((a, b) => b.start_date - a.start_date)
        .map(ad => <Ad key={ad.id} data={ad} />),
    [data],
  );

  if (error) return `Error: ${error}`;

  return (
    <CategoriesContext.Provider value={categoiresData || []}>
      {innerAds}
    </CategoriesContext.Provider>
  );
};

export default Ads;
