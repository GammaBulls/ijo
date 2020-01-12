import styled from "styled-components";
import Input from "../Input";

const TextArea = styled(Input).attrs({
  as: "textarea",
})`
  min-height: 100px;
  padding: 8px;
  resize: none;
`;

export default TextArea;
