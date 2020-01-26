import styled from "styled-components";
import person from "./person.png";
import colors from "../shared/styles/colors";
import { Link } from "react-router-dom";

export const Wrapper = styled.div`
  display: flex;
  align-items: center;
  border: 1px solid black;
  border-radius: 5px;
  cursor: pointer;
  :hover {
    color: ${colors.brandColor};
  }
`;

export const ChatBubble = styled.img.attrs({ src: person })`
  width: 40px;
  height: 40px;
`;

export const Name = styled(Link)`
  color: inherit !important;
`;
