import styled from "styled-components";
import { Section } from "../shared/layouts/DefaultLayout";
import { WidthWrapper } from "../shared/layouts/DefaultLayout/DefaultLayout.components";
import colors from "../shared/styles/colors";

import { Link } from "react-router-dom";

export const ContentSection = styled(Section)`
  flex-grow: 1;
  display: flex;
  background: ${colors.contentBackground};

  ${WidthWrapper} {
    display: flex;
    flex-direction: column;
  }
  padding-top: 20px;
`;

export const StyledLink = styled(Link)`
  margin-bottom: 10px;
  /* place-self: flex-end; */
  margin-right: 0px;
  text-decoration: none;
  font-size: 18px;
  color: ${colors.brandColor};

  :hover {
    color: ${colors.hoverColor};
  }
`;
