import React, { useEffect, useMemo } from "react";
import useGetCategories from "../../../services/useGetCategories";
import Ad from "../../shared/Ads/Ad";
import CategoriesContext from "../../shared/Ads/CategoriesContext";
import useGetMyFavorites from "../../../services/Ads/useGetMyFavorites";

const MyFavorites = () => {
  const [getMyFavorites, { data, error }] = useGetMyFavorites();
  const { data: categoiresData } = useGetCategories();

  useEffect(() => {
    getMyFavorites();
  }, [getMyFavorites]);

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
              refresh={() => {
                getMyFavorites();
              }}
              gray={true}
            />
          ))) ||
      [],
    [data, getMyFavorites],
  );

  if (error) return `Error: ${error}`;

  return (
    <CategoriesContext.Provider value={categoiresData || []}>
      <h3>Twoje ulubione ogłoszenia</h3>
      {innerAds.length > 0
        ? innerAds
        : "Brak ogłoszeń. Użyj gwiazdki obok ogłoszenia, aby dodać je do ulubionych"}
    </CategoriesContext.Provider>
  );
};

export default MyFavorites;
