import React from "react";
import {
  Action,
  ActionSelect,
  BoxWrapper,
  InnerSection,
} from "./Box.components";

const Box = ({ children, actions }) => {
  return (
    <BoxWrapper>
      <ActionSelect>
        {actions.map(action => (
          <Action key={action.text} to={action.to} selected={action.selected}>
            {action.text}
          </Action>
        ))}
      </ActionSelect>
      <InnerSection>{children}</InnerSection>
    </BoxWrapper>
  );
};

export default Box;
