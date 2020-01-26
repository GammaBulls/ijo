import React, { useEffect, useMemo } from "react";
import useGetAds from "../../services/Ads/useGetAds";
import useGetCategories from "../../services/useGetCategories";
import Ad from "../shared/Ads/Ad";
import CategoriesContext from "../shared/Ads/CategoriesContext";

const Ads = ({ name, categoryId, priceMax, priceMin }) => {
  const [getAds, { data, error }] = useGetAds();
  const { data: categoiresData } = useGetCategories();

  useEffect(() => {
    getAds({ name, categoryId, priceMax, priceMin });
  }, [categoryId, getAds, name, priceMax, priceMin]);

  const innerAds = useMemo(
    () =>
      data &&
      data
        .map(a => ({ ...a, start_date: new Date(a.start_date) }))
        .sort((a, b) =>
          `${b.is_promoted}${b.start_date}`.localeCompare(
            `${a.is_promoted}${a.start_date}`,
          ),
        )
        .map(ad => (
          <Ad
            key={ad.id}
            data={ad}
            refresh={() => {
              getAds({ name, categoryId, priceMax, priceMin });
            }}
            gray={true}
          />
        )),
    [categoryId, data, getAds, name, priceMax, priceMin],
  );

  if (error) return `Error: ${error}`;

  return (
    <CategoriesContext.Provider value={categoiresData || []}>
      {innerAds}
    </CategoriesContext.Provider>
  );
};

export default Ads;
