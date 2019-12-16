import React from "react";
import {
  AppLogo,
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
          <AppLogo />
        </WidthWrapper>
      </Header>
      {children}
      <Footer>
        <WidthWrapper>Footer</WidthWrapper>
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
