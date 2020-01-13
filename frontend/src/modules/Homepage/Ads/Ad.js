import React, { useMemo } from "react";
import {
  Category,
  Content,
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
import { formatDistanceToNow } from "date-fns";

import { pl } from "date-fns/locale";
import { generatePath } from "react-router";
import { routesPaths } from "../../Routing/routesPaths";
import noPictures from "./no-pictures.svg";

const Ad = ({
  data: { title, category: categoryId, start_date, price, id, photo_path },
}) => {
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

  return (
    <Wrapper>
      <Image src={photo_path || noPictures} />
      <Content>
        <InfoWrapper>
          <Title to={generatePath(routesPaths.AD, { id })}>{title}</Title>
          <Category>{categoryName}</Category>
          <Time>{formattedDate}</Time>
        </InfoWrapper>
        <PriceWrapper>
          <Price>{price} PLN</Price>
          <FavoriteStar isFavorited={Math.random() > 0.5} />
        </PriceWrapper>
      </Content>
    </Wrapper>
  );
};

export default Ad;
