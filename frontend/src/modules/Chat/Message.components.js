import styled, { css } from "styled-components";

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  border: 1px solid gray;
  border-radius: 5px;

  padding: 8px;

  & + & {
    margin-bottom: 10px;
  }

  align-self: flex-end;
  ${p =>
    p.direction &&
    css`
      align-self: flex-start;
    `}
`;

export const MessageText = styled.span``;

export const Date = styled.span``;
