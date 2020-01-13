import { Link } from "react-router-dom";
import styled from "styled-components";
import colors from "../../shared/styles/colors";

export const Wrapper = styled.div`
  display: flex;

  & + & {
    margin-top: 16px;
  }

  border: thin solid #ccc;
  border-radius: 4px;
`;

export const Image = styled.img`
  width: 160px;
  border: 0;
  place-self: center;
  height: 95px;
`;

export const Content = styled.div`
  display: flex;
  justify-content: space-between;
  flex-grow: 1;
  padding: 8px;
`;

export const InfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

export const Title = styled(Link)`
  margin: 0;
  font-size: 18px;
  font-weight: 500;

  text-decoration: none;
  color: ${colors.linkColor};
  :hover {
    color: ${colors.brandColor};
  }
`;

export const Category = styled.span`
  font-size: 12px;
  color: #888;
`;

export const Time = styled.span`
  margin-top: 8px;
`;

export const PriceWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-end;
`;

export const Price = styled.span`
  font-weight: 700;
  font-size: 24px;
`;

export const FavoriteStar = styled.span.attrs({
  children: "★",
})`
  font-size: 34px;
  transition: all 0.2s;
  backface-visibility: hidden;
  cursor: pointer;

  :hover {
    transform: scale(1.1);
  }

  text-shadow: rgb(0, 0, 0) 2px 0px 0px, rgb(0, 0, 0) 1.75517px 0.958851px 0px,
    rgb(0, 0, 0) 1.0806px 1.68294px 0px, rgb(0, 0, 0) 0.141474px 1.99499px 0px,
    rgb(0, 0, 0) -0.832294px 1.81859px 0px,
    rgb(0, 0, 0) -1.60229px 1.19694px 0px, rgb(0, 0, 0) -1.97998px 0.28224px 0px,
    rgb(0, 0, 0) -1.87291px -0.701566px 0px,
    rgb(0, 0, 0) -1.30729px -1.5136px 0px,
    rgb(0, 0, 0) -0.421592px -1.95506px 0px,
    rgb(0, 0, 0) 0.567324px -1.91785px 0px,
    rgb(0, 0, 0) 1.41734px -1.41108px 0px,
    rgb(0, 0, 0) 1.92034px -0.558831px 0px;

  color: ${p => (p.isFavorited ? "yellow" : "white")};
`;
