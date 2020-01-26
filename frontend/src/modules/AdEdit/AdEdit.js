import React from "react";
import { useParams } from "react-router";
import useGetCategories from "../../services/useGetCategories";
import useCategoriesOptions from "../shared/hooks/useCategoriesOptions";
import useGetAd from "../../services/Ads/useGetAd";

const AdEdit = () => {
  const { id } = useParams();

  const { data } = useGetAd({ id });
  const [categories] = useCategoriesOptions();

  return JSON.stringify(data);
};
export default AdEdit;
