import styled from "styled-components";

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;

  > label {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
  }

  input[type="checkbox"] {
    width: 34px;
  }
`;
