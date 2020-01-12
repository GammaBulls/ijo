import React, { useCallback } from "react";
import { useHistory, useRouteMatch } from "react-router";
import { useAppContext } from "../../../App/AppContext";
import { routesPaths } from "../../../Routing/routesPaths";
import {
  AppBrandLink,
  AppLogo,
  AppName,
  Footer,
  Header,
  HeaderButton,
  HeaderButtonWrapper,
  HeaderWidthWrapper,
  LayoutWrapper,
  SectionWrapper,
  WidthWrapper,
} from "./DefaultLayout.components";

const DefaultLayout = ({ children }) => {
  const { userInfo } = useAppContext();
  const matchLogin = useRouteMatch(routesPaths.LOGIN);
  const matchRegister = useRouteMatch(routesPaths.REGISTER);

  const shouldShowLogin = !userInfo && !matchLogin && !matchRegister;
  const shouldShowRegister = shouldShowLogin;
  const shouldShowLogout = !!userInfo;

  const history = useHistory();

  const loginHandler = useCallback(() => {
    history.push(routesPaths.LOGIN);
  }, [history]);
  const registerHandler = useCallback(() => {
    history.push(routesPaths.REGISTER);
  }, [history]);
  const logoutHandler = useCallback(() => {
    history.push(routesPaths.LOGOUT);
  }, [history]);

  return (
    <LayoutWrapper>
      <Header>
        <HeaderWidthWrapper>
          <AppBrandLink to={routesPaths.HOMEPAGE}>
            <AppLogo />
            <AppName>Ogloszenioofka</AppName>
          </AppBrandLink>
          <HeaderButtonWrapper>
            {shouldShowLogin && (
              <HeaderButton onClick={loginHandler}>Logowanie</HeaderButton>
            )}
            {shouldShowRegister && (
              <HeaderButton onClick={registerHandler}>Rejestracja</HeaderButton>
            )}
            {shouldShowLogout && (
              <HeaderButton onClick={logoutHandler}>Wyloguj</HeaderButton>
            )}
          </HeaderButtonWrapper>
        </HeaderWidthWrapper>
      </Header>
      {children}
      <Footer>
        <WidthWrapper>
          <div>
            Logo made by{" "}
            <a
              href="https://www.flaticon.com/authors/nikita-golubev"
              title="Nikita Golubev"
            >
              Nikita Golubev
            </a>
          </div>
        </WidthWrapper>
      </Footer>
    </LayoutWrapper>
  );
};

export const Section = ({ children, className }) => {
  return (
    <SectionWrapper className={className}>
      <WidthWrapper>{children}</WidthWrapper>
    </SectionWrapper>
  );
};

export default DefaultLayout;
