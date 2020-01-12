import styled from "styled-components";
import colors from "../../styles/colors";

const Input = styled.input`
  width: 320px;
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
