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
}) => {
  const history = useHistory();
  const categories = useCategoriesContext();

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

  // eslint-disable-next-line no-unused-vars
  const [mainPhoto, ...photos] = useMemo(() => {
    if (!Array.isArray(photoData)) {
      return [];
    }
    return photoData.map(v => v.link);
  }, [photoData]);

  const onEditClick = useCallback(() => {
    history.push(generatePath(routesPaths.AD_EDIT, { id }));
  }, [history, id]);

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
          <FavoriteStar isFavorited={is_favorite} />
        </PriceWrapper>
      </Content>
    </Wrapper>
  );
};

export default Ad;
