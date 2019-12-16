import styled from "styled-components";
import colors from "../../styles/colors";
import { ReactComponent as Logo } from "./appLogo.svg";

export const Wrapper = styled.div`
  display: flex;
  height: 100vh;
  width: 100wh;
  overflow: auto;

  flex-direction: column;
`;

export const WidthWrapper = styled.div`
  width: 890px;
  margin-left: auto;
  margin-right: auto;

  ${p => p.column && `flex-direction: column;`}
`;

export const Header = styled.div`
  background: ${colors.headerBackground};
  height: 30px;
  display: flex;
`;

export const HeaderButtons = styled.div``;

export const AppLogo = styled(Logo)`
  margin-top: 4px;
  height: 150%;
  width: auto;
`;
