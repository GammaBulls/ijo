import { formatDistanceToNow } from "date-fns";
import { pl } from "date-fns/locale";
import React, { useEffect, useMemo } from "react";
import { useParams } from "react-router";
import useGetAd from "../../services/Ads/useGetAd";
import useGetAdPhotos from "../../services/Ads/useGetAdPhotos";
import useGetAuthor from "../../services/Ads/useGetAuthor";
import Button from "../shared/components/Button";
import useCategoriesOptions from "../shared/hooks/useCategoriesOptions";
import DefaultLayout from "../shared/layouts/DefaultLayout";
import { Author, ContentSection, Info, Wrapper } from "./Ad.components";

const Ad = () => {
  const { id } = useParams();
  const { data, error, loading } = useGetAd({ id });
  const [categories] = useCategoriesOptions();

  const { data: photoData } = useGetAdPhotos({ id });
  const [getAuthor, { data: authorData }] = useGetAuthor();

  // eslint-disable-next-line no-unused-vars
  const photos = useMemo(() => {
    if (!Array.isArray(photoData)) {
      return [];
    }
    return photoData.map(v => v.link);
  }, [photoData]);

  useEffect(() => {
    if (data && data.id) {
      getAuthor({ id: data.id });
    }
  }, [data, getAuthor]);

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
        <Wrapper>
          <Info>
            <span>Kategoria: {category.label}</span>
            <span>Utworzono: {formattedDate}</span>
            <span>Cena: {price} PLN</span>
          </Info>
          <Author>
            <span>
              Ogloszenia zamieszczone przez: {authorData && authorData.name}
            </span>
            {authorData && (
              <span>Numer telefonu: {authorData.phone_number || "ukryty"}</span>
            )}
            <Button>Chat z autorem</Button>
          </Author>
        </Wrapper>

        <br />
        {photos.map(link => (
          <img src={link} key={link} alt="zdjecie" />
        ))}
        <h4>Opis:</h4>
        {description}
      </ContentSection>
    </DefaultLayout>
  );
};

export default Ad;
