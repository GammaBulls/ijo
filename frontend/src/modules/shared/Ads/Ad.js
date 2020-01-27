import { formatDistanceToNow } from "date-fns";
import { pl } from "date-fns/locale";
import React, { useCallback, useMemo, useState } from "react";
import { generatePath, useHistory } from "react-router";
import useDeleteAd from "../../../services/Ads/useDeleteAd";
import useExtendAd from "../../../services/Ads/useExtendAd";
import useFavorite from "../../../services/Ads/useFavorite";
import useGetAdPhotos from "../../../services/Ads/useGetAdPhotos";
import usePromoteAd from "../../../services/Ads/usePromoteAd";
import useUnFavorite from "../../../services/Ads/useUnFavorite";
import { routesPaths } from "../../Routing/routesPaths";
import {
  Category,
  Content,
  EditButton,
  FavoriteStar,
  Image,
  InfoWrapper,
  Price,
  PriceWrapper,
  Time,
  Title,
  Wrapper,
} from "./Ad.components";
import { useCategoriesContext } from "./CategoriesContext";
import noPictures from "./no-pictures.svg";

const Ad = ({
  data: {
    end_date,
    end_reason,
    id,
    is_favorite,
    is_promoted,
    owner,
    price,
    start_date,
    title,
    category: categoryId,
  },
  editable,
  refresh,
  gray,
}) => {
  const history = useHistory();
  const categories = useCategoriesContext();
  const [favorite] = useFavorite();
  const [unfavorite] = useUnFavorite();

  const categoryName = useMemo(
    () =>
      (categories.find(({ id }) => id === categoryId) || { category_name: "" })
        .category_name,
    [categories, categoryId],
  );

  const formattedDate = useMemo(
    () => formatDistanceToNow(start_date, { locale: pl, addSuffix: true }),
    [start_date],
  );

  const { data: photoData } = useGetAdPhotos({ id: id });

  const [mainPhoto] = useMemo(() => {
    if (!Array.isArray(photoData)) {
      return [];
    }
    return photoData.map(v => v.link);
  }, [photoData]);

  const [deleteAd] = useDeleteAd();
  const [extendAd] = useExtendAd();
  const [promoteAd] = usePromoteAd();

  const onPromoteClick = useCallback(async () => {
    await promoteAd({ id });
  }, [id, promoteAd]);

  const onEditClick = useCallback(async () => {
    history.push(generatePath(routesPaths.AD_EDIT, { id }));
  }, [history, id]);

  const onExtendClick = useCallback(async () => {
    await extendAd({ id });
  }, [extendAd, id]);

  const [deleting, setDeleting] = useState(false);

  const onDeleteClick = useCallback(async () => {
    setDeleting(true);
  }, []);

  const onCancel = useCallback(async () => {
    setDeleting(false);
  }, []);

  const onSold = useCallback(async () => {
    await deleteAd({ id, sold: true });
  }, [deleteAd, id]);
  const onNotSold = useCallback(async () => {
    await deleteAd({ id, sold: false });
  }, [deleteAd, id]);

  const onStarClick = useCallback(async () => {
    if (is_favorite) {
      await unfavorite({ id });
    } else {
      await favorite({ id });
    }
    refresh();
  }, [favorite, id, is_favorite, refresh, unfavorite]);

  return (
    <Wrapper promoted={is_promoted} gray={gray && !!end_reason}>
      <Image src={mainPhoto || noPictures} />
      <Content>
        <InfoWrapper>
          <Title to={generatePath(routesPaths.AD, { id })}>{title}</Title>
          <Category>{categoryName}</Category>
          <Time>{formattedDate}</Time>
        </InfoWrapper>
        <PriceWrapper>
          <Price>
            {price.toFixed(2)} PLN
            {deleting && (
              <>
                {editable && (
                  <EditButton onClick={onSold}>Sprzedane</EditButton>
                )}
                {editable && (
                  <EditButton onClick={onNotSold}>Nie sprzedane</EditButton>
                )}
                {editable && <EditButton onClick={onCancel}>Anuluj</EditButton>}
              </>
            )}
            {!deleting && (
              <>
                {editable && !is_promoted && (
                  <EditButton onClick={onPromoteClick}>Promuj</EditButton>
                )}
                {editable && (
                  <EditButton onClick={onExtendClick}>Wydłuż</EditButton>
                )}
                {editable && (
                  <EditButton onClick={onEditClick}>Edytuj</EditButton>
                )}
                {editable && (
                  <EditButton onClick={onDeleteClick}>Skasuj</EditButton>
                )}
              </>
            )}
          </Price>
          <FavoriteStar isFavorited={is_favorite} onClick={onStarClick} />
        </PriceWrapper>
      </Content>
    </Wrapper>
  );
};

export default Ad;
