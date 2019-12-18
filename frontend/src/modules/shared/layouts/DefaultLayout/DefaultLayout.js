import React from "react";
import { routesPaths } from "../../../Routing/routesPaths";
import {
  AppBrandLink,
  AppLogo,
  AppName,
  Footer,
  Header,
  LayoutWrapper,
  SectionWrapper,
  WidthWrapper,
} from "./DefaultLayout.components";

const DefaultLayout = ({ children }) => {
  return (
    <LayoutWrapper>
      <Header>
        <WidthWrapper>
          <AppBrandLink to={routesPaths.HOMEPAGE}>
            <AppLogo />
            <AppName>Ogloszenioofka</AppName>
          </AppBrandLink>
        </WidthWrapper>
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
