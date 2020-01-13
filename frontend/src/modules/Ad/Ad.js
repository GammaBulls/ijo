import { formatDistanceToNow } from "date-fns";
import { pl } from "date-fns/locale";
import React from "react";
import { useParams } from "react-router";
import useGetAd from "../../services/useGetAd";
import DefaultLayout from "../shared/layouts/DefaultLayout";
import { ContentSection } from "./Ad.components";

const Ad = () => {
  const { id } = useParams();
  const { data, error, loading } = useGetAd({ id });

  // return JSON.stringify({ data, error, loading });

  if (loading) {
    return "Loading...";
  }

  if (error) {
    return `Error: ${error}`;
  }

  const { title, description, start_date, price } = data;

  const formattedDate = formatDistanceToNow(new Date(start_date), {
    locale: pl,
    addSuffix: true,
  });

  // return JSON.stringify(data);

  return (
    <DefaultLayout>
      <ContentSection>
        Ogloszenie {id}
        <br />
        {title} - {formattedDate} ({price} PLN)
        <br />
        {description}
      </ContentSection>
    </DefaultLayout>
  );
};

export default Ad;
