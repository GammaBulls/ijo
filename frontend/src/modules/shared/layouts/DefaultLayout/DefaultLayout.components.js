import styled from "styled-components";
import colors from "../../styles/colors";
import { ReactComponent as Logo } from "./appLogo.svg";

export const LAYOUT_WIDTH = 890;
export const HEADER_HEIGHT = 60;
const LOGO_OFFSET_TOP = 6;
const LOGO_OFFSET_LEFT = -6;
const LOGO_HEIGHT = 72;

export const FIRST_SECTION_MARGIN =
  LOGO_HEIGHT + LOGO_OFFSET_TOP - HEADER_HEIGHT;

export const LayoutWrapper = styled.div`
  display: flex;
  height: 100vh;
  width: 100wh;
  overflow: auto;

  flex-direction: column;
`;

export const SectionWrapper = styled.div``;

export const WidthWrapper = styled.div`
  width: ${LAYOUT_WIDTH}px;
  margin-left: auto;
  margin-right: auto;
`;

export const Header = styled.div`
  background: ${colors.headerBackground};
  height: ${HEADER_HEIGHT}px;
  display: flex;
  z-index: 10;
  border-bottom: 1px solid ${colors.defaultBorder};
`;

export const AppLogo = styled(Logo)`
  margin-top: ${LOGO_OFFSET_TOP}px;
  margin-left: ${LOGO_OFFSET_LEFT}px;
  height: 72px;
  width: auto;
`;

export const Footer = styled.div`
  padding-bottom: 50px;
  background-color: ${colors.contentBackground};
`;
