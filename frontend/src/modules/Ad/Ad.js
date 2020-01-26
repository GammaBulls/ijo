import { formatDistanceToNow } from "date-fns";
import { pl } from "date-fns/locale";
import React, { useMemo } from "react";
import { useParams } from "react-router";
import useGetAd from "../../services/Ads/useGetAd";
import DefaultLayout from "../shared/layouts/DefaultLayout";
import { ContentSection } from "./Ad.components";
import useGetCategories from "../../services/useGetCategories";
import useCategoriesOptions from "../shared/hooks/useCategoriesOptions";
import useGetAdPhotos from "../../services/Ads/useGetAdPhotos";

const Ad = () => {
  const { id } = useParams();
  const { data, error, loading } = useGetAd({ id });
  const [categories] = useCategoriesOptions();

  const { data: photoData } = useGetAdPhotos({ id: id });

  // eslint-disable-next-line no-unused-vars
  const photos = useMemo(() => {
    if (!Array.isArray(photoData)) {
      return [];
    }
    return photoData.map(v => v.link);
  }, [photoData]);

  if (loading) {
    return "Loading...";
  }

  if (error) {
    return `Error: ${error}`;
  }

  const { title, description, start_date, price } = data;
  const category = categories.find(v => v.value === data.category) || {};

  const formattedDate = formatDistanceToNow(new Date(start_date), {
    locale: pl,
    addSuffix: true,
  });

  return (
    <DefaultLayout>
      <ContentSection>
        <h2>{title}</h2>
        <span>Kategoria: {category.label}</span>
        <span>Utworzono: {formattedDate}</span>
        <span>Cena: {price} PLN</span>
        <br />
        {photos.map(link => (
          <img src={link} key={link} />
        ))}
        <h4>Opis:</h4>
        {description}
      </ContentSection>
    </DefaultLayout>
  );
};

export default Ad;
