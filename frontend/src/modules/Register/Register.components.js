import styled from "styled-components";
import Button from "../shared/components/Button";
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
`;

export const SubmitButton = styled(Button)`
  margin-top: 10px;
  margin-bottom: 25px;
`;

export const Subtext = styled.span`
  color: #ccc;
`;
