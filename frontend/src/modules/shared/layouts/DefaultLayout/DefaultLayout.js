import React from "react";
import {
  AppLogo,
  Header,
  Wrapper,
  WidthWrapper,
} from "./DefaultLayout.components";

const DefaultLayout = ({ children }) => {
  return (
    <Wrapper>
      <Header>
        <WidthWrapper>
          <AppLogo />
        </WidthWrapper>
      </Header>
      <WidthWrapper column={true}>{children}</WidthWrapper>
    </Wrapper>
  );
};

export default DefaultLayout;
