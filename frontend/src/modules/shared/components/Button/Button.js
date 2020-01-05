import styled from "styled-components";
import colors from "../../styles/colors";

const Button = styled.button`
  min-height: 35px;
  min-width: 200px;
  border: 0;
  background: ${colors.brandColor};
  border-radius: 5px;
  font-weight: 600;
  color: #efefef;
  cursor: pointer;
  transition: transform 0.1s;
  backface-visibility: hidden;

  :hover {
    transform: scale(1.1);
  }
`;

export default Button;
