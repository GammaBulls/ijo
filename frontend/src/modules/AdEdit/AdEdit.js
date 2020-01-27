import React from "react";
import { useParams } from "react-router";
import useGetAd from "../../services/Ads/useGetAd";
import useCategoriesOptions from "../shared/hooks/useCategoriesOptions";
import EditAd from "./EditAd";

const AdEdit = () => {
  const { id } = useParams();

  const { data } = useGetAd({ id });
  const [categories] = useCategoriesOptions();

  if (!data || !categories) {
    return null;
  }
  return <EditAd data={data} categories={categories} />;
};
export default AdEdit;
