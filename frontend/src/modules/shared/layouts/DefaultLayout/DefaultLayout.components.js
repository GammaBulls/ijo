import { Link } from "react-router-dom";
import styled from "styled-components";
import colors from "../../styles/colors";
import { ReactComponent as Logo } from "./appLogo.svg";
import Button from "../../components/Button";

export const LAYOUT_WIDTH = 890;
export const HEADER_HEIGHT = 60;
const LOGO_OFFSET_TOP = 10;
const LOGO_OFFSET_LEFT = -18;
const LOGO_HEIGHT = 70;

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

export const HeaderWidthWrapper = styled(WidthWrapper)`
  display: flex;
  justify-content: space-between;
  align-items: baseline;
`;

export const HeaderButtonWrapper = styled.div`
  > * + * {
    margin-left: 10px;
  }
`;

export const HeaderButton = styled(Button)`
  min-width: auto;
  padding: 0 10px;
`;

export const Header = styled.div`
  background: ${colors.headerBackground};
  height: ${HEADER_HEIGHT}px;
  display: flex;
  z-index: 10;
  border-bottom: 1px solid ${colors.defaultBorder};
`;

export const AppBrandLink = styled(Link)`
  color: ${colors.brandColor};
  text-decoration: none;
`;

export const AppLogo = styled(Logo)`
  margin-top: ${LOGO_OFFSET_TOP}px;
  margin-left: ${LOGO_OFFSET_LEFT}px;
  height: ${LOGO_HEIGHT}px;
  width: auto;
`;

export const AppName = styled.span`
  user-select: none;
  font-weight: 600;
  font-size: 22px;
`;

export const Footer = styled.div`
  padding-bottom: 50px;
  background-color: ${colors.contentBackground};
`;
