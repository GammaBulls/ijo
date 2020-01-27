import React, { useCallback } from "react";
import { useHistory, useRouteMatch, generatePath } from "react-router";
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
  const shouldShowAdd = !!userInfo;
  const shouldShowMe = !!userInfo;
  const shouldShowLogout = !!userInfo;

  const shouldShowAdmin = !!userInfo && userInfo.is_admin;
  const shouldShowMod = !!userInfo && userInfo.is_moderator;

  const history = useHistory();

  const loginHandler = useCallback(() => {
    history.push(routesPaths.LOGIN);
  }, [history]);
  const registerHandler = useCallback(() => {
    history.push(routesPaths.REGISTER);
  }, [history]);
  const addAdHandler = useCallback(() => {
    history.push(routesPaths.NEW_AD);
  }, [history]);
  const meHandler = useCallback(() => {
    history.push(generatePath(routesPaths.MY_PROFILE));
  }, [history]);
  const logoutHandler = useCallback(() => {
    history.push(routesPaths.LOGOUT);
  }, [history]);

  const modHandler = useCallback(() => {
    history.push(routesPaths.MOD);
  }, [history]);
  const adminHandler = useCallback(() => {
    history.push(routesPaths.ADMIN);
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
            {shouldShowAdmin && (
              <HeaderButton onClick={adminHandler}>ADMIN</HeaderButton>
            )}
            {shouldShowMod && (
              <HeaderButton onClick={modHandler}>MOD</HeaderButton>
            )}
            {shouldShowLogin && (
              <HeaderButton onClick={loginHandler}>Logowanie</HeaderButton>
            )}
            {shouldShowRegister && (
              <HeaderButton onClick={registerHandler}>Rejestracja</HeaderButton>
            )}
            {shouldShowAdd && (
              <HeaderButton onClick={addAdHandler}>Dodaj +</HeaderButton>
            )}
            {shouldShowMe && (
              <HeaderButton onClick={meHandler}>Mój profil</HeaderButton>
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
