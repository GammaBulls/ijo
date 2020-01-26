import styled from "styled-components";

export const ChildrenWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

export const Required = styled.span`
  color: red;
  margin-left: 1px;
  position: absolute;
`;

export const Label = styled.span`
  width: 200px;
  text-align: right;
  margin-right: 20px;
  position: relative;
`;

export const Wrapper = styled.div`
  display: flex;

  align-items: center;
  & + & {
    margin-top: 25px;
  }
  :first-child {
    margin-top: 10px;
  }
  :last-child {
    margin-bottom: 15px;
  }
`;
