import { Link } from "react-router-dom";
import styled from "styled-components";
import Button from "../shared/components/Button";
import { Section } from "../shared/layouts/DefaultLayout";
import { WidthWrapper } from "../shared/layouts/DefaultLayout/DefaultLayout.components";
import colors from "../shared/styles/colors";
import Input from "../shared/components/Input";

export const ContentSection = styled(Section)`
  flex-grow: 1;
  display: flex;
  background: ${colors.contentBackground};

  ${WidthWrapper} {
    display: flex;
    flex-direction: column;
  }
`;

export const ForgotPassword = styled(Link)`
  margin-bottom: 10px;
  place-self: flex-end;
  margin-right: 0px;
  text-decoration: none;
  font-size: 14px;
  color: ${colors.brandColor};

  :hover {
    color: ${colors.hoverColor};
  }
`;

export const StyledInput = styled(Input)`
  margin-bottom: 10px;
`;

export const SubmitButton = styled(Button).attrs({ type: "submit" })`
  margin-bottom: 25px;
`;

export const Subtext = styled.span`
  color: #ccc;
`;
