import React from "react";
import {
  ChildrenWrapper,
  Label,
  Required,
  Wrapper,
} from "./LabelWrapper.components";

const LabelWrapper = ({ label, required, children }) => (
  <Wrapper>
    <Label>
      {label}
      {required && <Required>*</Required>}
    </Label>
    <ChildrenWrapper>{children}</ChildrenWrapper>
  </Wrapper>
);

export default LabelWrapper;
