import React, { useEffect, useMemo } from "react";
import useGetCategories from "../../../services/useGetCategories";
import useGetMyAds from "../../../services/Ads/useGetMyAds";
import Ad from "../../shared/Ads/Ad";
import CategoriesContext from "../../shared/Ads/CategoriesContext";

const MyAds = () => {
  const [getMyAds, { data, error }] = useGetMyAds();
  const { data: categoiresData } = useGetCategories();

  useEffect(() => {
    getMyAds();
  }, [getMyAds]);

  const innerAds = useMemo(
    () =>
      (data &&
        data
          .map(a => ({ ...a, start_date: new Date(a.start_date) }))
          .sort((a, b) => b.start_date - a.start_date)
          .map(ad => (
            <Ad
              key={ad.id}
              data={ad}
              editable={true}
              refresh={() => getMyAds()}
              gray={true}
            />
          ))) ||
      [],
    [data, getMyAds],
  );

  if (error) return `Error: ${error}`;

  return (
    <CategoriesContext.Provider value={categoiresData || []}>
      <h3>Twoje ogłoszenia</h3>
      {innerAds.length > 0 ? innerAds : "Brak ogłoszeń"}
    </CategoriesContext.Provider>
  );
};

export default MyAds;
