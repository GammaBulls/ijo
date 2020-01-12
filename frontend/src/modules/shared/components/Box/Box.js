import React from "react";
import { Action, ActionSelect, BoxWrapper, InnerForm } from "./Box.components";

const Box = ({ children, actions, onSubmit }) => {
  return (
    <BoxWrapper>
      <ActionSelect>
        {actions.map(action => (
          <Action key={action.text} to={action.to} selected={action.selected}>
            {action.text}
          </Action>
        ))}
      </ActionSelect>
      <InnerForm onSubmit={onSubmit}>{children}</InnerForm>
    </BoxWrapper>
  );
};

export default Box;
