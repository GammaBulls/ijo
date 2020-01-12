import styled from "styled-components";
import { Section } from "../shared/layouts/DefaultLayout";
import { WidthWrapper } from "../shared/layouts/DefaultLayout/DefaultLayout.components";
import colors from "../shared/styles/colors";

export const ContentSection = styled(Section)`
  flex-grow: 1;
  display: flex;
  background: ${colors.contentBackground};

  ${WidthWrapper} {
    display: flex;
    flex-direction: column;
  }
  padding-top: 20px;
`;

export const FormWrapper = styled.form`
  display: flex;
  flex-direction: column;
`;

export const ErrorWrapper = styled.span`
  color: red;
  font-size: 12px;
`;
