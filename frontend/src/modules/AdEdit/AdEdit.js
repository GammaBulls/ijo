import React from "react";
import { useParams } from "react-router";
import useGetAd from "../../services/Ads/useGetAd";
import useCategoriesOptions from "../shared/hooks/useCategoriesOptions";
import EditAd from "./EditAd";

const AdEdit = () => {
  const { id } = useParams();

  const { data } = useGetAd({ id });
  const [categories, loading] = useCategoriesOptions();

  if (!data || !categories || loading) {
    return null;
  }
  return <EditAd data={data} categories={categories} />;
};
export default AdEdit;
