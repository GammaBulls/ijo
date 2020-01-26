import styled from "styled-components";
import colors from "../../styles/colors";

const Input = styled.input`
  max-width: 320px;
  width: 100%;
  height: 34px;
  border: thin solid #ccc;
  border-radius: 5px;
  padding: 0 8px;
  outline: none;

  :focus {
    border-color: ${colors.brandColor};
  }
`;

export default Input;
