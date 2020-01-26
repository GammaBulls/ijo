import { formatDistanceToNow } from "date-fns";
import { pl } from "date-fns/locale";
import React, { useCallback, useMemo } from "react";
import { generatePath, useHistory } from "react-router";
import useGetAdPhotos from "../../../services/Ads/useGetAdPhotos";
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
import useFavorite from "../../../services/Ads/useFavorite";
import useUnFavorite from "../../../services/Ads/useUnFavorite";

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

  const onEditClick = useCallback(() => {
    history.push(generatePath(routesPaths.AD_EDIT, { id }));
  }, [history, id]);

  const onStarClick = useCallback(async () => {
    if (is_favorite) {
      await unfavorite({ id });
    } else {
      await favorite({ id });
    }
    refresh();
  }, [favorite, id, is_favorite, refresh, unfavorite]);

  return (
    <Wrapper promoted={is_promoted}>
      <Image src={mainPhoto || noPictures} />
      <Content>
        <InfoWrapper>
          <Title to={generatePath(routesPaths.AD, { id })}>{title}</Title>
          <Category>{categoryName}</Category>
          <Time>{formattedDate}</Time>
        </InfoWrapper>
        <PriceWrapper>
          <Price>
            {price} PLN
            {editable && <EditButton onClick={onEditClick}>Edytuj</EditButton>}
          </Price>
          <FavoriteStar isFavorited={is_favorite} onClick={onStarClick} />
        </PriceWrapper>
      </Content>
    </Wrapper>
  );
};

export default Ad;
