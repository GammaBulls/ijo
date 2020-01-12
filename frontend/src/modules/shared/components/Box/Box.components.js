import { Link } from "react-router-dom";
import styled, { css } from "styled-components";

export const BoxWrapper = styled.div`
  width: 480px;
  display: flex;
  flex-direction: column;
  margin: auto;
  align-items: center;
  box-shadow: 2px 2px 20px 1px rgba(0, 0, 0, 0.3);
  border-radius: 5px;
  overflow: hidden;
  text-align: center;
`;

export const ActionSelect = styled.div`
  display: flex;
  height: 50px;
  margin-bottom: 40px;
  width: 100%;
`;

export const Action = styled(Link)`
  cursor: default;
  color: initial;
  text-decoration: none;
  ${p =>
    !p.selected &&
    css`
      background: #ccc;
      cursor: pointer;
    `}
  flex: 1;
  justify-content: center;
  display: flex;
  align-items: center;
`;

export const InnerForm = styled.form`
  display: flex;
  flex-direction: column;

  align-items: center;
  padding: 25px;
`;
