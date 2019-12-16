import styled from "styled-components";
import { Section } from "../shared/layouts/DefaultLayout/DefaultLayout";
import {
  FIRST_SECTION_MARGIN,
  WidthWrapper,
} from "../shared/layouts/DefaultLayout/DefaultLayout.components";
import colors from "../shared/styles/colors";

export const SearchSection = styled(Section)`
  border-bottom: 1px solid ${colors.defaultBorder};
  margin-top: ${FIRST_SECTION_MARGIN}px;
`;

export const ContentSection = styled(Section)`
  flex-grow: 1;
  display: flex;
  background: ${colors.contentBackground};

  ${WidthWrapper} {
    display: flex;
    flex-direction: column;
  }
`;
