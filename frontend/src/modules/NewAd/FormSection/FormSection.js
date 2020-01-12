import React from "react";
import {
  ChildrenWrapper,
  HorizontalLine,
  Title,
  Wrapper,
} from "./FormSection.components";

const FormSection = ({ title, children }) => (
  <Wrapper>
    {title && <Title>{title}</Title>}
    <HorizontalLine />
    <ChildrenWrapper>{children}</ChildrenWrapper>
  </Wrapper>
);

export default FormSection;
